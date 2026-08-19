import React from 'react';
import { Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#07080C] text-slate-300 border-t border-white/10 shrink-0 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10 text-xs">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">HirePrep <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">AI</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-powered recruitment & interview preparation platform for software engineers & tech candidates. Prepare smarter, interview better, get hired.
            </p>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3">Platform Features</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/#features" className="text-slate-400 hover:text-white transition-colors">ATS Compatibility Scoring</a></li>
              <li><a href="/#features" className="text-slate-400 hover:text-white transition-colors">Realistic AI Mock Interviews</a></li>
              <li><a href="/#features" className="text-slate-400 hover:text-white transition-colors">Coding Lab Sandbox</a></li>
              <li><a href="/#features" className="text-slate-400 hover:text-white transition-colors">Skill Matrix Benchmarking</a></li>
            </ul>
          </div>

          {/* Tech Stack Specs */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3">Architecture</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-mono">
              <li>• Gemini 3.6 Flash Engine</li>
              <li>• Spring Boot 3.x REST APIs</li>
              <li>• React 18 + Framer Motion</li>
              <li>• Spring Security JWT Auth</li>
            </ul>
          </div>

          {/* Live Status Indicator */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3">System Status</h4>
            <div className="p-3.5 border border-white/10 bg-white/[0.02] rounded-2xl space-y-1.5 text-xs backdrop-blur-md">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-200">AI Recruiter Engine</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"></span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">Gemini-Flash: Active & Operational</p>
            </div>
          </div>
        </div>

        {/* Technical Data Grid Footer Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-4">
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              SYSTEM ONLINE
            </span>
            <span>AI_MODELS_ACTIVE</span>
            <span>ATS_PARSER_READY</span>
          </div>
          <p className="text-[11px] opacity-70">© HIREPREP AI | ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  );
};
