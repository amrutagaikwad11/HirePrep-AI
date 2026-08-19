import React from 'react';
import {
  BarChart3,
  Trophy,
  Target,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

export const PerformancePage = () => {
  const radarSkillData = [
    { subject: 'Java / Core OOP', candidate: 88, benchmark: 75 },
    { subject: 'Spring Boot REST', candidate: 82, benchmark: 70 },
    { subject: 'React / Frontend', candidate: 78, benchmark: 65 },
    { subject: 'Database / SQL', candidate: 85, benchmark: 80 },
    { subject: 'System Design', candidate: 72, benchmark: 60 },
    { subject: 'Docker / Cloud', candidate: 68, benchmark: 70 },
  ];

  const categoryScores = [
    { category: 'Technical Q&A', score: 8.6 },
    { category: 'HR Behavioral', score: 9.1 },
    { category: 'System Architecture', score: 7.8 },
    { category: 'Coding DSA', score: 8.2 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Candidate Skill Matrix & Analytics</h1>
            <p className="text-xs text-slate-500">
              In-depth performance evaluation across core computer science & software engineering competencies.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Competency Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Radar Competency Map</h3>
            <span className="text-xs text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full font-bold">
              vs Tech Benchmark
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarSkillData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={11} />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name="Your Score" dataKey="candidate" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                <Radar name="Market Benchmark" dataKey="benchmark" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.2} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Score by Interview Category</h3>
            <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-bold">
              Out of 10.0
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryScores}>
                <XAxis dataKey="category" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 10]} stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
