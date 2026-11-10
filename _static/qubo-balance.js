(() => {
  // 1. Dynamically load Tailwind CSS if missing
  if (!document.querySelector('script[src="https://cdn.tailwindcss.com"]')) {
    const tailwindScript = document.createElement('script');
    tailwindScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(tailwindScript);
  }

  if (!customElements.get('qubo-solver')) {
    class QuboSolver extends HTMLElement {
      
      connectedCallback() {
        this.setAttr = this.getAttribute('set') || '28, 21, 19, 14, 11, 8, 7, 5, 4, 3, 2, 1';
        this.leftAttr = this.getAttribute('left');
        this.scale = parseFloat(this.getAttribute('scale') || '1.0');
        
        this.items = [];
        this.isSolving = false;
        this.activeItemId = null;
        this.rejectedItemId = null;
        this.statusMsg = "Ready";
        this.currentRunId = null;

        this.resetState();
        this.setupDOM();
        this.render();
      }

      resetState() {
        this.currentRunId = Symbol(); 
        
        const arr = this.setAttr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
        const leftCount = (this.leftAttr !== null) ? parseInt(this.leftAttr) : Math.ceil(arr.length / 2);
        
        this.items = arr.map((val, idx) => ({
          id: idx, val: val, side: idx < leftCount ? 'left' : 'right'
        }));
        
        this.isSolving = false;
        this.activeItemId = null;
        this.rejectedItemId = null;
        this.statusMsg = "Ready";
      }

      delay(ms) { return new Promise(res => setTimeout(res, ms)); }

      get leftItems() { return this.items.filter(i => i.side === 'left').sort((a,b) => b.val - a.val); }
      get rightItems() { return this.items.filter(i => i.side === 'right').sort((a,b) => b.val - a.val); }
      get leftSum() { return this.leftItems.reduce((acc, curr) => acc + curr.val, 0); }
      get rightSum() { return this.rightItems.reduce((acc, curr) => acc + curr.val, 0); }
      get difference() { return this.leftSum - this.rightSum; }
      get energy() { return Math.pow(this.difference, 2); }

      async solveHeuristic() {
        if (this.isSolving) return;
        this.isSolving = true;
        this.statusMsg = "Sorting & Assigning...";
        this.renderControls();
        
        const runToken = this.currentRunId;
        const sortedItems = [...this.items].sort((a, b) => b.val - a.val);
        let virtualLeftSum = 0;
        let virtualRightSum = 0;
        const targetSides = new Map();

        for (const item of sortedItems) {
          if (virtualLeftSum <= virtualRightSum) {
            targetSides.set(item.id, 'left');
            virtualLeftSum += item.val;
          } else {
            targetSides.set(item.id, 'right');
            virtualRightSum += item.val;
          }
        }

        for (const item of sortedItems) {
          if (runToken !== this.currentRunId) return;
          if (item.side !== targetSides.get(item.id)) {
            this.activeItemId = item.id;
            this.render();
            await this.delay(400);
            if (runToken !== this.currentRunId) return;
            
            item.side = targetSides.get(item.id);
            this.render();
            await this.delay(150);
            
            this.activeItemId = null;
            this.render();
            await this.delay(200);
          }
        }
        
        if (runToken === this.currentRunId) {
          this.statusMsg = `Heuristic Finished (E=${this.energy})`;
          this.isSolving = false;
          this.render();
        }
      }

      async solveGreedy() {
        if (this.isSolving) return;
        this.isSolving = true;
        this.statusMsg = "Steepest Descent...";
        this.renderControls();
        
        const runToken = this.currentRunId;

        while (true) {
          if (runToken !== this.currentRunId) return;

          let bestImprovement = 0;
          let bestItem = null;
          
          const currentDiff = this.difference;
          const currentE = currentDiff * currentDiff;

          for (const item of this.items) {
            const simulatedDiff = currentDiff + (item.side === 'left' ? -2 * item.val : 2 * item.val);
            const improvement = currentE - (simulatedDiff * simulatedDiff);
            if (improvement > bestImprovement) {
              bestImprovement = improvement;
              bestItem = item;
            }
          }

          if (!bestItem) {
            this.statusMsg = this.energy === 0 ? "Global Minimum Hit" : `Local Minimum Trap (E=${this.energy})`;
            break;
          }

          this.activeItemId = bestItem.id;
          this.render();
          await this.delay(500);
          if (runToken !== this.currentRunId) return;
          
          bestItem.side = bestItem.side === 'left' ? 'right' : 'left';
          this.render();
          await this.delay(150); 
          
          this.activeItemId = null;
          this.render();
          await this.delay(350); 
        }
        
        if (runToken === this.currentRunId) {
          this.isSolving = false;
          this.renderControls();
        }
      }

      async solveAnnealing() {
        if (this.isSolving) return;
        this.isSolving = true;
        
        const runToken = this.currentRunId;
        const maxWeight = Math.max(...this.items.map(i => i.val));
        const maxEnergySpike = Math.pow(2 * maxWeight, 2);
        let T = maxEnergySpike / 0.693; 
        const alpha = 0.85;
        const iterations = 30; 

        for (let i = 0; i < iterations; i++) {
          if (runToken !== this.currentRunId) return;
          
          this.statusMsg = `Annealing (T=${Math.round(T)})...`;
          this.render(); 
          
          const randomIdx = Math.floor(Math.random() * this.items.length);
          const item = this.items[randomIdx];
          
          const currentDiff = this.difference;
          const currentE = currentDiff * currentDiff;
          const simulatedDiff = currentDiff + (item.side === 'left' ? -2 * item.val : 2 * item.val);
          const improvement = currentE - (simulatedDiff * simulatedDiff);

          this.activeItemId = item.id;
          this.render();
          await this.delay(300);
          if (runToken !== this.currentRunId) return;

          if (improvement > 0 || Math.random() < Math.exp(improvement / T)) {
            item.side = item.side === 'left' ? 'right' : 'left';
            this.render();
            await this.delay(150);
            this.activeItemId = null;
          } else {
            this.activeItemId = null;
            this.rejectedItemId = item.id;
            this.render();
            await this.delay(250);
            this.rejectedItemId = null;
          }
          
          T *= alpha; 
          this.render();
          await this.delay(150);
          
          if (this.energy === 0) break; 
        }

        if (runToken === this.currentRunId) {
          this.statusMsg = this.energy === 0 ? "Global Minimum Hit" : `Frozen (E=${this.energy})`;
          this.isSolving = false;
          this.render();
        }
      }

      setupDOM() {
        this.innerHTML = `
          <div class="flex flex-col items-center select-none font-sans m-0 p-0" style="transform: scale(${this.scale}); transform-origin: top center;">
            <div class="flex gap-4 justify-center items-stretch w-[500px]">
              
              <!-- Left Partition -->
              <div class="flex-1 flex flex-col h-full bg-gray-800/5 dark:bg-gray-100/5 border border-gray-500/20 rounded-lg p-2 min-h-[180px]">
                <div class="text-center mb-2 pb-1 border-b border-gray-500/10">
                  <div class="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">Set A</div>
                  <div id="left-sum" class="text-lg font-mono font-bold text-blue-500 leading-none">0</div>
                </div>
                <!-- FIX: Restored pure Tailwind Grid classes with 'content-start' to pack boxes tight at the top -->
                <div id="grid-left" class="grid grid-cols-4 gap-1.5 auto-rows-max content-start relative min-h-[120px] pb-1"></div>
              </div>

              <!-- Right Partition -->
              <div class="flex-1 flex flex-col h-full bg-gray-800/5 dark:bg-gray-100/5 border border-gray-500/20 rounded-lg p-2 min-h-[180px]">
                <div class="text-center mb-2 pb-1 border-b border-gray-500/10">
                  <div class="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">Set B</div>
                  <div id="right-sum" class="text-lg font-mono font-bold text-red-500 leading-none">0</div>
                </div>
                <!-- FIX: Restored pure Tailwind Grid classes -->
                <div id="grid-right" class="grid grid-cols-4 gap-1.5 auto-rows-max content-start relative min-h-[120px] pb-1"></div>
              </div>
            </div>

            <!-- Readout & Controls -->
            <div class="flex flex-col items-center bg-gray-800/5 dark:bg-gray-100/5 px-6 py-4 rounded-xl border border-gray-500/20 z-20 relative mt-4 min-w-[400px]">
              <div id="status-badge" class="absolute -top-3 bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all">
                Ready
              </div>
              
              <div class="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-1">QUBO Cost function</div>
              <div class="font-mono text-xl leading-none mt-2 mb-3">
                <span class="opacity-50 mx-1">f(n) =</span>(<span id="eq-left" class="text-blue-500 font-bold">0</span>
                <span class="opacity-50 mx-1">-</span>
                <span id="eq-right" class="text-red-500 font-bold">0</span>)<sup>2</sup>
                <span> =</span>
                <span id="eq-energy" class="font-bold transition-all duration-300 inline-block w-12 text-center text-gray-700 dark:text-gray-200">0</span>
              </div>
              
              <!-- Buttons -->
              <div class="flex gap-1.5 w-full mt-2">
                <button id="btn-reset" title="Reset" class="w-10 py-1.5 rounded text-sm font-bold transition-all duration-300 bg-gray-500/20 text-gray-600 dark:text-gray-300 hover:bg-gray-500/40 active:scale-95">↺</button>
                <button id="btn-heuristic" class="flex-1 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all duration-300 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 disabled:opacity-30 disabled:cursor-not-allowed border border-blue-500/30">Heuristic</button>
                <button id="btn-greedy" class="flex-1 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all duration-300 bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 disabled:opacity-30 disabled:cursor-not-allowed border border-purple-500/30">Greedy</button>
                <button id="btn-anneal" class="flex-1 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all duration-300 bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 disabled:opacity-30 disabled:cursor-not-allowed border border-orange-500/30">Annealing</button>
              </div>
            </div>
          </div>
        `;

        this.querySelector('#btn-reset').addEventListener('click', () => { this.resetState(); this.render(); });
        this.querySelector('#btn-heuristic').addEventListener('click', () => this.solveHeuristic());
        this.querySelector('#btn-greedy').addEventListener('click', () => this.solveGreedy());
        this.querySelector('#btn-anneal').addEventListener('click', () => this.solveAnnealing());
      }

      renderControls() {
        const resetBtn = this.querySelector('#btn-reset');
        const hBtn = this.querySelector('#btn-heuristic');
        const gBtn = this.querySelector('#btn-greedy');
        const aBtn = this.querySelector('#btn-anneal');
        
        [hBtn, gBtn, aBtn].forEach(btn => btn.disabled = this.isSolving);
      }

      render() {
        this.querySelector('#left-sum').textContent = this.leftSum;
        this.querySelector('#right-sum').textContent = this.rightSum;
        this.querySelector('#eq-left').textContent = this.leftSum;
        this.querySelector('#eq-right').textContent = this.rightSum;
        this.querySelector('#status-badge').textContent = this.statusMsg;
        
        const energyEl = this.querySelector('#eq-energy');
        energyEl.textContent = this.energy;
        if (this.energy === 0) {
          energyEl.className = "font-bold transition-all duration-300 inline-block w-12 text-center text-green-500 font-black scale-110 drop-shadow-sm";
        } else {
          energyEl.className = "font-bold transition-all duration-300 inline-block w-12 text-center text-gray-700 dark:text-gray-200";
        }

        this.renderControls();

        const renderGrid = (items, containerId, colorClasses) => {
          const container = this.querySelector(`#${containerId}`);
          container.innerHTML = '';
          
          items.forEach(item => {
            const el = document.createElement('div');
            el.textContent = item.val;
            
            // FIX: Added min-w-0 min-h-0 to ensure aspect-square works reliably in grid cells
            let classes = "aspect-square min-w-0 min-h-0 flex items-center justify-center font-bold rounded shadow-sm text-xs transition-colors duration-200 ";
            
            if (this.activeItemId === item.id) {
              classes += "bg-yellow-400 border border-yellow-500 text-yellow-900 scale-110 z-20 shadow-yellow-500/50";
            } else if (this.rejectedItemId === item.id) {
              classes += "bg-gray-400 border border-gray-500 text-gray-800 scale-95 z-10";
            } else {
              classes += colorClasses;
            }
            
            el.className = classes;
            container.appendChild(el);
          });
        };

        renderGrid(this.leftItems, 'grid-left', 'bg-blue-500/20 border border-blue-500/30 text-blue-700 dark:text-blue-300');
        renderGrid(this.rightItems, 'grid-right', 'bg-red-500/20 border border-red-500/30 text-red-700 dark:text-red-300');
      }
    }

    customElements.define('qubo-solver', QuboSolver);
  }
})();