function openCalculator() {
    const content = `
        <input type="text" id="calc-display" readonly style="width: 100%; padding: 10px; font-size: 1.2rem; background: #000; color: var(--accent); border: 1px solid var(--border-color); border-radius: 6px; text-align: right;" />
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; flex: 1; margin-top: 8px;">
            <button onclick="appendToCalc('7')" style="background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; padding: 10px;">7</button>
            <button onclick="appendToCalc('8')" style="background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; padding: 10px;">8</button>
            <button onclick="appendToCalc('9')" style="background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; padding: 10px;">9</button>
            <button onclick="appendToCalc('/')" style="background: rgba(212,175,55,0.2); color: var(--accent); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; padding: 10px;">/</button>
            <button onclick="appendToCalc('4')" style="background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; padding: 10px;">4</button>
            <button onclick="appendToCalc('5')" style="background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; padding: 10px;">5</button>
            <button onclick="appendToCalc('6')" style="background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; padding: 10px;">6</button>
            <button onclick="appendToCalc('*')" style="background: rgba(212,175,55,0.2); color: var(--accent); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; padding: 10px;">*</button>
            <button onclick="appendToCalc('1')" style="background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; padding: 10px;">1</button>
            <button onclick="appendToCalc('2')" style="background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; padding: 10px;">2</button>
            <button onclick="appendToCalc('3')" style="background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; padding: 10px;">3</button>
            <button onclick="appendToCalc('-')" style="background: rgba(212,175,55,0.2); color: var(--accent); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; padding: 10px;">-</button>
            <button onclick="appendToCalc('0')" style="background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; padding: 10px;">0</button>
            <button onclick="clearCalc()" style="background: rgba(255,0,0,0.2); color: #ff8080; border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; padding: 10px;">C</button>
            <button onclick="calculateResult()" style="background: rgba(0,255,0,0.2); color: #80ff80; border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; padding: 10px;">=</button>
            <button onclick="appendToCalc('+')" style="background: rgba(212,175,55,0.2); color: var(--accent); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; padding: 10px;">+</button>
        </div>
    `;
    createWindow('Calculator', content, '320px', '360px');
}

function appendToCalc(val) {
    const display = document.getElementById('calc-display');
    if (display) display.value += val;
}

function clearCalc() {
    const display = document.getElementById('calc-display');
    if (display) display.value = '';
}

function calculateResult() {
    try {
        const display = document.getElementById('calc-display');
        if (display) display.value = eval(display.value);
    } catch {
        const display = document.getElementById('calc-display');
        if (display) display.value = 'Error';
    }
}