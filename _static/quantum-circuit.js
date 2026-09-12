(() => {
if (!customElements.get('quantum-circuit')){
  class QuantumCircuit extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
    
    static get observedAttributes() {
      return ['qubits', 'gates', 'scale', 'classical'];
    }
    
    connectedCallback() {
      this.render();
    }
    
    attributeChangedCallback() {
      this.render();
    }
    
    render() {
      // 1. Core Props
      const qubits = parseInt(this.getAttribute('qubits')) || 3;
      const scale = parseFloat(this.getAttribute('scale')) || 1;
      const rawGates = this.getAttribute('gates') || '';
      const userWantsClassical = this.getAttribute('classical') !== 'false';
      
      // 2. Parse Gates
      const parsed = rawGates.split(',').map(s => s.trim()).filter(s => s).map(gateStr => {
        const parts = gateStr.split(':');
        const type = parts[0].trim().toUpperCase();
        
        if (type === 'BOX') {
          return { type: 'BOX', name: parts[1] || 'U', target: parseInt(parts[3] || 1, 10), control: parseInt(parts[2] || 0, 10) };
        }
        
        return { 
          type, 
          target: parseInt(parts[1] || 0, 10), 
          control: parts[2] !== undefined ? parseInt(parts[2], 10) : null 
        };
      });
      
      const operationalGates = parsed.filter(g => g.type !== 'M');
      const measurementGates = parsed.filter(g => g.type === 'M');
      
      // 3. Layout Compiler (Collision Detection)
      const steps = [];
      const wireTimelines = Array(qubits).fill(0);
      
      operationalGates.forEach(gate => {
        let physicalSpan = [gate.target];
        const primaryWires = [gate.target];
        if (gate.control !== null) primaryWires.push(gate.control);
        
        if (gate.type === 'CNOT' || gate.type === 'BOX') {
          const minWire = Math.min(gate.control, gate.target);
          const maxWire = Math.max(gate.control, gate.target);
          physicalSpan = [];
          for (let w = minWire; w <= maxWire; w++) physicalSpan.push(w);
        }
        
        let startFromStep = 0;
        primaryWires.forEach(w => {
          if (wireTimelines[w] > startFromStep) startFromStep = wireTimelines[w];
        });
        
        let stepIndex = startFromStep;
        while (true) {
          if (!steps[stepIndex]) steps[stepIndex] = [];
          
          const collision = steps[stepIndex].some(existingGate => {
            let existingSpan = [existingGate.target];
            if (existingGate.type === 'CNOT' || existingGate.type === 'BOX') {
              const minW = Math.min(existingGate.control, existingGate.target);
              const maxW = Math.max(existingGate.control, existingGate.target);
              existingSpan = [];
              for (let w = minW; w <= maxW; w++) existingSpan.push(w);
            }
            return physicalSpan.some(w => existingSpan.includes(w));
          });
          
          if (!collision) {
            steps[stepIndex].push(gate);
            physicalSpan.forEach(w => wireTimelines[w] = stepIndex + 1);
            break;
          }
          stepIndex++;
        }
      });
      
      if (measurementGates.length > 0) {
        const finalIndex = steps.length;
        steps[finalIndex] = [];
        measurementGates.forEach(gate => steps[finalIndex].push(gate));
      }
      
      // 4. Geometry Metrics
      const showClassical = userWantsClassical || measurementGates.length > 0;
      
      const wirePaddingTop = 20;
      const wireSpacing = 36; 
      const stepWidth = 42;   
      const leftLabelWidth = 55; 
      const rightLabelWidth = 25;
      
      const totalSteps = Math.max(steps.length, 1);
      const nativeWidth = leftLabelWidth + (totalSteps * stepWidth) + rightLabelWidth;
      const nativeHeight = (qubits * wireSpacing) + (showClassical ? 30 : 0);
      
      const scaledWidth = nativeWidth * scale;
      const scaledHeight = nativeHeight * scale;
      
      const getWireY = (q) => wirePaddingTop + (q * wireSpacing);
      const getStepX = (step) => leftLabelWidth + (step * stepWidth) + (stepWidth / 2);
      const getClassicalWireY = () => wirePaddingTop + (qubits * wireSpacing) + 5;
      
      // 5. SVG Builder Helpers
      let svgContent = '';
      
      // Wires
      for (let q = 0; q < qubits; q++) {
        const y = getWireY(q);
        svgContent += `
          <text x="${leftLabelWidth - 6}" y="${y - 1}" font-size="12px" font-family="serif" fill="#888" text-anchor="end" dominant-baseline="central">
            <tspan dy="0">|</tspan>q<tspan font-size="8px" font-family="monospace" dy="3">${q}</tspan><tspan dy="-3">⟩</tspan>
          </text>
          <line x1="${leftLabelWidth}" y1="${y}" x2="${nativeWidth - rightLabelWidth}" y2="${y}" stroke="#888" stroke-opacity="0.4" stroke-width="1.5" />
        `;
      }
      
      // Classical Register
      if (showClassical) {
        const cy = getClassicalWireY();
        svgContent += `
          <text x="${leftLabelWidth - 9}" y="${cy}" font-size="16px" font-family="sans-serif" font-weight="bold" fill="#888" text-anchor="end" dominant-baseline="central">c</text>
          <line x1="${leftLabelWidth}" y1="${cy}" x2="${nativeWidth - rightLabelWidth}" y2="${cy}" stroke="#888" stroke-opacity="0.5" stroke-width="1" />
          <line x1="${leftLabelWidth}" y1="${cy + 3}" x2="${nativeWidth - rightLabelWidth}" y2="${cy + 3}" stroke="#888" stroke-opacity="0.5" stroke-width="1" />
        `;
      }
      
      // Gates
      steps.forEach((stepGates, stepIdx) => {
        const cx = getStepX(stepIdx);
        stepGates.forEach(gate => {
          const ty = getWireY(gate.target);
          
          if (gate.type === 'CNOT' && gate.control !== null) {
            const cy = getWireY(gate.control);
            svgContent += `
              <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${ty}" stroke="#3b82f6" stroke-width="1.5" />
              <circle cx="${cx}" cy="${cy}" r="4" fill="#3b82f6" />
              <circle cx="${cx}" cy="${ty}" r="7" fill="transparent" stroke="#3b82f6" stroke-width="1.5" />
              <line x1="${cx - 4}" y1="${ty}" x2="${cx + 4}" y2="${ty}" stroke="#3b82f6" stroke-width="1.5" />
              <line x1="${cx}" y1="${ty - 4}" x2="${cx}" y2="${ty + 4}" stroke="#3b82f6" stroke-width="1.5" />
            `;
          }
          else if (gate.type === 'BOX') {
            const cy = getWireY(gate.control);
            const minY = Math.min(cy, ty);
            const maxY = Math.max(cy, ty);
            const height = maxY - minY + 24;
            svgContent += `
              <rect x="${cx - 16}" y="${minY - 12}" width="32" height="${height}" rx="4" fill="var(--bg-color, #fff)" stroke="#a855f7" stroke-width="1.5" filter="url(#box-glow)" />
              <text x="${cx}" y="${(cy + ty) / 2}" font-size="9px" font-weight="bold" font-family="sans-serif" fill="#a855f7" text-anchor="middle" dominant-baseline="central">${gate.name}</text>
            `;
          }
          else if (gate.type === 'M') {
            const cy = getClassicalWireY();
            svgContent += `
              <line x1="${cx}" y1="${ty}" x2="${cx}" y2="${cy}" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="2 2" stroke-opacity="0.6"/>
              <rect x="${cx - 11}" y="${ty - 11}" width="22" height="22" rx="3" fill="var(--bg-color, #fff)" stroke="#f59e0b" stroke-width="1.5" filter="url(#measure-glow)" />
              <path d="M ${cx - 6} ${ty + 5} A 7 7 0 0 1 ${cx + 6} ${ty + 5}" fill="none" stroke="#f59e0b" stroke-width="1.2" />
              <line x1="${cx}" y1="${ty + 5}" x2="${cx + 4}" y2="${ty - 4}" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" />
            `;
          }
          else {
            svgContent += `
              <rect x="${cx - 11}" y="${ty - 11}" width="22" height="22" rx="3" fill="var(--bg-color, #fff)" stroke="#3b82f6" stroke-width="1.5" filter="url(#gate-glow)" />
              <text x="${cx}" y="${ty}" font-size="10px" font-weight="bold" font-family="sans-serif" fill="#3b82f6" text-anchor="middle" dominant-baseline="central">${gate.type}</text>
            `;
          }
        });
      });
      
      // 6. Mount
      this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          justify-content: center;
          width: 100%;
          margin: 1rem 0;
          user-select: none;
          --bg-color: var(--jp-layout-color1, #ffffff); /* Adapts to Jupyter theme */
        }
        svg { overflow: visible; font-family: monospace; }
      </style>
      <svg width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${nativeWidth} ${nativeHeight}">
        <defs>
          <filter id="gate-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="box-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="measure-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        ${svgContent}
      </svg>
    `;
  }
}

customElements.define('quantum-circuit', QuantumCircuit);
}
})();