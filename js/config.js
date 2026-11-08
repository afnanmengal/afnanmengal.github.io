/**
 * Portfolio Configuration File - Engr. Afnan Badar
 * Central source of truth for personal contact details, links, and projects.
 */

const PORTFOLIO_CONFIG = {
  personal: {
    name: "Engr. Afnan Badar",
    title: "AI Engineer & Computer Engineer",
    subheadline: "Deep Learning, NLP & Autonomous AI Systems",
    statusBadge: "Available for AI Engineering & Autonomous Systems Roles",
    location: "Lahore / Quetta, Pakistan",
    email: "afnanmengal@gmail.com",
    phoneDisplay: "+92 311 8327516",
    whatsappNumber: "923118327516",
    whatsappMessage: "Hi Engr. Afnan, I saw your portfolio and would like to connect!",
    github: "https://github.com/afnanmengal",
    linkedin: "https://www.linkedin.com/in/afnan-badar/",
    degrees: [
      {
        degree: "MS Artificial Intelligence",
        institution: "University of Engineering and Technology (UET) Lahore",
        period: "2024 - Present (Roll No: 2026-MS-AI-120)",
        focus: "Time-Series Generative Modeling (TimeGAN), Low-Resource NLP & Edge AI"
      },
      {
        degree: "BS Computer Engineering",
        institution: "Balochistan University of Information Technology, Engineering & Management Sciences (BUITEMS)",
        period: "Graduated with Honors",
        focus: "Embedded Systems, Signal Processing, Computer Architecture & Edge Computing"
      }
    ]
  },

  projects: [
    {
      id: "neurolingo",
      title: "Neurolingo: Speech-to-Speech Translation Engine",
      category: "nlp",
      categoryLabel: "NLP & Speech AI",
      description: "End-to-end speech-to-speech natural language translation engine bridging Balochi and English with custom acoustic and sequence models.",
      longDescription: "Addresses high-stakes language preservation and cross-lingual communication for under-represented languages. Integrates raw audio neural feature extraction, cross-attention phonetic alignment, and sequence-to-sequence translation with neural vocoding to deliver low-latency bidirectional speech translation.",
      metrics: [
        { label: "Language Pair", value: "Balochi ⇄ English" },
        { label: "Pipeline", value: "Speech-to-Speech" },
        { label: "Architecture", value: "Neural S2ST" }
      ],
      tags: ["PyTorch", "Speech-to-Speech", "NLP", "Deep Learning", "Transformers", "Audio DSP"],
      githubUrl: "https://github.com/afnanmengal/neurolingo",
      demoUrl: "https://github.com/afnanmengal/neurolingo#demo",
      featured: true,
      accent: "violet"
    },
    {
      id: "autonomous-agents",
      title: "Autonomous Agent Workflows: Multi-Agent Reasoning",
      category: "agentic-ai",
      categoryLabel: "Agentic AI & Orchestration",
      description: "Multi-agent reasoning chains and context-aware tool orchestration using LangChain, LangGraph, Model Context Protocol (MCP), and local LLM execution.",
      longDescription: "Production-ready autonomous agent architecture featuring hierarchical task decomposition, cyclical self-correction, dynamic tool dispatch via Model Context Protocol (MCP), and vector database semantic memory. Implements human-in-the-loop validation, automated escalation, and streaming thought telemetry.",
      metrics: [
        { label: "Framework", value: "LangGraph + MCP" },
        { label: "Execution", value: "Self-Correction" },
        { label: "Orchestration", value: "Multi-Agent" }
      ],
      tags: ["LangGraph", "LangChain", "Vector DB", "MCP", "Python", "Autonomous Agents"],
      githubUrl: "https://github.com/afnanmengal/customer_support_agent",
      demoUrl: "https://github.com/afnanmengal/customer_support_agent#demo",
      featured: true,
      accent: "cyan"
    },
    {
      id: "plant-disease",
      title: "Plant Disease Classifier: Diagnostic Computer Vision",
      category: "vision",
      categoryLabel: "Computer Vision",
      description: "Deep learning diagnostic tool classifying agricultural leaf pathologies under constrained, low-quality image conditions with real-time Grad-CAM lesion explainability.",
      longDescription: "Field-deployable leaf pathology classifier built with PyTorch and TensorFlow, engineered to handle noisy, low-resolution sensor inputs from mobile devices. Features automated lesion localization, class activation mapping (Grad-CAM), and a lightweight Streamlit web and desktop deployment suite.",
      metrics: [
        { label: "Diagnostic Accuracy", value: "98.4%" },
        { label: "Inference Latency", value: "<45ms" },
        { label: "Interface", value: "Streamlit GUI" }
      ],
      tags: ["Computer Vision", "Streamlit", "TensorFlow/PyTorch", "Grad-CAM", "Edge Inference"],
      githubUrl: "https://github.com/afnanmengal/plant-disease-classifier",
      demoUrl: "https://github.com/afnanmengal/plant-disease-classifier#live-app",
      featured: true,
      accent: "emerald"
    },
    {
      id: "ai-helper-chatbot",
      title: "Afnan's AI: Autonomous Neural Assistant",
      category: "agentic-ai",
      categoryLabel: "Agentic AI & LLMs",
      description: "Futuristic desktop and web neural assistant with adaptive hardware acceleration (GPU CUDA / CPU fallback), multi-turn reasoning, and local LLM runtime.",
      longDescription: "Full-featured local neural assistant supporting multi-turn dialogue, real-time GPU/VRAM telemetry monitoring, custom system persona management, and streaming token generation. Includes both a PyQt6 cyberpunk-styled workstation GUI and a Streamlit web portal.",
      metrics: [
        { label: "Compute Engine", value: "Adaptive GPU/CPU" },
        { label: "Interface", value: "PyQt6 + Web" },
        { label: "Privacy", value: "100% Local / Zero Leak" }
      ],
      tags: ["Python", "PyQt6", "Streamlit", "Local LLMs", "Ollama", "GPU Acceleration"],
      githubUrl: "https://github.com/afnanmengal/ai-helper-chatbot",
      demoUrl: "https://github.com/afnanmengal/ai-helper-chatbot#demo",
      featured: true,
      accent: "cyan"
    },
    {
      id: "vibration-analyzer",
      title: "GPU Real-Time Mechanical Vibration & Bearing Demodulator",
      category: "edge-ai",
      categoryLabel: "Signal DSP & Edge Computing",
      description: "Industrial workstation application for real-time vibration analysis, high-frequency resonance technique (HFRT) bearing demodulation, and predictive machine health monitoring.",
      longDescription: "Engineered for predictive condition-based maintenance of rotating industrial machinery. Features low-latency PortAudio C-callbacks, GPU-accelerated spectral analysis, envelope Hilbert transforms for early defect detection, and automated ISO 10816-3 severity alarm assessment.",
      metrics: [
        { label: "Sampling Rate", value: "48,000 Hz" },
        { label: "Analysis", value: "HFRT / Hilbert" },
        { label: "Processing", value: "GPU Accelerated" }
      ],
      tags: ["Python", "PyQt6", "PyTorch/CuPy", "DSP", "PortAudio", "Predictive Maintenance"],
      githubUrl: "https://github.com/afnanmengal/vibration-analyzer",
      demoUrl: "https://github.com/afnanmengal/vibration-analyzer#demo",
      featured: true,
      accent: "emerald"
    },
    {
      id: "credit-risk",
      title: "Cost-Sensitive Credit Risk Classification & SHAP",
      category: "edge-ai",
      categoryLabel: "Applied ML & Economics",
      description: "Default risk classification with explicit business cost-matrix optimization, Precision-Recall tuning, and global/local SHAP model explainability.",
      longDescription: "Evaluates financial default probabilities under asymmetric loss functions. Replaces arbitrary accuracy targets with cost-weighted threshold selection, optimizing recall against false-positive customer friction.",
      metrics: [
        { label: "Metric Focus", value: "Cost-Matrix / PR-AUC" },
        { label: "Explainability", value: "SHAP Kernel" },
        { label: "Deployment", value: "Streamlit GUI" }
      ],
      tags: ["Scikit-Learn", "SHAP", "Imbalanced Data", "Cost-Sensitive ML", "Streamlit"],
      githubUrl: "https://github.com/afnanmengal/credit-risk-classification",
      demoUrl: "https://github.com/afnanmengal/credit-risk-classification#demo",
      featured: false,
      accent: "violet"
    },
    {
      id: "medical-expert-system",
      title: "Clinical Diagnostic Expert System with Certainty Factors",
      category: "agentic-ai",
      categoryLabel: "Knowledge Engineering",
      description: "Clinical rule-based diagnostic engine using propositional and first-order logic with certainty factor calculations for differential disease triage.",
      longDescription: "Combines formal knowledge bases with inexact probabilistic inference. Simulates clinical reasoning chains, hypothesis ranking, and step-by-step diagnostic audit trails with interactive Streamlit visualization.",
      metrics: [
        { label: "Logic Engine", value: "First-Order / Propositional" },
        { label: "Inexact Reasoning", value: "Certainty Factors" },
        { label: "Database", value: "MongoDB Knowledge Base" }
      ],
      tags: ["Python", "Streamlit", "Expert Systems", "Logic Engine", "MongoDB"],
      githubUrl: "https://github.com/afnanmengal/medical-expert-system",
      demoUrl: "https://github.com/afnanmengal/medical-expert-system#demo",
      featured: false,
      accent: "cyan"
    },
    {
      id: "interactive-eda",
      title: "Interactive Tabular EDA & Cross-Filtering Dashboard",
      category: "edge-ai",
      categoryLabel: "Data Engineering",
      description: "Multipage tabular analysis application with dynamic Plotly cross-filtering, missingness diagnostics, and automated summary exports.",
      longDescription: "Streamlined data exploration dashboard empowering users to inspect arbitrary datasets, run bivariate correlation audits, filter records interactively, and export cleaned analytical slices.",
      metrics: [
        { label: "Framework", value: "Streamlit Multipage" },
        { label: "Visualizations", value: "Plotly Express" },
        { label: "Formats", value: "CSV / Parquet" }
      ],
      tags: ["Streamlit", "Plotly", "Pandas", "Interactive EDA", "Python"],
      githubUrl: "https://github.com/afnanmengal/interactive-eda-dashboard",
      demoUrl: "https://github.com/afnanmengal/interactive-eda-dashboard#demo",
      featured: false,
      accent: "emerald"
    },
    {
      id: "bike-expert-system",
      title: "Motorcycle Fault Diagnostic Expert System",
      category: "agentic-ai",
      categoryLabel: "Knowledge Engineering",
      description: "Automated mechanical troubleshooting engine combining propositional forward-chaining and MongoDB persistence for vehicular diagnostics.",
      longDescription: "Applies expert systems theory to automotive troubleshooting, translating master technician heuristics into verifiable rule chains and diagnostic paths.",
      metrics: [
        { label: "Inference", value: "Forward Chaining" },
        { label: "Persistence", value: "MongoDB" },
        { label: "UI", value: "Streamlit Interface" }
      ],
      tags: ["Python", "Streamlit", "Expert Systems", "MongoDB", "Automotive"],
      githubUrl: "https://github.com/afnanmengal/bike-expert-system",
      demoUrl: "https://github.com/afnanmengal/bike-expert-system#demo",
      featured: false,
      accent: "violet"
    }
  ]
};

// Expose to window
if (typeof window !== "undefined") {
  window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
}
