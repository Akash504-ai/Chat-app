import React from 'react';
import { 
  Github, GitBranch, MessageSquare, Lightbulb, 
  Terminal, Heart, CheckCircle2, Code2, 
  Rocket, Share2, ShieldCheck, Cpu 
} from 'lucide-react';

const ContributePage = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* --- Header Section --- */}
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

        {/* --- The Contribution Journey (Roadmap) --- */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Rocket className="text-primary" /> The Contributor's Journey
              </h2>
              
              <ul className="steps steps-vertical">
                <li className="step step-primary">
                  <div className="text-left ml-4 py-4">
                    <h3 className="font-bold text-lg">Fork & Explore</h3>
                    <p className="text-sm text-base-content/60">Create your own copy of the PASO repository and explore the micro-service architecture.</p>
                  </div>
                </li>
                <li className="step step-primary">
                  <div className="text-left ml-4 py-4">
                    <h3 className="font-bold text-lg">Branching Strategy</h3>
                    <p className="text-sm text-base-content/60">Always create a <code>feat/feature-name</code> or <code>fix/bug-name</code> branch.</p>
                  </div>
                </li>
                <li className="step step-primary">
                  <div className="text-left ml-4 py-4">
                    <h3 className="font-bold text-lg">Development & ML Sync</h3>
                    <p className="text-sm text-base-content/60">Integrate with the FastAPI moderation service or the Groq AI layer.</p>
                  </div>
                </li>
                <li className="step">
                  <div className="text-left ml-4 py-4">
                    <h3 className="font-bold text-lg">Pull Request</h3>
                    <p className="text-sm text-base-content/60">Submit your PR with a clear description of the problem solved or feature added.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick Setup Terminal Card */}
            <div className="card bg-neutral text-neutral-content shadow-2xl border border-white/5">
              <div className="card-body p-0">
                <div className="bg-white/5 px-6 py-3 flex gap-2 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-error/50"></div>
                  <div className="w-3 h-3 rounded-full bg-warning/50"></div>
                  <div className="w-3 h-3 rounded-full bg-success/50"></div>
                  <span className="text-xs font-mono ml-4 opacity-40">terminal — bash</span>
                </div>
                <div className="p-8 space-y-6">
                  <div>
                    <p className="text-primary font-bold text-sm mb-2 uppercase tracking-widest flex items-center gap-2">
                      <Terminal size={14} /> Quick Start
                    </p>
                    <div className="font-mono text-sm space-y-2 bg-black/40 p-4 rounded-lg">
                      <p><span className="text-success">git</span> clone https://github.com/akashsantra/paso.git</p>
                      <p><span className="text-success">cd</span> paso</p>
                      <p><span className="text-success">npm</span> install && <span className="text-success">npm</span> run dev</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-2xl font-bold">5001</div>
                      <div className="text-[10px] uppercase opacity-40 font-bold">Backend Port</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-2xl font-bold">5173</div>
                      <div className="text-[10px] uppercase opacity-40 font-bold">Frontend Port</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Action Cards (Issues, Suggestion, Security) --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group card bg-base-200 hover:bg-base-300 transition-all duration-500 border border-base-300 hover:border-primary/40 cursor-pointer overflow-hidden">
            <div className="card-body relative z-10">
              <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="text-primary" />
              </div>
              <h2 className="card-title">Bug Reports</h2>
              <p className="text-sm text-base-content/60">Identify a glitch in Socket.io or a UI mismatch? Detail it on our issue tracker.</p>
              <div className="card-actions mt-4">
                <button className="btn btn-sm btn-ghost gap-2 no-animation">Open Tracker <Share2 size={14} /></button>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 text-primary/5 group-hover:text-primary/10 transition-colors">
              <Github size={120} />
            </div>
          </div>

          <div className="group card bg-base-200 hover:bg-base-300 transition-all duration-500 border border-base-300 hover:border-secondary/40 cursor-pointer">
            <div className="card-body">
              <div className="bg-secondary/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="text-secondary" />
              </div>
              <h2 className="card-title">Feature Requests</h2>
              <p className="text-sm text-base-content/60">Vision for real-time translation or voice notes? We welcome high-impact ideas.</p>
              <div className="card-actions mt-4">
                <button className="btn btn-sm btn-ghost gap-2">Discussion Hub <Share2 size={14} /></button>
              </div>
            </div>
          </div>

          <div className="group card bg-base-200 hover:bg-base-300 transition-all duration-500 border border-base-300 hover:border-accent/40 cursor-pointer">
            <div className="card-body">
              <div className="bg-accent/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-accent" />
              </div>
              <h2 className="card-title">Security</h2>
              <p className="text-sm text-base-content/60">If you find a JWT vulnerability or API leak, please report it via private security channel.</p>
              <div className="card-actions mt-4">
                <button className="btn btn-sm btn-ghost gap-2">Policy <Share2 size={14} /></button>
              </div>
            </div>
          </div>
        </section>

        {/* --- Future Tech Stack / Vision --- */}
        <section className="bg-gradient-to-br from-base-300 to-base-100 rounded-[3rem] p-8 md:p-16 border border-base-300">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold">Help us improve the <span className="text-primary font-mono italic">ML-Service</span></h2>
            <p className="text-base-content/70">
              Our current FastAPI toxicity detection is just the start. We plan to integrate 
              Advanced Sentiment Analysis and automated Image Moderation via Cloudinary.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="badge badge-lg py-6 px-8 gap-2 border-base-300"><Cpu size={18} /> FastAPI</div>
              <div className="badge badge-lg py-6 px-8 gap-2 border-base-300"><CheckCircle2 size={18} /> Socket.io</div>
              <div className="badge badge-lg py-6 px-8 gap-2 border-base-300"><CheckCircle2 size={18} /> MongoDB</div>
              <div className="badge badge-lg py-6 px-8 gap-2 border-base-300"><CheckCircle2 size={18} /> React 18</div>
            </div>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="text-center pb-12">
          <div className="divider"></div>
          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="flex -space-x-4">
               {/* Replace src with real contributor avatars later */}
               <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-12 border-4 border-base-100">
                  <span>+</span>
                </div>
              </div>
            </div>
            <p className="font-semibold text-lg flex items-center gap-2">
              Made with <Heart size={20} className="text-red-500 fill-red-500" /> by Akash Santra & the Community
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ContributePage;