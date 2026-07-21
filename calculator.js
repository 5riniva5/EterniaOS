function openCalculator() {
    const content = `
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%; font-family: monospace;">
            <!-- History / Memory Readout -->
            <div id="calc-history" style="height: 22px; font-size: 0.75rem; color: var(--muted); text-align: right; overflow: hidden; padding-right: 4px;"></div>
            
            <!-- Main Display -->
            <input type="text" id="calc-display" readonly value="0" style="width: 100%; height: 44px; background: rgba(0,0,0,0.6); color: var(--text); border: 1px solid var(--border-color); text-align: right; padding: 0 12px; font-size: 1.3rem; border-radius: 6px; outline: none;">
            
            <!-- Button Grid -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; flex: 1;">
                <!-- Row 1: Memory & Clears -->
                <button onclick="calcClearMem()" style="background: rgba(255,255,255,0.03); color: var(--muted); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; font-size: 0.75rem;">MC</button>
                <button onclick="calcRecallMem()" style="background: rgba(255,255,255,0.03); color: var(--muted); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; font-size: 0.75rem;">MR</button>
                <button onclick="calcAddMem()" style="background: rgba(255,255,255,0.03); color: var(--muted); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; font-size: 0.75rem;">M+</button>
                <button onclick="calcClear()" style="background: rgba(239,68,68,0.15); color: #ef4444; border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; font-size: 0.8rem; font-weight: bold;">AC</button>

                <!-- Row 2: Scientific Functions -->
                <button onclick="calcFunc('Math.sqrt')" style="background: rgba(56,189,248,0.08); color: var(--accent); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; font-size: 0.75rem;">√</button>
                <button onclick="calcFunc('Math.pow')" style="background: rgba(56,189,248,0.08); color: var(--accent); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; font-size: 0.75rem;">x²</button>
                <button onclick="calcAppend('3.14159')" style="background: rgba(56,189,248,0.08); color: var(--accent); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; font-size: 0.75rem;">π</button>
                <button onclick="calcAppend('/')" style="background: rgba(56,189,248,0.15); color: var(--accent); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; font-size: 0.9rem;">÷</button>

                <!-- Row 3: Digits 7-9 & Multiply -->
                <button onclick="calcAppend('7')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer;">7</button>
                <button onclick="calcAppend('8')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer;">8</button>
                <button onclick="calcAppend('9')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer;">9</button>
                <button onclick="calcAppend('*')" style="background: rgba(56,189,248,0.15); color: var(--accent); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; font-size: 0.9rem;">×</button>

                <!-- Row 4: Digits 4-6 & Subtract -->
                <button onclick="calcAppend('4')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer;">4</button>
                <button onclick="calcAppend('5')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer;">5</button>
                <button onclick="calcAppend('6')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer;">6</button>
                <button onclick="calcAppend('-')" style="background: rgba(56,189,248,0.15); color: var(--accent); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; font-size: 0.9rem;">-</button>

                <!-- Row 5: Digits 1-3 & Add -->
                <button onclick="calcAppend('1')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer;">1</button>
                <button onclick="calcAppend('2')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer;">2</button>
                <button onclick="calcAppend('3')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer;">3</button>
                <button onclick="calcAppend('+')" style="background: rgba(56,189,248,0.15); color: var(--accent); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; font-size: 0.9rem;">+</button>

                <!-- Row 6: Zero, Decimal, Equals -->
                <button onclick="calcAppend('0')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; grid-column: span 2;">0</button>
                <button onclick="calcAppend('.')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer;">.</button>
                <button onclick="calcCompute()" style="background: rgba(56,189,248,0.25); color: var(--accent); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; font-weight: bold;">=</button>
            </div>
        </div>
    `;
    createWindow('Scientific Calculator', content, '300px', '360px');
}

let calcMemory = 0;
let calcFreshInput = false;

window.calcAppend = function(val) {
    const disp = document.getElementById('calc-display');
    if (!disp) return;
    if (disp.value === '0' || disp.value === 'Error' || calcFreshInput) {
        disp.value = val;
        calcFreshInput = false;
    } else {
        disp.value += val;
    }
};

window.calcClear = function() {
    const disp = document.getElementById('calc-display');
    const hist = document.getElementById('calc-history');
    if (disp) disp.value = '0';
    if (hist) hist.innerText = '';
    calcFreshInput = false;
};

window.calcCompute = function() {
    const disp = document.getElementById('calc-display');
    const hist = document.getElementById('calc-history');
    if (!disp) return;
    try {
        const expression = disp.value;
        const result = eval(expression);
        if (hist) hist.innerText = `${expression} =`;
        disp.value = result;
        calcFreshInput = true;
    } catch {
        disp.value = 'Error';
        calcFreshInput = true;
    }
};

window.calcFunc = function(type) {
    const disp = document.getElementById('calc-display');
    if (!disp) return;
    try {
        const val = parseFloat(disp.value);
        if (type === 'Math.sqrt') {
            disp.value = Math.sqrt(val);
        } else if (type === 'Math.pow') {
            disp.value = Math.pow(val, 2);
        }
        calcFreshInput = true;
    } catch {
        disp.value = 'Error';
    }
};

window.calcClearMem = function() { calcMemory = 0; };
window.calcRecallMem = function() {
    const disp = document.getElementById('calc-display');
    if (disp) disp.value = calcMemory;
    calcFreshInput = true;
};
window.calcAddMem = function() {
    const disp = document.getElementById('calc-display');
    if (disp) calcMemory += parseFloat(disp.value) || 0;
};