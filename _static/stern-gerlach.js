(() => {
  if (!customElements.get('stern-gerlach')) {
    class SternGerlach extends HTMLElement {
      connectedCallback() {
        this.mode = this.getAttribute('mode') || 'quantum';
        this.style.display = 'block';
        this.style.width = '100%';
        this.style.height = this.getAttribute('height') || '220px';
        
        // Helper to start the sketch once we know the DOM has a width
        const startSketch = () => {
          const initInterval = setInterval(() => {
            if (this.clientWidth > 0) {
              clearInterval(initInterval);
              this.sketch = new p5(this.createSketch(this.mode), this);
            }
          }, 50);
        };

        // If p5 is already loaded, start immediately
        if (window.p5) {
          startSketch();
        } else {
          // If not, dynamically inject the p5 script tag into the page
          if (!document.getElementById('p5-dependency')) {
            const script = document.createElement('script');
            script.id = 'p5-dependency';
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js';
            document.head.appendChild(script);
          }
          
          // Wait for the injected script to finish downloading
          const waitForP5 = setInterval(() => {
            if (window.p5) {
              clearInterval(waitForP5);
              startSketch();
            }
          }, 50);
        }
      }

      disconnectedCallback() {
        if (this.sketch) this.sketch.remove();
      }

      createSketch(mode) {
        return (p) => {
          let particles = [];
                    
          // Replace your existing config with this tighter bounding box
          const config = {
            logicalW: 650, // Shrunk from 800 to remove horizontal dead space
            logicalH: 220, 
            
            // Shifted left by 45px
            oven: { x: 5, y: 70, w: 75, h: 80, nozzle: { x: 80, y: 102, w: 6, h: 16 } },
            
            // Shifted left by 45px
            magnet: { startX: 275, drawX: 305, endX: 435, width: 100 },
            
            // Shifted left by 45px
            screen: { x: 635, y: 30, w: 12, h: 160 },
            
            spawnRate: 3, 
            particleSpeed: 3.5
          };

          p.setup = () => {
            // Auto-calculate height to maintain the 800:220 aspect ratio based on column width
            const currentWidth = this.clientWidth;
            const userHeight = this.getAttribute('height');
            const calculatedHeight = userHeight ? parseInt(userHeight) : currentWidth * (config.logicalH / config.logicalW);
            
            this.style.height = `${calculatedHeight}px`;
            p.createCanvas(currentWidth, calculatedHeight);
            p.noStroke();
          };

          p.windowResized = () => {
            const currentWidth = this.clientWidth;
            const userHeight = this.getAttribute('height');
            const calculatedHeight = userHeight ? parseInt(userHeight) : currentWidth * (config.logicalH / config.logicalW);
            
            this.style.height = `${calculatedHeight}px`;
            p.resizeCanvas(currentWidth, calculatedHeight);
          };
          
          p.draw = () => {
            p.clear();
            const scale = Math.min(p.width / config.logicalW, p.height / config.logicalH);
            p.push();
            p.scale(scale);

            drawOven();
            drawMagnets();
            drawScreen();
            updateAndDrawParticles();

            p.pop();
          };

          class Particle {
            constructor() {
              this.x = config.oven.nozzle.x;
              this.y = 110;
              this.vx = config.particleSpeed;
              this.vy = 0;
              this.spin = mode === 'quantum' ? (p.random() > 0.5 ? 1 : -1) : p.random(-1, 1);
              const baseVy = mode === 'quantum' ? 0.40 : 0.65;
              this.targetVy = this.spin * baseVy * (config.particleSpeed / 3.5);
            }
            update() {
              this.x += this.vx;
              if (this.x > config.magnet.startX && this.x < config.magnet.endX) {
                const progress = (this.x - config.magnet.startX) / (config.magnet.endX - config.magnet.startX);
                this.vy = this.targetVy * p.sin(progress * p.HALF_PI);
              } else if (this.x >= config.magnet.endX) {
                this.vy = this.targetVy;
              }
              this.y += this.vy;
            }
            draw() {
              p.fill('#ff4500');
              p.drawingContext.shadowColor = '#ff2200';
              p.drawingContext.shadowBlur = 10;
              p.circle(this.x, this.y, 5.6);
              p.drawingContext.shadowBlur = 0;
            }
          }

          function updateAndDrawParticles() {
            if (p.frameCount % config.spawnRate === 0) particles.push(new Particle());
            for (let i = particles.length - 1; i >= 0; i--) {
              particles[i].update();
              particles[i].draw();
              if (particles[i].x >= config.screen.x) particles.splice(i, 1);
            }
          }

          function drawOven() {
            p.fill('#475569'); p.stroke('#334155'); p.strokeWeight(2);
            p.rect(config.oven.x, config.oven.y, config.oven.w, config.oven.h);
            p.fill('#000000'); p.noStroke();
            p.rect(config.oven.nozzle.x, config.oven.nozzle.y, config.oven.nozzle.w, config.oven.nozzle.h);
            p.fill('#94a3b8'); p.textAlign(p.CENTER, p.CENTER); p.textSize(18); p.textFont('monospace');
            p.text('Oven', config.oven.x + (config.oven.w / 2), 58);
          }

          function drawMagnets() {
            p.fill('#ef4444'); p.noStroke();
            p.triangle(config.magnet.drawX, 35, config.magnet.drawX + config.magnet.width, 35, config.magnet.drawX + (config.magnet.width/2), 80);
            p.fill('#ffffff'); p.textSize(21); p.textStyle(p.BOLD);
            p.text('N', config.magnet.drawX + (config.magnet.width/2), 55);

            p.fill('#3b82f6'); p.textStyle(p.NORMAL);
            p.rect(config.magnet.drawX, 140, config.magnet.width, 60);
            p.fill('#ffffff'); p.textSize(21); p.textStyle(p.BOLD);
            p.text('S', config.magnet.drawX + (config.magnet.width/2), 170);

            p.fill('#94a3b8'); p.textSize(15); p.textStyle(p.NORMAL);
            p.text('Inhomogeneous Field', config.magnet.drawX + (config.magnet.width/2), 22);
          }

          function drawScreen() {
            p.fill('rgba(147, 197, 253, 0.2)'); p.stroke('#60a5fa'); p.strokeWeight(2);
            p.rect(config.screen.x, config.screen.y, config.screen.w, config.screen.h);
            p.noStroke(); p.fill('#94a3b8'); p.textSize(15);
            p.text('Screen', config.screen.x + 6, 22);

            if (mode === 'quantum') {
              p.fill('#10b981'); p.drawingContext.shadowColor = '#10b981'; p.drawingContext.shadowBlur = 10;
              p.circle(config.screen.x + 6, 75, 13);
              p.circle(config.screen.x + 6, 145, 13);
              p.drawingContext.shadowBlur = 0;
            } else {
              let grad = p.drawingContext.createLinearGradient(0, 65, 0, 155);
              grad.addColorStop(0, 'rgba(168, 85, 247, 0.1)');
              grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.8)');
              grad.addColorStop(1, 'rgba(168, 85, 247, 0.1)');
              p.drawingContext.fillStyle = grad;
              p.rect(config.screen.x + 2, 50, 8, 120);
            }
          }
        };
      }
    }
    customElements.define('stern-gerlach', SternGerlach);
  }
})();