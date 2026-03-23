import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import {
  Github,
  MessageSquare,
  Lightbulb,
  Terminal,
  Heart,
  Code2,
  Rocket,
  Share2,
  ShieldCheck,
  Network,
  Layers,
} from "lucide-react";

// Initialize Mermaid configuration
mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "inherit",
});

const MermaidDiagram = ({ chart }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.contentLoaded();
    }
  }, [chart]);

  return (
    <div className="mermaid flex justify-center py-4 overflow-x-auto" ref={ref}>
      {chart}
    </div>
  );
};

const ContributePage = () => {
  const systemArchitecture = `
    graph TD
    %% ================= FRONTEND =================
    subgraph FRONTEND [Frontend Layer]
    A1[React App]
    A2[State Management]
    A3[UI: Tailwind + DaisyUI]
    A4[Routing]
    A5[Socket Client]
    end

    %% ================= BACKEND =================
    subgraph BACKEND [Backend Layer]
    B1[Express Server]
    B2[REST API Controllers]
    B3[Authentication Service]
    B4[JWT Middleware]
    B5[Socket.io Server]
    B6[Message Service]
    B7[Group Service]
    B8[User Service]
    B9[Admin Service]
    end

    %% ================= DATABASE =================
    subgraph DATABASE [Database Layer]
    C1[(MongoDB)]
    C2[User Collection]
    C3[Message Collection]
    C4[Group Collection]
    C5[Report Collection]
    end

    %% ================= ML SERVICE =================
    subgraph ML [ML Moderation Service]
    D1[FastAPI Server]
    D2[Text Analysis Model]
    D3[Toxicity Detection]
    end

    %% ================= EXTERNAL =================
    subgraph EXTERNAL [External Services]
    E1[Groq API - AI Chat]
    E2[ZegoCloud - Voice/Video]
    E3[Cloudinary - Media Storage]
    E4[Brevo - Email Service]
    end

    %% ================= FLOW =================
    A1 -->|HTTP Requests| B1
    A5 -->|WebSocket| B5
    B1 --> B2
    B2 --> B3
    B3 --> B4
    B2 --> B6
    B2 --> B7
    B2 --> B8
    B2 --> B9
    B5 --> B6
    B6 --> C3
    B7 --> C4
    B8 --> C2
    B9 --> C5
    C1 --> C2
    C1 --> C3
    C1 --> C4
    C1 --> C5
    B6 -->|Analyze Message| D1
    D1 --> D2
    D2 --> D3
    B6 --> E1
    B6 --> E3
    B3 --> E4
    B6 --> E2
    A1 -->|AI Chat Request| B6
    A1 -->|Call Init| E2
    A1 -->|Upload Media| B6
  `;

  return (
    <div className="min-h-screen bg-base-100 text-base-content py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-24">
        <section className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="badge badge-primary badge-outline gap-2 py-4 px-6 text-sm font-bold tracking-widest uppercase">
              <Code2 size={16} /> Open Source Initiative
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            PASO Roadmap
          </h1>
          <p className="text-lg md:text-xl text-base-content/60 max-w-3xl mx-auto leading-relaxed">
            From your first fork to your first production-ready Pull Request.
            Join us in building a smarter communication ecosystem.
          </p>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Network className="text-primary" /> System Architecture
              </h2>
              <p className="text-base-content/60">
                Understand the data flow between React, FastAPI, and MongoDB.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="badge badge-outline opacity-50">
                Microservices
              </div>
              <div className="badge badge-outline opacity-50">WebSockets</div>
              <div className="badge badge-outline opacity-50">
                ML-Integrated
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-base-200 border border-base-300 rounded-3xl p-4 md:p-8 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-6 px-2">
                <div className="flex items-center gap-2">
                  <Layers size={18} className="text-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest opacity-70">
                    Infrastructure Map v1.0
                  </span>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-2 md:p-6 overflow-x-auto custom-mermaid-container">
                <MermaidDiagram chart={systemArchitecture} />
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pt-10">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Rocket className="text-primary" /> The Contributor's Journey
            </h2>

            <ul className="steps steps-vertical">
              <li className="step step-primary">
                <div className="text-left ml-4 py-4">
                  <h3 className="font-bold text-lg">Fork & Explore</h3>
                  <p className="text-sm text-base-content/60">
                    Create your own copy of the PASO repository and explore the
                    micro-service architecture.
                  </p>
                </div>
              </li>
              <li className="step step-primary">
                <div className="text-left ml-4 py-4">
                  <h3 className="font-bold text-lg">Branching Strategy</h3>
                  <p className="text-sm text-base-content/60">
                    Always create a <code>feat/feature-name</code> or{" "}
                    <code>fix/bug-name</code> branch.
                  </p>
                </div>
              </li>
              <li className="step">
                <div className="text-left ml-4 py-4">
                  <h3 className="font-bold text-lg">Pull Request</h3>
                  <p className="text-sm text-base-content/60">
                    Submit your PR with a clear description of the problem
                    solved.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="card bg-neutral text-neutral-content shadow-2xl border border-white/5">
            <div className="card-body p-0">
              <div className="bg-white/5 px-6 py-3 flex gap-2 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-error/50"></div>
                <div className="w-3 h-3 rounded-full bg-warning/50"></div>
                <div className="w-3 h-3 rounded-full bg-success/50"></div>
                <span className="text-xs font-mono ml-4 opacity-40">
                  terminal — bash
                </span>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <p className="text-primary font-bold text-sm mb-2 uppercase tracking-widest flex items-center gap-2">
                    <Terminal size={14} /> Quick Start
                  </p>
                  <div className="font-mono text-sm space-y-2 bg-black/40 p-4 rounded-lg">
                    <p>
                      <span className="text-success">git</span> clone
                      https://github.com/akashsantra/paso.git
                    </p>
                    <p>
                      <span className="text-success">cd</span> paso
                    </p>
                    <p>
                      <span className="text-success">npm</span> install &&{" "}
                      <span className="text-success">npm</span> run dev
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative p-[1px] rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-error/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative bg-base-200/80 backdrop-blur-xl rounded-[23px] p-8 h-full border border-white/5 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-error/10 flex items-center justify-center mb-6 ring-1 ring-error/20 group-hover:bg-error/20 transition-colors">
                  <MessageSquare className="text-error" size={28} />
                </div>
                <h2 className="text-2xl font-bold mb-3">Bug Reports</h2>
                <p className="text-base-content/60 leading-relaxed">
                  Spotted a glitch in the Socket.io flow or a UI misalignment?
                  Help us squash it by detailing the steps to reproduce on our
                  tracker.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <a
                  href="https://github.com/Akash504-ai/Chat-app/issues"
                  target="_blank"
                  className="btn btn-error btn-outline btn-sm rounded-full px-6"
                >
                  Open Tracker
                </a>
                <Share2
                  size={18}
                  className="opacity-20 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>

          <div className="group relative p-[1px] rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative bg-base-200/80 backdrop-blur-xl rounded-[23px] p-8 h-full border border-white/5 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 ring-1 ring-secondary/20 group-hover:bg-secondary/20 transition-colors">
                  <Lightbulb className="text-secondary" size={28} />
                </div>
                <h2 className="text-2xl font-bold mb-3">Feature Requests</h2>
                <p className="text-base-content/60 leading-relaxed">
                  Have a vision for AI-driven real-time translation or new
                  themes? We prioritize high-impact community ideas in our
                  roadmap.
                </p>
              </div>

              <div className="mt-8">
                <a
                  href="https://github.com/Akash504-ai/Chat-app/discussions"
                  target="_blank"
                  className="btn btn-secondary btn-outline btn-sm rounded-full px-6"
                >
                  Discussion Hub
                </a>
              </div>
            </div>
          </div>

          <div className="group relative p-[1px] rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative bg-base-200/80 backdrop-blur-xl rounded-[23px] p-8 h-full border border-white/5 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 ring-1 ring-accent/20 group-hover:bg-accent/20 transition-colors">
                  <ShieldCheck className="text-accent" size={28} />
                </div>
                <h2 className="text-2xl font-bold mb-3">Security</h2>
                <p className="text-base-content/60 leading-relaxed">
                  Found a vulnerability? Please don't post it publicly. Use our
                  private channel to ensure a coordinated disclosure.
                </p>
              </div>

              <div className="mt-8">
                <a
                  href="https://github.com/Akash504-ai/Chat-app/tree/main?tab=security-ov-file"
                  className="btn btn-accent btn-outline btn-sm rounded-full px-6"
                >
                  View Policy
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center pb-12 pt-10">
          <div className="divider opacity-10"></div>
          <div className="flex flex-col items-center gap-4 mt-8">
            <p className="font-semibold text-lg flex items-center gap-2">
              Made with{" "}
              <Heart
                size={20}
                className="text-red-500 fill-red-500 animate-pulse"
              />{" "}
              by Akash Santra
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ContributePage;