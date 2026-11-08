# Engr. Afnan Badar — Personal Portfolio Website

A futuristic, high-performance personal portfolio website engineered for **Engr. Afnan Badar**, an AI Engineer and Computer Engineer specializing in **Deep Learning**, **Natural Language Processing (NLP)**, and **Autonomous Agentic AI Workflows**.

---

## 🌟 Key Features & Visual Design

1. **Theme & Aesthetics:**
   - Futuristic dark mode palette (`#0b0f19` midnight charcoal canvas).
   - Dynamic accent glows in Cyan (`#00f2fe`), Electric Violet (`#a855f7`), and Emerald (`#10b981`).
   - Glassmorphism cards (`backdrop-filter: blur(16px)`), gradient border shines, and smooth micro-interactions.
   - Typography: Google Fonts (`Space Grotesk`, `Inter`, `JetBrains Mono`).

2. **Interactive 3D / Canvas Neural Particle Graph:**
   - Hardware-accelerated HTML5 Canvas with Retina/4K DPI scaling.
   - Simulates neural network layers (Input, Hidden, Output clusters) with synaptic connection lines.
   - Action potential pulses traveling across synapses.
   - Interactive mouse attractor field and click action potential ripple waves.

3. **Sticky/Floating Glassmorphism Navbar:**
   - Smooth anchor navigation: `#about`, `#projects`, `#skills`, `#research`, `#contact`.
   - Scroll spy highlighting the active section in real time.
   - Quick "Let's Talk" CTA button with glowing hover animation.
   - Mobile-responsive glass drawer menu.

4. **Hero Section:**
   - Headline: **Engr. Afnan Badar**
   - Live dynamic typewriter sub-headline: *"AI Engineer & Computer Engineer | Deep Learning, NLP & Autonomous AI Systems"*
   - Academic Badges:
     - 🎓 **MS Artificial Intelligence (UET Lahore)**
     - ⚡ **BS Computer Engineering (BUITEMS)**
   - Dual CTA Buttons: **"Get in Touch"** and **"Explore Projects"**.
   - Live telemetry metrics card grid.

5. **Featured Projects Section:**
   Interactive showcase cards with category filtering, SVG GitHub icons, and live demo buttons:
   - **EcoGenAI:** Edge-optimized triage and synthetic data generation framework integrating Naive Bayes classification and Hidden Markov Models with TimeGAN augmentation.
   - **Neurolingo:** End-to-end speech-to-speech natural language translation engine bridging Balochi and English with custom acoustic and sequence models.
   - **Plant Disease Classifier:** Deep learning diagnostic tool classifying agricultural leaf pathologies under constrained, low-quality image conditions.
   - **Autonomous Agent Workflows:** Multi-agent reasoning chains and context-aware tool orchestration using LangChain, LangGraph, Model Context Protocol (MCP), and vector databases.
   - **Interactive Modal:** Click "Specs" or "Details" on any card to view deep architectural breakdowns and benchmarks.

6. **Live Autonomous Agent Reasoning Sandbox / Terminal:**
   - Real-time simulation of LangGraph state graphs, MCP tool calls, EcoGenAI edge triage, and speech translation traces with syntax-highlighted streaming output.

7. **Technical Skills Matrix:**
   - **Core AI & ML:** Deep Learning, NLP, Computer Vision, Autonomous Agents, TimeGAN, HMM, Cost-Sensitive ML.
   - **Frameworks & Libraries:** PyTorch, TensorFlow, LangChain, LangGraph, Scikit-Learn, Streamlit, Hugging Face, MCP.
   - **Languages & Tools:** Python, Dart/Flutter, SQL, MATLAB, HTML/CSS, Git, Docker, Vector DBs (Chroma/FAISS).

8. **Direct WhatsApp & Contact Section:**
   - **High-visibility floating WhatsApp button** with pulse animation and tooltip.
   - Dedicated contact card with 1-click WhatsApp messaging.
   - 1-click Email copy with toast feedback (`afnanmengal@gmail.com`).
   - Interactive transmission form with validation and mailto fallback.

---

## 🚀 Quick Launch (Local Preview)

### Option 1: One-Click Batch Launcher (Windows)
Double-click `preview_portfolio.bat` in this folder. It will start a local server and open your default browser automatically.

### Option 2: Python Command Line
```bash
cd portfolio
python preview.py
```
Then navigate to `http://localhost:8080`.

### Option 3: Direct Browser Open
Open `portfolio/index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari).

---

## ⚙️ Customization (`js/config.js`)

You can edit your contact information, phone number, and project links in a single central file: `portfolio/js/config.js`:

```javascript
const PORTFOLIO_CONFIG = {
  personal: {
    name: "Engr. Afnan Badar",
    email: "afnanmengal@gmail.com",
    whatsappNumber: "923118327516", // Direct WhatsApp (+92 311 8327516)
    whatsappMessage: "Hi Engr. Afnan, I saw your portfolio and would like to connect!",
    github: "https://github.com/afnanmengal",
    linkedin: "https://www.linkedin.com/in/afnan-badar/",
    // ...
  }
};
```

---

## 🌐 Free Deployment Options

### Deploy to GitHub Pages (Recommended):
1. In your GitHub repository (`github.com/afnanmengal`), you can either:
   - Create a dedicated repository named `afnanmengal.github.io` or `portfolio`.
   - Push the contents of the `portfolio` folder to the repository root.
2. In GitHub, go to **Settings** > **Pages**.
3. Under **Build and deployment**, set source to **Deploy from a branch** (`main` / root `/`).
4. Your site will be live instantly at `https://afnanmengal.github.io`.

### Deploy to Vercel:
```bash
cd portfolio
npx vercel
```

### Deploy to Netlify:
Drag and drop the `portfolio/` folder onto [Netlify Drop](https://app.netlify.com/drop).
