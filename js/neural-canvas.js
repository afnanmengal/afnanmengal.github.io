/**
 * Interactive Neural Network Particle Graph & Synaptic Canvas
 * Engr. Afnan Badar Portfolio
 * Features:
 * - High-DPI canvas rendering
 * - Neural node clusters with spring physics
 * - Synaptic weight lines with dynamic gradient glow
 * - Action potential pulse propagation along active synapses
 * - Cursor activation attractor & click pulse wave
 * - Adaptive performance optimization
 */

class NeuralCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.width = 0;
    this.height = 0;
    this.nodes = [];
    this.pulses = [];
    this.waves = [];
    
    this.mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false,
      radius: 180
    };

    // Color definitions
    this.colors = {
      cyan: { r: 6, g: 182, b: 212 },      // #06b6d4
      violet: { r: 168, g: 85, b: 247 },   // #a855f7
      emerald: { r: 16, g: 185, b: 129 },  // #10b981
      blue: { r: 59, g: 130, b: 246 }      // #3b82f6
    };

    this.animationFrameId = null;
    this.isPaused = false;
    this.lastTime = 0;

    this.init();
  }

  init() {
    this.resize();
    this.createNodes();
    this.bindEvents();
    this.animate(0);
  }

  resize() {
    const parent = this.canvas.parentElement || document.body;
    this.width = parent.clientWidth || window.innerWidth;
    this.height = parent.clientHeight || window.innerHeight;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(this.dpr, this.dpr);

    // Adjust node count based on screen size
    if (this.nodes.length > 0) {
      this.createNodes();
    }
  }

  createNodes() {
    this.nodes = [];
    // Responsive node count
    const area = this.width * this.height;
    let nodeCount = Math.floor(area / 14000);
    nodeCount = Math.max(35, Math.min(nodeCount, 85));

    const colorKeys = ['cyan', 'violet', 'cyan', 'blue', 'emerald'];

    for (let i = 0; i < nodeCount; i++) {
      const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
      const color = this.colors[colorKey];
      
      // Categorize into pseudo-layers (Input, Hidden, Output clusters)
      const layerIndex = i % 3; // 0 = Input, 1 = Hidden, 2 = Output

      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        baseRadius: Math.random() * 2.2 + 1.8,
        radius: 2,
        color: color,
        colorKey: colorKey,
        alpha: Math.random() * 0.45 + 0.35,
        layer: layerIndex,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        excitation: 0
      });
    }

    // Seed initial pulses along synapses
    this.pulses = [];
    for (let i = 0; i < 8; i++) {
      this.spawnRandomPulse();
    }
  }

  spawnRandomPulse() {
    if (this.nodes.length < 2) return;
    const startIndex = Math.floor(Math.random() * this.nodes.length);
    // Find closest neighbor
    let closestIndex = -1;
    let minDist = 180;
    const a = this.nodes[startIndex];

    for (let j = 0; j < this.nodes.length; j++) {
      if (j === startIndex) continue;
      const b = this.nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) {
        minDist = dist;
        closestIndex = j;
      }
    }

    if (closestIndex !== -1) {
      this.pulses.push({
        from: startIndex,
        to: closestIndex,
        progress: 0,
        speed: 0.008 + Math.random() * 0.012,
        color: a.color
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => this.resize(), 150);
    });

    const targetElement = this.canvas.parentElement || window;

    targetElement.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.targetX = e.clientX - rect.left;
      this.mouse.targetY = e.clientY - rect.top;
      this.mouse.isHovered = true;
    });

    targetElement.addEventListener('mouseleave', () => {
      this.mouse.targetX = -1000;
      this.mouse.targetY = -1000;
      this.mouse.isHovered = false;
    });

    // Touch support for mobile
    targetElement.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.targetX = e.touches[0].clientX - rect.left;
        this.mouse.targetY = e.touches[0].clientY - rect.top;
        this.mouse.isHovered = true;
      }
    }, { passive: true });

    targetElement.addEventListener('touchend', () => {
      this.mouse.targetX = -1000;
      this.mouse.targetY = -1000;
      this.mouse.isHovered = false;
    });

    // Action potential wave trigger on click
    targetElement.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      this.triggerActionPotentialWave(clickX, clickY);
    });

    // Pause when page is hidden
    document.addEventListener('visibilitychange', () => {
      this.isPaused = document.hidden;
      if (!this.isPaused) {
        this.lastTime = performance.now();
        this.animate(this.lastTime);
      }
    });
  }

  triggerActionPotentialWave(x, y) {
    this.waves.push({
      x: x,
      y: y,
      radius: 0,
      maxRadius: Math.max(this.width, this.height) * 0.7,
      speed: 8,
      alpha: 0.9,
      color: this.colors.cyan
    });

    // Excite nearby nodes
    this.nodes.forEach(node => {
      const dx = node.x - x;
      const dy = node.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 260) {
        node.excitation = 1.0;
      }
    });

    // Trigger multiple fast pulses
    for (let i = 0; i < 5; i++) {
      this.spawnRandomPulse();
    }
  }

  update(delta) {
    // Smooth mouse interpolation
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.12;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.12;

    // Periodically spawn new synaptic pulses
    if (Math.random() < 0.05 && this.pulses.length < 24) {
      this.spawnRandomPulse();
    }

    // Update nodes
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];

      // Subtle breathing pulse
      node.pulsePhase += node.pulseSpeed;
      const breath = Math.sin(node.pulsePhase) * 0.5 + 0.5;

      // Natural movement
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off boundaries gently
      if (node.x < 10) { node.x = 10; node.vx *= -1; }
      else if (node.x > this.width - 10) { node.x = this.width - 10; node.vx *= -1; }
      if (node.y < 10) { node.y = 10; node.vy *= -1; }
      else if (node.y > this.height - 10) { node.y = this.height - 10; node.vy *= -1; }

      // Mouse interactive attraction & excitation
      if (this.mouse.isHovered) {
        const dx = this.mouse.x - node.x;
        const dy = this.mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius && dist > 1) {
          const force = (1 - dist / this.mouse.radius) * 0.035;
          node.x += dx * force;
          node.y += dy * force;
          node.excitation = Math.max(node.excitation, (1 - dist / this.mouse.radius) * 0.85);
        }
      }

      // Decay excitation
      node.excitation *= 0.96;
      if (node.excitation < 0.01) node.excitation = 0;

      // Effective radius
      node.radius = node.baseRadius + breath * 1.0 + node.excitation * 3.0;
    }

    // Update pulses
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const pulse = this.pulses[i];
      pulse.progress += pulse.speed;
      if (pulse.progress >= 1) {
        // Excite target node
        const targetNode = this.nodes[pulse.to];
        if (targetNode) {
          targetNode.excitation = Math.min(1.0, targetNode.excitation + 0.5);
        }
        this.pulses.splice(i, 1);
      }
    }

    // Update action potential waves
    for (let i = this.waves.length - 1; i >= 0; i--) {
      const wave = this.waves[i];
      wave.radius += wave.speed;
      wave.alpha = Math.max(0, 1 - (wave.radius / wave.maxRadius));

      // Excite nodes that intersect wave ring
      this.nodes.forEach(node => {
        const dx = node.x - wave.x;
        const dy = node.y - wave.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (Math.abs(dist - wave.radius) < 20) {
          node.excitation = Math.max(node.excitation, wave.alpha * 0.9);
        }
      });

      if (wave.radius >= wave.maxRadius || wave.alpha <= 0.02) {
        this.waves.splice(i, 1);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const maxConnectionDist = 145;

    // 1. Draw synaptic connection lines between nodes
    for (let i = 0; i < this.nodes.length; i++) {
      const a = this.nodes[i];
      for (let j = i + 1; j < this.nodes.length; j++) {
        const b = this.nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxConnectionDist) {
          const proximity = 1 - (dist / maxConnectionDist);
          const activeBoost = (a.excitation + b.excitation) * 0.5;
          const alpha = (proximity * 0.22 + activeBoost * 0.45);

          const grad = this.ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(${a.color.r}, ${a.color.g}, ${a.color.b}, ${alpha})`);
          grad.addColorStop(1, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${alpha})`);

          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.strokeStyle = grad;
          this.ctx.lineWidth = 1 + activeBoost * 1.5;
          this.ctx.stroke();
        }
      }

      // Connect nodes to mouse cursor if within range
      if (this.mouse.isHovered) {
        const mdx = this.mouse.x - a.x;
        const mdy = this.mouse.y - a.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < this.mouse.radius) {
          const mProximity = 1 - (mdist / this.mouse.radius);
          const mGrad = this.ctx.createLinearGradient(a.x, a.y, this.mouse.x, this.mouse.y);
          mGrad.addColorStop(0, `rgba(${a.color.r}, ${a.color.g}, ${a.color.b}, ${mProximity * 0.6})`);
          mGrad.addColorStop(1, `rgba(6, 182, 212, ${mProximity * 0.8})`);

          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = mGrad;
          this.ctx.lineWidth = 1.2 * mProximity + 0.5;
          this.ctx.stroke();
        }
      }
    }

    // 2. Draw active pulses traveling across synapses
    for (let i = 0; i < this.pulses.length; i++) {
      const p = this.pulses[i];
      const nodeFrom = this.nodes[p.from];
      const nodeTo = this.nodes[p.to];
      if (!nodeFrom || !nodeTo) continue;

      const px = nodeFrom.x + (nodeTo.x - nodeFrom.x) * p.progress;
      const py = nodeFrom.y + (nodeTo.y - nodeFrom.y) * p.progress;

      // Glow halo
      this.ctx.beginPath();
      this.ctx.arc(px, py, 4, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.8)`;
      this.ctx.fill();

      // Core photon
      this.ctx.beginPath();
      this.ctx.arc(px, py, 1.8, 0, Math.PI * 2);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fill();
    }

    // 3. Draw action potential waves
    for (let i = 0; i < this.waves.length; i++) {
      const w = this.waves[i];
      this.ctx.beginPath();
      this.ctx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(6, 182, 212, ${w.alpha * 0.4})`;
      this.ctx.lineWidth = 2.5;
      this.ctx.stroke();
    }

    // 4. Draw neural nodes with multi-layer glowing halos
    for (let i = 0; i < this.nodes.length; i++) {
      const n = this.nodes[i];
      const totalAlpha = Math.min(1.0, n.alpha + n.excitation * 0.6);

      // Outer glow
      if (n.excitation > 0.05) {
        const glowRadius = n.radius * (3 + n.excitation * 3);
        const glowGrad = this.ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowRadius);
        glowGrad.addColorStop(0, `rgba(${n.color.r}, ${n.color.g}, ${n.color.b}, ${n.excitation * 0.4})`);
        glowGrad.addColorStop(1, `rgba(${n.color.r}, ${n.color.g}, ${n.color.b}, 0)`);

        this.ctx.beginPath();
        this.ctx.arc(n.x, n.y, glowRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = glowGrad;
        this.ctx.fill();
      }

      // Mid body
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${n.color.r}, ${n.color.g}, ${n.color.b}, ${totalAlpha})`;
      this.ctx.fill();

      // Bright nucleus
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, Math.max(1, n.radius * 0.45), 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1.0, totalAlpha + 0.3)})`;
      this.ctx.fill();
    }

    // 5. Draw mouse focal activation ring
    if (this.mouse.isHovered) {
      this.ctx.beginPath();
      this.ctx.arc(this.mouse.x, this.mouse.y, 14, 0, Math.PI * 2);
      this.ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(this.mouse.x, this.mouse.y, 3, 0, Math.PI * 2);
      this.ctx.fillStyle = '#00f2fe';
      this.ctx.fill();
    }
  }

  animate(currentTime) {
    if (this.isPaused) return;

    const delta = currentTime - (this.lastTime || currentTime);
    this.lastTime = currentTime;

    this.update(delta);
    this.draw();

    this.animationFrameId = requestAnimationFrame((t) => this.animate(t));
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const heroCanvas = new NeuralCanvas('neural-canvas');
});
