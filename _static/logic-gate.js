(() => {
if (!customElements.get('logic-gate')) {
  class LogicGate extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.timer = null;
    this.currentIndex = 0;
  }

  connectedCallback() {
    this.type = this.getAttribute('type') || 'AND';
    this.interval = parseInt(this.getAttribute('interval')) || 1500;
    this.scale = parseFloat(this.getAttribute('scale')) || 1;
    this.render();
    this.startAnimation();
  }

  disconnectedCallback() {
    if (this.timer) clearInterval(this.timer);
  }

  getTruthTable() {
    const tables = {
      AND:  [[0,0,0], [0,1,0], [1,0,0], [1,1,1]],
      NAND: [[0,0,1], [0,1,1], [1,0,1], [1,1,0]],
      XOR:  [[0,0,0], [0,1,1], [1,0,1], [1,1,0]],
      NOT:  [[0,null,1], [1,null,0]]
    };
    return tables[this.type] || tables['AND'];
  }

  getSvg() {
    const svgs = {
      AND: `<path d="M 10,10 L 30,10 A 20,20 0 0 1 50,30 A 20,20 0 0 1 30,50 L 10,50 Z" />`,
      NAND: `<path d="M 5,10 L 25,10 A 20,20 0 0 1 45,30 A 20,20 0 0 1 25,50 L 5,50 Z" /><circle cx="51" cy="30" r="6" />`,
      NOT: `<path d="M 15,15 L 15,45 L 40,30 Z" /><circle cx="46" cy="30" r="6" />`,
      XOR: `<path d="M 5,10 Q 15,30 5,50" /><path d="M 15,10 Q 25,30 15,50 Q 35,50 50,30 Q 35,10 15,10 Z" />`
    };
    return `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${svgs[this.type]}</svg>`;
  }

  render() {
    const tableData = this.getTruthTable();
    const isNot = this.type === 'NOT';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: monospace;
          transform: scale(${this.scale});
          transform-origin: top center;
          color: var(--theme-color, #333);
        }
        .table-container { width: 100%; max-width: 250px; margin-bottom: 2rem; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px; border: 1px solid #8884; text-align: center; font-size: 1.125rem; }
        th { background: #8882; }
        tr { transition: all 0.3s ease; color: #888; }
        tr.active { background: rgba(16, 185, 129, 0.1); color: #10b981; font-weight: bold; }
        
        .circuit { display: flex; align-items: center; position: relative; }
        .col { display: flex; flex-direction: column; justify-content: space-around; height: 60px; margin-right: 8px; }
        .val { font-size: 1.25rem; font-weight: bold; transition: color 0.3s ease; color: #888; }
        .val.on { color: #10b981; }
        
        .line { height: 4px; border-radius: 2px; transition: all 0.3s ease; background: #888; }
        .line.in { width: 32px; }
        .line.out { width: 40px; margin-left: 8px; }
        .line.on { background: #10b981; box-shadow: 0 0 8px #10b981; }
        
        .gate-name { margin-left: 16px; font-size: 1.25rem; opacity: 0.8; width: 64px; }
      </style>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>${isNot ? 'In' : 'A'}</th>
              ${isNot ? '' : '<th>B</th>'}
              <th>Out</th>
            </tr>
          </thead>
          <tbody id="tbody">
            ${tableData.map((row, i) => `
              <tr id="row-${i}">
                <td>${row[0]}</td>
                ${isNot ? '' : `<td>${row[1]}</td>`}
                <td>${row[2]}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="circuit">
        <div class="col">
          <div id="val-a" class="val">0</div>
          ${isNot ? '' : '<div id="val-b" class="val">0</div>'}
        </div>
        <div class="col">
          <div id="line-a" class="line in"></div>
          ${isNot ? '' : '<div id="line-b" class="line in"></div>'}
        </div>
        
        <div class="gate-symbol">${this.getSvg()}</div>
        
        <div id="line-out" class="line out"></div>
        <div id="val-out" class="val" style="margin-left: 8px;">0</div>
        <div class="gate-name">${this.type}</div>
      </div>
    `;
  }

  startAnimation() {
    const tableData = this.getTruthTable();
    const update = () => {
      const rowData = tableData[this.currentIndex];
      
      // Update Table Highlight
      tableData.forEach((_, i) => {
        this.shadowRoot.getElementById(`row-${i}`).className = i === this.currentIndex ? 'active' : '';
      });

      // Helper to set state
      const setOn = (id, isOn) => {
        const el = this.shadowRoot.getElementById(id);
        if (el) {
          el.classList.toggle('on', isOn);
          if (id.startsWith('val')) el.textContent = isOn ? '1' : '0';
        }
      };

      // Update Circuit visually
      setOn('val-a', rowData[0] === 1);
      setOn('line-a', rowData[0] === 1);
      if (this.type !== 'NOT') {
        setOn('val-b', rowData[1] === 1);
        setOn('line-b', rowData[1] === 1);
      }
      setOn('val-out', rowData[2] === 1);
      setOn('line-out', rowData[2] === 1);

      this.currentIndex = (this.currentIndex + 1) % tableData.length;
    };

    update(); // Run immediately once
    if (this.interval > 0) {
      this.timer = setInterval(update, this.interval);
    }
  }
}

customElements.define('logic-gate', LogicGate);
}
})();