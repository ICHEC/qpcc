(() => {
  if (!customElements.get('bloch-sphere')) {
    class BlochSphere extends HTMLElement {
      connectedCallback() {
        // Read props with defaults
        this.size = parseInt(this.getAttribute('size')) || 340;
        this.animatePath = this.getAttribute('animatePath') !== 'false';
        this.speed = parseFloat(this.getAttribute('speed')) || 1.0;
        this.spinDirection = this.getAttribute('autoSpin') || 'none';
        this.labelSize = parseFloat(this.getAttribute('labelSize')) || 1.0;
        this.labelOpacity = parseFloat(this.getAttribute('labelOpacity')) || 0.9;

        this.renderDOM();

        // Dynamically load Three.js if not present
        if (window.THREE) {
          this.initThree();
        } else {
          if (!document.getElementById('three-dependency')) {
            const script = document.createElement('script');
            script.id = 'three-dependency';
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            document.head.appendChild(script);
          }
          const waitForThree = setInterval(() => {
            if (window.THREE) {
              clearInterval(waitForThree);
              this.initThree();
            }
          }, 50);
        }
      }

      disconnectedCallback() {
        cancelAnimationFrame(this.animationFrameId);
        this.clearTrails();
        if (this.renderer) this.renderer.dispose();
        window.removeEventListener('mousemove', this.onMouseMoveBound);
        window.removeEventListener('mouseup', this.onMouseUpBound);
      }

      renderDOM() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              margin: 0.5rem 0;
              user-select: none;
              font-family: sans-serif;
            }
            #canvas-container {
              width: ${this.size}px;
              height: ${this.size}px;
              cursor: grab;
              position: relative;
              z-index: 0;
              filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
            }
            #canvas-container:active { cursor: grabbing; }
            
            .toolbar {
              width: ${this.size}px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: var(--jp-layout-color2, rgba(156, 163, 175, 0.1));
              padding: 4px 8px;
              border-radius: 4px;
              border: 1px solid var(--jp-border-color1, rgba(156, 163, 175, 0.2));
              margin-top: -12px;
              font-family: monospace;
              font-size: 12px;
              z-index: 10;
              position: relative;
              box-sizing: border-box;
              backdrop-filter: blur(4px);
            }
            .coords { display: flex; align-items: center; gap: 16px; color: var(--jp-content-font-color2, #6b7280); }
            .coord-val { width: 48px; }
            .theta-lbl { color: #ef4444; font-weight: bold; }
            .phi-lbl { color: #3b82f6; font-weight: bold; }
            .divider { color: rgba(156, 163, 175, 0.4); }
            
            .controls { display: flex; gap: 4px; }
            button {
              background: transparent;
              border: 1px solid rgba(156, 163, 175, 0.3);
              color: var(--jp-content-font-color2, #6b7280);
              border-radius: 4px;
              padding: 2px 8px;
              cursor: pointer;
              font-size: 14px;
              transition: all 0.2s;
            }
            button:hover { background: rgba(156, 163, 175, 0.1); }
            button.active {
              background: rgba(59, 130, 246, 0.2);
              color: #3b82f6;
              border-color: rgba(59, 130, 246, 0.3);
            }
          </style>

          <div id="canvas-container"></div>
          
          <div class="toolbar">
            <div class="coords">
              <span>Coordinate:</span>
              <div class="coord-val text-right"><span class="theta-lbl">θ</span> <span id="val-theta">0</span>°</div>
              <div class="divider">|</div>
              <div class="coord-val"><span class="phi-lbl">φ</span> <span id="val-phi">0</span>°</div>
            </div>
            <div class="controls">
              <button id="btn-left" title="Auto-Rotate Left">↺</button>
              <button id="btn-right" title="Auto-Rotate Right">↻</button>
            </div>
          </div>
        `;

        this.elTheta = this.shadowRoot.getElementById('val-theta');
        this.elPhi = this.shadowRoot.getElementById('val-phi');
        this.btnLeft = this.shadowRoot.getElementById('btn-left');
        this.btnRight = this.shadowRoot.getElementById('btn-right');

        this.btnLeft.addEventListener('click', () => this.toggleSpin('left'));
        this.btnRight.addEventListener('click', () => this.toggleSpin('right'));
        this.updateButtons();
      }

      toggleSpin(dir) {
        this.spinDirection = this.spinDirection === dir ? 'none' : dir;
        this.updateButtons();
      }

      updateButtons() {
        this.btnLeft.className = this.spinDirection === 'left' ? 'active' : '';
        this.btnRight.className = this.spinDirection === 'right' ? 'active' : '';
      }

      updateUI(theta, phi) {
        this.elTheta.textContent = theta;
        this.elPhi.textContent = phi;
      }

      getPhysicsCartesian(thetaDeg, phiDeg, radius = 2) {
        const theta = (thetaDeg * Math.PI) / 180;
        const phi = (phiDeg * Math.PI) / 180;
        return new THREE.Vector3(
          radius * Math.sin(theta) * Math.cos(phi),
          radius * Math.cos(theta),
          -radius * Math.sin(theta) * Math.sin(phi)
        );
      }

      generatePathData() {
        const data = [];
        const steps = 30;
        for (let i = 0; i <= steps; i++) data.push({ theta: (i / steps) * 90, phi: 0 });
        for (let i = 1; i <= steps; i++) data.push({ theta: 90, phi: (i / steps) * 90 });
        for (let i = 1; i <= steps; i++) data.push({ theta: 90 + (i / steps) * 90, phi: 90 });
        for (let i = 1; i <= steps; i++) data.push({ theta: 180 - (i / steps) * 90, phi: 90 + (i / steps) * 180 });
        for (let i = 1; i <= steps; i++) data.push({ theta: 90, phi: 270 - (i / steps) * 90 });
        for (let i = 1; i <= steps; i++) data.push({ theta: 90 - (i / steps) * 90, phi: 180 });
        return data;
      }

      clearTrails() {
        if (!this.sphereGroup) return;
        this.trailArrows.forEach(arrow => {
          this.sphereGroup.remove(arrow);
          if (arrow.line) { arrow.line.geometry.dispose(); arrow.line.material.dispose(); }
          if (arrow.cone) { arrow.cone.geometry.dispose(); arrow.cone.material.dispose(); }
        });
        this.trailArrows = [];
      }

      createTextSprite(text, color) {
        const canvas = document.createElement('canvas');
        canvas.width = 512; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        ctx.font = 'bold 96px sans-serif';
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 10;
        ctx.fillText(text, 256, 128);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;

        const spriteMat = new THREE.SpriteMaterial({ 
          map: texture, depthTest: false, transparent: true, opacity: this.labelOpacity
        });
        
        const sprite = new THREE.Sprite(spriteMat);
        const scale = this.labelSize;
        sprite.scale.set(1.5 * scale, 0.75 * scale, 1);
        return sprite;
      }

      initThree() {
        const container = this.shadowRoot.getElementById('canvas-container');
        
        this.scene = new THREE.Scene();
        const aspect = 1; // Since width == height
        const d = 2.7;
        this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
        this.camera.position.set(5, 4, 6);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(this.size, this.size);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(this.renderer.domElement);

        this.sphereGroup = new THREE.Group();
        this.scene.add(this.sphereGroup);

        this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));
        const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
        keyLight.position.set(6, 10, 4);
        this.scene.add(keyLight);

        const glassMat = new THREE.MeshPhysicalMaterial({
          color: 0xffffff, transparent: true, opacity: 0.12, roughness: 0.15, side: THREE.DoubleSide
        });
        this.sphereGroup.add(new THREE.Mesh(new THREE.SphereGeometry(2, 64, 64), glassMat));
        
        const equator = new THREE.Mesh(
          new THREE.TorusGeometry(2, 0.015, 16, 100), 
          new THREE.MeshStandardMaterial({ color: 0x4b5563, transparent: true, opacity: 0.4 })
        );
        equator.rotation.x = Math.PI / 2;
        this.sphereGroup.add(equator);

        const createMarker = (name, theta, phi, color) => {
          const pos = this.getPhysicsCartesian(theta, phi, 2.0);
          const dot = new THREE.Mesh(
            new THREE.SphereGeometry(0.07, 16, 16),
            new THREE.MeshStandardMaterial({ color, roughness: 0.2 })
          );
          dot.position.copy(pos);
          this.sphereGroup.add(dot);
          
          const label = this.createTextSprite(name, color);
          label.position.copy(pos).multiplyScalar(1.25);
          this.sphereGroup.add(label);
        };

        createMarker('|0⟩ (Z)', 0, 0, '#10b981');
        createMarker('|1⟩ (-Z)', 180, 0, '#10b981');
        createMarker('|+⟩ (X)', 90, 0, '#ef4444');
        createMarker('|-⟩ (-X)', 90, 180, '#ef4444');
        createMarker('|+i⟩ (Y)', 90, 90, '#3b82f6');
        createMarker('|-i⟩ (-Y)', 90, 270, '#3b82f6');

        const createAxisArrow = (dir, color) => {
          const arrow = new THREE.ArrowHelper(dir, new THREE.Vector3(0,0,0), 2.4, color, 0.2, 0.08);
          arrow.line.material.transparent = true; arrow.line.material.opacity = 0.5;
          arrow.cone.material.transparent = true; arrow.cone.material.opacity = 0.8;
          return arrow;
        };
        
        this.sphereGroup.add(createAxisArrow(new THREE.Vector3(1, 0, 0), 0xef4444));
        this.sphereGroup.add(createAxisArrow(new THREE.Vector3(0, 0, -1), 0x3b82f6));
        this.sphereGroup.add(createAxisArrow(new THREE.Vector3(0, 1, 0), 0x10b981));

        this.pathMilestones = this.generatePathData();
        this.trailArrows = [];

        this.movingVector = new THREE.ArrowHelper(
          new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 1.95, 0xef4444, 0.35, 0.16
        );
        this.movingVector.line.material.linewidth = 3;
        this.sphereGroup.add(this.movingVector);

        // Interaction Setup
        this.isDragging = false;
        this.prevMouse = { x: 0, y: 0 };
        
        container.addEventListener('mousedown', (e) => { 
          this.isDragging = true; 
          this.prevMouse = { x: e.clientX, y: e.clientY }; 
        });
        
        this.onMouseMoveBound = (e) => {
          if (!this.isDragging) return;
          this.sphereGroup.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), (e.clientY - this.prevMouse.y) * 0.006);
          this.sphereGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), (e.clientX - this.prevMouse.x) * 0.006);
          this.prevMouse = { x: e.clientX, y: e.clientY };
        };
        
        this.onMouseUpBound = () => { this.isDragging = false; };
        
        window.addEventListener('mousemove', this.onMouseMoveBound);
        window.addEventListener('mouseup', this.onMouseUpBound);

        this.timeProgress = 0;
        this.lastRecordedIndex = -1;

        const animate = () => {
          this.animationFrameId = requestAnimationFrame(animate);

          if (!this.isDragging) {
            if (this.spinDirection === 'left') {
              this.sphereGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -0.004);
            } else if (this.spinDirection === 'right') {
              this.sphereGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.004);
            }
          }

          if (this.animatePath) {
            this.timeProgress += 0.0025 * this.speed;
            const rawIndex = Math.floor(this.timeProgress * this.pathMilestones.length);
            const currentIndex = rawIndex % this.pathMilestones.length;

            if (currentIndex === 0 && this.lastRecordedIndex === this.pathMilestones.length - 1) {
              this.clearTrails();
            }

            if (currentIndex !== this.lastRecordedIndex) {
              const milestone = this.pathMilestones[currentIndex];
              if (milestone) {
                this.updateUI(Math.round(milestone.theta), Math.round(milestone.phi));

                const targetPosition = this.getPhysicsCartesian(milestone.theta, milestone.phi, 1.95);
                this.movingVector.setDirection(targetPosition.clone().normalize());

                if (this.lastRecordedIndex !== -1 && currentIndex !== 0) {
                  const lastMilestone = this.pathMilestones[this.lastRecordedIndex];
                  const trailDir = this.getPhysicsCartesian(lastMilestone.theta, lastMilestone.phi, 1.95).normalize();
                  const trailArrow = new THREE.ArrowHelper(trailDir, new THREE.Vector3(0,0,0), 1.92, 0x9ca3af, 0.15, 0.06);
                  trailArrow.line.material.opacity = 0.25;
                  trailArrow.line.material.transparent = true;
                  this.trailArrows.push(trailArrow);
                  this.sphereGroup.add(trailArrow);
                }
                this.lastRecordedIndex = currentIndex;
              }
            }
          }
          this.renderer.render(this.scene, this.camera);
        };
        animate();
      }
    }
    customElements.define('bloch-sphere', BlochSphere);
  }
})();