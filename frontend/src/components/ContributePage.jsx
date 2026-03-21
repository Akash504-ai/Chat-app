import React from 'react';
import { Github, GitBranch, MessageSquare, Lightbulb, Terminal, Heart } from 'lucide-react'; // Optional: install lucide-react or use SVG

const ContributePage = () => {
  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <div className="inline-block px-4 py-1.5 mb-2 text-sm font-medium tracking-wider text-primary uppercase bg-primary/10 rounded-full">
            Open Source Community
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Build the future of <span className="text-primary italic">PASO</span>
          </h1>
          <p className="text-xl text-base-content/60 max-w-2xl mx-auto">
            Join our mission to create a smarter, safer, and faster real-time communication ecosystem. 
            Every line of code helps.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Workflow */}
          <div className="card bg-base-200 shadow-xl border border-base-300 hover:border-primary/50 transition-all duration-300">
            <div className="card-body">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <GitBranch className="text-primary" />
              </div>
              <h2 className="card-title">How to Contribute</h2>
              <ul className="space-y-3 mt-2 text-sm text-base-content/70">
                <li className="flex gap-2"><span>1.</span> Fork the official repo</li>
                <li className="flex gap-2"><span>2.</span> Create a feature branch</li>
                <li className="flex gap-2"><span>3.</span> Commit your changes</li>
                <li className="flex gap-2"><span>4.</span> Open a Pull Request</li>
              </ul>
            </div>
          </div>

          {/* Card 2: Reporting */}
          <div className="card bg-base-200 shadow-xl border border-base-300 hover:border-error/50 transition-all duration-300">
            <div className="card-body">
              <div className="w-12 h-12 bg-error/10 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="text-error" />
              </div>
              <h2 className="card-title">Report Issues</h2>
              <p className="text-sm text-base-content/70">
                Found a bug or a security flaw? Open a detailed issue on GitHub. Please include steps to reproduce and environment logs.
              </p>
              <div className="card-actions mt-4">
                <button className="btn btn-ghost btn-sm btn-block border-base-300">Open Issue</button>
              </div>
            </div>
          </div>

          {/* Card 3: Ideas */}
          <div className="card bg-base-200 shadow-xl border border-base-300 hover:border-secondary/50 transition-all duration-300">
            <div className="card-body">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <Lightbulb className="text-secondary" />
              </div>
              <h2 className="card-title">Suggest Features</h2>
              <p className="text-sm text-base-content/70">
                Have an idea for ML moderation or UI improvements? We'd love to hear it! Start a discussion in our community tab.
              </p>
              <div className="card-actions mt-4">
                <button className="btn btn-ghost btn-sm btn-block border-base-300">Discuss</button>
              </div>
            </div>
          </div>
        </div>

        {/* Setup Section */}
        <section className="bg-neutral text-neutral-content rounded-3xl p-8 md:p-12 overflow-hidden relative shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="z-10 space-y-4">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Terminal size={32} /> Fast Setup
              </h2>
              <p className="text-neutral-content/70">
                Get the project running on your local machine in less than 2 minutes.
              </p>
              <div className="space-y-2">
                <div className="bg-black/30 p-4 rounded-xl font-mono text-sm border border-white/10 group relative">
                  <span className="text-success">$</span> git clone https://github.com/akashsantra/paso.git <br/>
                  <span className="text-success">$</span> npm install && npm run dev
                  <button className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity text-xs uppercase tracking-widest font-bold">Copy</button>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
              <Github size={120} className="relative opacity-20" />
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <footer className="text-center pt-8 border-t border-base-300">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-base-200 rounded-full font-semibold shadow-inner">
            <Heart className="text-red-500 fill-red-500 animate-pulse" size={20} />
            <span>Every contribution matters. Join the list of contributors.</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ContributePage;