(() => {
  if (!customElements.get('parallel-sg')) {
    class ParallelSG extends HTMLElement {
      connectedCallback() {
        this.renderDOM();
        this.initAnimation();
      }

      disconnectedCallback() {
        if (this.animFrame) cancelAnimationFrame(this.animFrame);
      }

      renderDOM() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
          <style>
            :host { display: block; width: 100%; max-width: 750px; margin: 2rem auto; user-select: none; }
            svg { width: 100%; height: auto; font-family: monospace; overflow: visible; }
            
            /* Text & Lines */
            .txt-title { font-family: sans-serif; font-size: 16px; font-weight: bold; fill: #64748b; }
            .txt-lbl { font-size: 14px; fill: #64748b; font-weight: bold; }
            .beam-track { stroke: rgba(148, 163, 184, 0.3); stroke-width: 2; stroke-dasharray: 4 4; fill: none; }
            
            /* Magnets */
            .magnet { fill: rgba(59, 130, 246, 0.05); stroke: #3b82f6; stroke-width: 2; rx: 6; }
            .magnet-lbl { font-family: sans-serif; font-size: 14px; font-weight: 900; fill: #2563eb; }
            
            /* Detectors */
            .screen { fill: rgba(148, 163, 184, 0.1); stroke: #cbd5e1; stroke-width: 2; rx: 4; }
            .pad { fill: rgba(255,255,255,0.5); stroke-width: 2; transition: all 0.2s; rx: 4; }
            .pad.off { stroke: #cbd5e1; }
            
            /* Basis States */
            .basis-box { fill: transparent; stroke: transparent; stroke-width: 2; rx: 6; transition: all 0.3s; }
            .basis-txt { font-size: 18px; font-weight: bold; fill: #94a3b8; transition: all 0.3s; }
            
            /* State 0 (Up) - Emerald */
            .pad-0.active { fill: rgba(16, 185, 129, 0.2); stroke: #10b981; filter: drop-shadow(0 0 6px #10b981); }
            /* State 1 (Down) - Amber */
            .pad-1.active { fill: rgba(245, 158, 11, 0.2); stroke: #f59e0b; filter: drop-shadow(0 0 6px #f59e0b); }

            /* Active Joint State Highlights */
            .basis-box.active { fill: var(--jp-layout-color2, #f8fafc); stroke: #3b82f6; filter: drop-shadow(0 0 8px rgba(59,130,246,0.4)); }
            .basis-txt.active { fill: #1e293b; }
            
            /* Dark mode overrides */
            @media (prefers-color-scheme: dark) {
              .txt-title, .txt-lbl { fill: #94a3b8; }
              .screen { fill: rgba(30, 41, 59, 0.5); stroke: #475569; }
              .pad.off { stroke: #475569; fill: rgba(15, 23, 42, 0.5); }
              .basis-txt { fill: #64748b; }
              .basis-txt.active { fill: #f8fafc; }
              .basis-box.active { fill: rgba(30, 41, 59, 0.8); }
            }
          </style>

          <svg viewBox="0 0 750 380">
            <!-- Source Oven -->
            <rect x="20" y="140" width="60" height="100" rx="4" fill="var(--jp-layout-color2, #f1f5f9)" stroke="#94a3b8" stroke-width="2"/>
            <text x="50" y="130" text-anchor="middle" class="txt-title">Oven</text>
            <circle cx="80" cy="100" r="5" fill="#1e293b"/> <!-- Top Nozzle -->
            <circle cx="80" cy="280" r="5" fill="#1e293b"/> <!-- Bottom Nozzle -->
            
            <!-- Tracks Qubit A -->
            <text x="120" y="80" class="txt-lbl">Qubit 0 (A)</text>
            <path d="M 80 100 L 260 100" class="beam-track" />
            <path d="M 340 100 Q 380 100, 420 50 L 500 50" class="beam-track" />
            <path d="M 340 100 Q 380 100, 420 150 L 500 150" class="beam-track" />
            
            <!-- Tracks Qubit B -->
            <text x="120" y="260" class="txt-lbl">Qubit 1 (B)</text>
            <path d="M 80 280 L 260 280" class="beam-track" />
            <path d="M 340 280 Q 380 280, 420 230 L 500 230" class="beam-track" />
            <path d="M 340 280 Q 380 280, 420 330 L 500 330" class="beam-track" />

            <!-- SG Magnets -->
            <rect x="260" y="70" width="80" height="60" class="magnet" />
            <text x="300" y="105" text-anchor="middle" class="magnet-lbl">SG (Z)</text>
            <rect x="260" y="250" width="80" height="60" class="magnet" />
            <text x="300" y="285" text-anchor="middle" class="magnet-lbl">SG (Z)</text>

            <!-- Detector Screen & Pads -->
            <rect x="520" y="20" width="40" height="340" class="screen" />
            <text x="540" y="12" text-anchor="middle" class="txt-title">Detector</text>
            
            <rect id="pad-a0" x="510" y="35" width="60" height="30" class="pad pad-0 off" />
            <text x="580" y="55" class="txt-lbl" fill="#10b981">|0⟩</text>
            
            <rect id="pad-a1" x="510" y="135" width="60" height="30" class="pad pad-1 off" />
            <text x="580" y="155" class="txt-lbl" fill="#f59e0b">|1⟩</text>
            
            <rect id="pad-b0" x="510" y="215" width="60" height="30" class="pad pad-0 off" />
            <text x="580" y="235" class="txt-lbl" fill="#10b981">|0⟩</text>
            
            <rect id="pad-b1" x="510" y="315" width="60" height="30" class="pad pad-1 off" />
            <text x="580" y="335" class="txt-lbl" fill="#f59e0b">|1⟩</text>

            <!-- Atoms -->
            <circle id="atom-a" cx="80" cy="100" r="7" fill="#64748b" />
            <circle id="atom-b" cx="80" cy="280" r="7" fill="#64748b" />

            <!-- Joint States Register -->
            <text x="670" y="70" text-anchor="middle" class="txt-title">Joint State</text>
            
            <g transform="translate(630, 90)">
              <rect id="box-00" x="0" y="0" width="80" height="35" class="basis-box" />
              <text id="txt-00" x="40" y="23" text-anchor="middle" class="basis-txt">|00⟩</text>
              
              <rect id="box-01" x="0" y="50" width="80" height="35" class="basis-box" />
              <text id="txt-01" x="40" y="73" text-anchor="middle" class="basis-txt">|01⟩</text>
              
              <rect id="box-10" x="0" y="100" width="80" height="35" class="basis-box" />
              <text id="txt-10" x="40" y="123" text-anchor="middle" class="basis-txt">|10⟩</text>
              
              <rect id="box-11" x="0" y="150" width="80" height="35" class="basis-box" />
              <text id="txt-11" x="40" y="173" text-anchor="middle" class="basis-txt">|11⟩</text>
            </g>
          </svg>
        `;

        this.els = {
          atomA: this.shadowRoot.getElementById('atom-a'),
          atomB: this.shadowRoot.getElementById('atom-b'),
          pads: {
            a0: this.shadowRoot.getElementById('pad-a0'),
            a1: this.shadowRoot.getElementById('pad-a1'),
            b0: this.shadowRoot.getElementById('pad-b0'),
            b1: this.shadowRoot.getElementById('pad-b1')
          },
          states: {
            '00': { box: this.shadowRoot.getElementById('box-00'), txt: this.shadowRoot.getElementById('txt-00') },
            '01': { box: this.shadowRoot.getElementById('box-01'), txt: this.shadowRoot.getElementById('txt-01') },
            '10': { box: this.shadowRoot.getElementById('box-10'), txt: this.shadowRoot.getElementById('txt-10') },
            '11': { box: this.shadowRoot.getElementById('box-11'), txt: this.shadowRoot.getElementById('txt-11') }
          }
        };
      }

      initAnimation() {
        this.progress = 0;
        this.stateA = 0; 
        this.stateB = 0;
        this.phase = 'flying'; // flying -> hit -> delay
        this.pickNewStates();
        
        let lastTime = performance.now();
        
        const tick = (time) => {
          const dt = time - lastTime;
          lastTime = time;

          if (this.phase === 'flying') {
            this.progress += (dt / 1500); // 1.5 seconds to cross
            
            if (this.progress >= 1) {
              this.progress = 1;
              this.phase = 'hit';
              this.triggerHit();
              setTimeout(() => { 
                this.phase = 'reset'; 
                this.resetHit();
                this.pickNewStates();
              }, 1200); // Hold the lit state for 1.2 seconds
            }
            this.updateAtomPositions();
          }

          this.animFrame = requestAnimationFrame(tick);
        };
        this.animFrame = requestAnimationFrame(tick);
      }

      pickNewStates() {
        this.progress = 0;
        this.stateA = Math.random() > 0.5 ? 0 : 1;
        this.stateB = Math.random() > 0.5 ? 0 : 1;
        this.phase = 'flying';
        
        // Reset colors
        this.els.atomA.setAttribute('fill', '#64748b');
        this.els.atomB.setAttribute('fill', '#64748b');
        this.els.atomA.setAttribute('opacity', '1');
        this.els.atomB.setAttribute('opacity', '1');
      }

      // Calculate the curved Y path for the atoms based on their state
      getDeflectionY(baseY, targetState, t) {
        if (t < 0.5) return baseY; // Linear before magnet
        const magnetProgress = (t - 0.5) * 2; // Normalize 0 to 1 after magnet
        const targetY = targetState === 0 ? baseY - 50 : baseY + 50;
        
        // Sine easing for a smooth curve
        return baseY + (targetY - baseY) * Math.sin(magnetProgress * (Math.PI / 2));
      }

      updateAtomPositions() {
        const startX = 80;
        const endX = 540;
        const currentX = startX + (endX - startX) * this.progress;

        this.els.atomA.setAttribute('cx', currentX);
        this.els.atomA.setAttribute('cy', this.getDeflectionY(100, this.stateA, this.progress));
        
        this.els.atomB.setAttribute('cx', currentX);
        this.els.atomB.setAttribute('cy', this.getDeflectionY(280, this.stateB, this.progress));

        // Colorize atoms as they pass through the magnet
        if (this.progress > 0.5) {
          this.els.atomA.setAttribute('fill', this.stateA === 0 ? '#10b981' : '#f59e0b');
          this.els.atomB.setAttribute('fill', this.stateB === 0 ? '#10b981' : '#f59e0b');
        }
      }

      triggerHit() {
        this.els.atomA.setAttribute('opacity', '0');
        this.els.atomB.setAttribute('opacity', '0');

        // Light up correct pads
        this.els.pads['a' + this.stateA].classList.replace('off', 'active');
        this.els.pads['b' + this.stateB].classList.replace('off', 'active');

        // Light up the joint state
        const jointKey = '' + this.stateA + this.stateB;
        this.els.states[jointKey].box.classList.add('active');
        this.els.states[jointKey].txt.classList.add('active');
      }

      resetHit() {
        Object.values(this.els.pads).forEach(pad => pad.classList.replace('active', 'off'));
        Object.values(this.els.states).forEach(state => {
          state.box.classList.remove('active');
          state.txt.classList.remove('active');
        });
      }
    }
    customElements.define('parallel-sg', ParallelSG);
  }
})();