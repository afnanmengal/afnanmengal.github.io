/**
 * Main Interactive Application Script
 * Engr. Afnan Badar Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbar();
  initDynamicText();
  initScrollSpy();
  initScrollAnimations();
  initProjectFilters();
  initProjectModals();
  initAgentSimulator();
  initContactAndWhatsApp();
  initEmailCopy();
});

/* ==========================================================================
   0. Executive Theme Toggle & Persistence (Default: Light Business Theme)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const mobileToggleBtn = document.getElementById('mobile-theme-toggle-btn');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch (e) {
      // LocalStorage access fallback
    }

    if (toggleBtn) {
      toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Business Light Mode' : 'Switch to Midnight Dark Mode');
    }
    if (mobileToggleBtn) {
      mobileToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Business Light Mode' : 'Switch to Midnight Dark Mode');
    }

    // Trigger canvas palette refresh if instantiated
    if (window.neuralCanvas && typeof window.neuralCanvas.updateThemeColors === 'function') {
      window.neuralCanvas.updateThemeColors();
    }
  }

  // Default to light business theme unless explicitly set to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  applyTheme(savedTheme);

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(targetTheme);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }
  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', toggleTheme);
  }
}

/* ==========================================================================
   1. Dynamic Typing Effect for Hero Sub-headline
   ========================================================================== */
function initDynamicText() {
  const dynamicElement = document.getElementById('dynamic-headline');
  if (!dynamicElement) return;

  const roles = [
    "AI Engineer & Autonomous Systems Consultant",
    "Enterprise AI Workflows & Multi-Agent Orchestration",
    "Speech-to-Speech Neural Translation (Neurolingo)",
    "Industrial Signal DSP & Predictive Maintenance Systems",
    "Diagnostic Computer Vision & Edge AI Deployment"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 65;
  let pauseDelay = 2200;

  function type() {
    const currentText = roles[roleIndex];

    if (isDeleting) {
      dynamicElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 35;
    } else {
      dynamicElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 65;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typingDelay = pauseDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 400;
    }

    setTimeout(type, typingDelay);
  }

  type();
}

/* ==========================================================================
   2. Sticky Glassmorphism Navbar & Mobile Drawer
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // Scroll effect on navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.classList.toggle('active');
    });

    // Close mobile drawer when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   3. Active Section Scroll Spy
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Scroll Reveal Animations (Intersection Observer)
   ========================================================================== */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

/* ==========================================================================
   5. Interactive Project Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.97)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   6. Project Architecture Details Modal
   ========================================================================== */
function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  const viewDetailButtons = document.querySelectorAll('.btn-view-details');

  if (!modal) return;

  function openModal(projectId) {
    const project = window.PORTFOLIO_CONFIG?.projects?.find(p => p.id === projectId);
    if (!project) return;

    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-category').textContent = project.categoryLabel;
    document.getElementById('modal-description').textContent = project.longDescription;

    // Metrics
    const metricsContainer = document.getElementById('modal-metrics');
    metricsContainer.innerHTML = '';
    project.metrics.forEach(m => {
      const metricEl = document.createElement('div');
      metricEl.className = 'modal-metric-card';
      metricEl.innerHTML = `
        <span class="modal-metric-val">${m.value}</span>
        <span class="modal-metric-lbl">${m.label}</span>
      `;
      metricsContainer.appendChild(metricEl);
    });

    // Tags
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = '';
    project.tags.forEach(t => {
      const tagEl = document.createElement('span');
      tagEl.className = 'project-tag';
      tagEl.textContent = t;
      tagsContainer.appendChild(tagEl);
    });

    // Links
    const githubLink = document.getElementById('modal-github-link');
    const demoLink = document.getElementById('modal-demo-link');
    githubLink.href = project.githubUrl;
    demoLink.href = project.demoUrl;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  viewDetailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. Live Autonomous Agent Simulator & Execution Terminal
   ========================================================================== */
function initAgentSimulator() {
  const terminalBody = document.getElementById('terminal-stream');
  const runBtn = document.getElementById('run-agent-btn');
  const scenarioSelect = document.getElementById('scenario-select');
  const terminalStatus = document.getElementById('terminal-status');

  if (!terminalBody || !runBtn) return;

  const scenarios = {
    agentic: [
      { text: "[AGENT_INIT] Initializing LangGraph multi-agent cognitive architecture...", delay: 200, color: "text-cyan" },
      { text: "[PLANNER] Decomposing objective: 'Synthesize cross-lingual research with edge constraints'", delay: 600, color: "text-violet" },
      { text: "[STATE_GRAPH] Step 1: Active nodes -> ['QueryDecomposer', 'VectorRetriever']", delay: 1000, color: "text-muted" },
      { text: "[RETRIEVER] Embedding query into ChromaDB vector index via text-embedding-3...", delay: 1500, color: "text-cyan" },
      { text: "[RETRIEVER] Retrieved 4 semantic chunks (CosSim: 0.942, 0.918, 0.895)", delay: 2000, color: "text-emerald" },
      { text: "[MCP_CALL] Invoking Model Context Protocol tool 'EdgeFeasibilityEvaluator'...", delay: 2600, color: "text-yellow" },
      { text: "[TOOL_EXEC] Memory footprint: 1.2MB | Target latency: <20ms | Pass: TRUE", delay: 3200, color: "text-emerald" },
      { text: "[CRITIC_AGENT] Validating consistency of reasoning trajectory against ground truth...", delay: 3800, color: "text-violet" },
      { text: "[SYNTHESIS] Output verified. Zero hallucinations detected. Returning finalized response.", delay: 4500, color: "text-cyan" },
      { text: "[COMPLETED] Autonomous multi-agent cycle finished in 284ms. Awaiting next prompt.", delay: 5100, color: "text-white font-bold" }
    ],
    vibration: [
      { text: "[DSP_INIT] Initializing GPU-accelerated mechanical vibration analyzer...", delay: 200, color: "text-cyan" },
      { text: "[PORTAUDIO] Streaming 48,000 Hz continuous acoustic accelerometer channel...", delay: 600, color: "text-muted" },
      { text: "[CUDA_FFT] Computing real-time 8192-point FFT power spectral density matrix...", delay: 1100, color: "text-violet" },
      { text: "[HFRT] Applying envelope Hilbert transform demodulation for bearing defect detection...", delay: 1700, color: "text-emerald" },
      { text: "[BEARING_FREQ] Peak defect harmonics within baseline tolerances: NORMAL (0.012 mm/s RMS)", delay: 2400, color: "text-emerald" },
      { text: "[ISO_10816] Evaluating machine health against ISO 10816-3 Class II criteria...", delay: 3100, color: "text-cyan" },
      { text: "[SEVERITY_PASS] Status: Zone A (Good / Unrestricted continuous operation)", delay: 3800, color: "text-white font-bold" }
    ],
    speech: [
      { text: "[NEUROLINGO] Initializing speech-to-speech translation pipeline...", delay: 200, color: "text-violet" },
      { text: "[AUDIO_INPUT] Ingesting Balochi oral dialect stream (16kHz PCM)...", delay: 600, color: "text-cyan" },
      { text: "[ENCODER] Extracting continuous neural acoustic representations via Conformer blocks...", delay: 1200, color: "text-muted" },
      { text: "[ALIGNMENT] Cross-attention aligning low-resource acoustic frames with phonetic units...", delay: 1900, color: "text-violet" },
      { text: "[DECODER] Generating English semantic target tokens: 'Real-time diagnostic verified'...", delay: 2700, color: "text-cyan" },
      { text: "[VOCODER] Synthesizing acoustic output via HiFi-GAN neural vocoder (<38ms latency)...", delay: 3500, color: "text-emerald" },
      { text: "[STREAM_OUT] Bidirectional speech pipeline synced. High-fidelity audio dispatched.", delay: 4200, color: "text-white font-bold" }
    ]
  };

  let isRunning = false;

  function runSimulation() {
    if (isRunning) return;
    isRunning = true;
    runBtn.disabled = true;
    runBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" width="16" height="16">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Processing Trajectory...
    `;

    terminalStatus.innerHTML = `<span class="status-pulse yellow"></span> Running`;
    terminalBody.innerHTML = '';

    const selectedKey = scenarioSelect.value || 'agentic';
    const trace = scenarios[selectedKey] || scenarios.agentic;

    trace.forEach(item => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = `terminal-line ${item.color}`;
        const time = new Date().toISOString().substring(11, 19);
        line.innerHTML = `<span class="terminal-time">${time}</span> ${item.text}`;
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }, item.delay);
    });

    const maxDelay = trace[trace.length - 1].delay + 600;
    setTimeout(() => {
      isRunning = false;
      runBtn.disabled = false;
      runBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        Execute Agent Trace
      `;
      terminalStatus.innerHTML = `<span class="status-pulse green"></span> System Idle`;
    }, maxDelay);
  }

  runBtn.addEventListener('click', runSimulation);

  // Auto-run once on scroll into view
  let hasAutoRun = false;
  const termObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAutoRun) {
        hasAutoRun = true;
        setTimeout(runSimulation, 500);
      }
    });
  }, { threshold: 0.3 });

  termObserver.observe(terminalBody.parentElement);
}

/* ==========================================================================
   8. Contact & Direct WhatsApp CTA
   ========================================================================== */
function initContactAndWhatsApp() {
  const config = window.PORTFOLIO_CONFIG?.personal || {};
  const whatsappNumber = config.whatsappNumber || "923000000000";
  const whatsappMsg = encodeURIComponent(config.whatsappMessage || "Hi Engr. Afnan, I saw your portfolio and would like to connect!");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  // Floating button
  const floatingBtn = document.getElementById('floating-whatsapp-btn');
  if (floatingBtn) {
    floatingBtn.href = whatsappUrl;
  }

  // Contact section button
  const sectionWhatsappBtn = document.getElementById('contact-whatsapp-btn');
  if (sectionWhatsappBtn) {
    sectionWhatsappBtn.href = whatsappUrl;
  }

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value;

      if (!name || !email || !message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
      }

      // Simulate sending with modern UX feedback
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Message...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Message Transmitted Successfully!</span>`;
        showStatus(`Thank you, ${name}! Your message has been prepared. You can also reach out directly via WhatsApp for instant reply.`, 'success');
        
        // Prepare mailto link as direct fallback
        const mailtoLink = `mailto:${config.email || 'engr.afnanbadar@gmail.com'}?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
        window.open(mailtoLink, '_blank');

        contactForm.reset();
        setTimeout(() => {
          submitBtn.innerHTML = `<span>Send Transmission</span>`;
        }, 4000);
      }, 1000);
    });
  }

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
  }
}

/* ==========================================================================
   9. Direct Email Copy with Toast Feedback
   ========================================================================== */
function initEmailCopy() {
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('copy-toast');
  const emailText = window.PORTFOLIO_CONFIG?.personal?.email || "engr.afnanbadar@gmail.com";

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText).then(() => {
        showToast(`Copied ${emailText} to clipboard!`);
      }).catch(() => {
        showToast(`Email: ${emailText}`);
      });
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}
