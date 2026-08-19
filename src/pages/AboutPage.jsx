import React from 'react';
import { Sparkles, Code, Cpu, Database, Shield, Layers, Server } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-200 px-3.5 py-1 rounded-full text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>System Design & Architectural Documentation</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">HirePrep AI Architecture Specs</h1>
        <p className="text-xs text-slate-500 max-w-2xl mx-auto">
          Built to showcase production-grade Java Spring Boot and React software development patterns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Backend Layer (Java / Spring Boot / Node Express)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Implements strict layered architecture: Controller → Service → Repository → Database. Uses DTOs for client communication and handles server-side Gemini AI integration without exposing keys.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Code className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Frontend Client (React 18 + JavaScript + Vite)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Single Page Application built with modular component architecture, Tailwind CSS utilities, Recharts data visualizers, and Web Speech voice synthesis.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Security & Authentication</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Stateless JWT authentication header interception with BCrypt password encoding. Role-based access control guarding candidate vs admin routes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">AI Intelligence Engine</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Powered by Google Gemini 3.6 Flash via <code className="text-indigo-600 font-mono">@google/genai</code> SDK. Executes ATS keyword parsing, question generation, and candidate answer evaluations.
          </p>
        </div>
      </div>
    </div>
  );
};
