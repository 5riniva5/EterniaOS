function openCalculator() {
    const content = `
        <div style="display: flex; flex-direction: column; gap: 8px; height: 100%; font-family: monospace;">
            <div id="calc-history" style="height: 22px; font-size: 0.75rem; color: var(--muted); text-align: right; overflow: hidden; padding-right: 4px;"></div>
            <input type="text" id="calc-display" readonly value="0" style="width: 100%; height: 46px; background: rgba(0,0,0,0.6); color: var(--text); border: 1px solid var(--border-color); text-align: right; padding: 0 12px; font-size: 1.3rem; border-radius: 8px; outline: none;">
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; flex: 1;">
                <button onclick="calcClear()" style="background: rgba(255,255,255,0.06); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">AC</button>
                <button onclick="calcAppend('(')" style="background: rgba(255,255,255,0.06); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">(</button>
                <button onclick="calcAppend(')')" style="background: rgba(255,255,255,0.06); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">)</button>
                <button onclick="calcPercent()" style="background: rgba(255,255,255,0.06); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">%</button>
                <button onclick="calcAppend('/')" style="background: rgba(125,211,252,0.18); color: var(--accent); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">÷</button>

                <button onclick="calcFunc('Math.sqrt')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">√</button>
                <button onclick="calcAppend('7')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">7</button>
                <button onclick="calcAppend('8')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">8</button>
                <button onclick="calcAppend('9')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">9</button>
                <button onclick="calcAppend('*')" style="background: rgba(125,211,252,0.18); color: var(--accent); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">×</button>

                <button onclick="calcFunc('Math.pow')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">x²</button>
                <button onclick="calcAppend('4')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">4</button>
                <button onclick="calcAppend('5')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">5</button>
                <button onclick="calcAppend('6')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">6</button>
                <button onclick="calcAppend('-')" style="background: rgba(125,211,252,0.18); color: var(--accent); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">−</button>

                <button onclick="calcFunc('Math.sin')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">sin</button>
                <button onclick="calcAppend('1')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">1</button>
                <button onclick="calcAppend('2')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">2</button>
                <button onclick="calcAppend('3')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">3</button>
                <button onclick="calcAppend('+')" style="background: rgba(125,211,252,0.18); color: var(--accent); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">+</button>

                <button onclick="calcFunc('Math.cos')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">cos</button>
                <button onclick="calcAppend('0')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; grid-column: span 2;">0</button>
                <button onclick="calcAppend('.')" style="background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">.</button>
                <button onclick="calcCompute()" style="background: rgba(125,211,252,0.24); color: var(--accent); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; font-weight: bold;">=</button>
            </div>
        </div>
    `;
    createWindow('Scientific Calculator', content, '360px', '430px');
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

window.calcPercent = function() {
    const disp = document.getElementById('calc-display');
    if (!disp) return;
    try {
        const value = parseFloat(disp.value) / 100;
        disp.value = String(value);
        calcFreshInput = true;
    } catch {
        disp.value = 'Error';
    }
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
        } else if (type === 'Math.sin') {
            disp.value = Math.sin(val);
        } else if (type === 'Math.cos') {
            disp.value = Math.cos(val);
        }
        calcFreshInput = true;
    } catch {
        disp.value = 'Error';
    }
};