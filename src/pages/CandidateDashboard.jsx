import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
  Bot,
  FileSearch,
  Code2,
  Trophy,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Play,
  Clock,
  TrendingUp,
  Target,
  Zap,
} from 'lucide-react';

export const CandidateDashboard = () => {
  const { user } = useAuth();
  const [interviews, setInterviews] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [intRes, anaRes, subRes] = await Promise.all([
          api.get('/interviews'),
          api.get('/resume-analysis'),
          api.get('/coding/submissions'),
        ]);
        setInterviews(intRes.data || []);
        setAnalyses(anaRes.data || []);
        setSubmissions(subRes.data || []);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalInterviews = interviews.length;
  const avgScore = totalInterviews > 0
    ? (interviews.reduce((acc, i) => acc + i.score, 0) / totalInterviews).toFixed(1)
    : '8.5';

  const bestAtsScore = analyses.length > 0
    ? Math.max(...analyses.map((a) => a.atsScore))
    : 84;

  const codingSolved = submissions.filter((s) => s.status === 'Accepted').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#141414]">
      {/* SIDEBAR + MAIN GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT TECH STATUS PANEL (Cols 1-3) */}
        <div className="lg:col-span-3 border border-[#141414] bg-[#E4E3E0] p-6 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-serif italic text-xs uppercase opacity-60 mb-4 tracking-widest">
                Navigation Index
              </h3>
              <ul className="space-y-3 font-mono text-xs">
                <li className="font-bold flex items-center justify-between border-b border-[#141414]/20 pb-1">
                  <span>[01] Workspace Overview</span>
                  <span className="w-1.5 h-1.5 bg-[#141414] rounded-full"></span>
                </li>
                <li>
                  <Link to="/resume-analysis" className="opacity-60 hover:opacity-100 flex items-center justify-between pb-1 border-b border-transparent hover:border-[#141414]/20 transition-all">
                    <span>[02] My Resumes</span>
                    <span className="text-[10px]">{analyses.length}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/interviews" className="opacity-60 hover:opacity-100 flex items-center justify-between pb-1 border-b border-transparent hover:border-[#141414]/20 transition-all">
                    <span>[03] Mock Interviews</span>
                    <span className="text-[10px]">{totalInterviews}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/coding" className="opacity-60 hover:opacity-100 flex items-center justify-between pb-1 border-b border-transparent hover:border-[#141414]/20 transition-all">
                    <span>[04] Coding Lab</span>
                    <span className="text-[10px]">{codingSolved}</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif italic text-xs uppercase opacity-60 mb-3 tracking-widest">
                AI Agent Status
              </h3>
              <div className="p-4 border border-[#141414] bg-white space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider">Gemini-Flash Engine</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-xs font-mono leading-tight">
                  Session Ready: <span className="font-bold">ID_8849</span>
                </p>
                <p className="text-[10px] text-slate-500 font-mono pt-1 border-t border-[#141414]/10">
                  Latency: 120ms | Auth: Verified
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#141414] pt-4">
            <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-2">
              Preparation Benchmark
            </p>
            <div className="h-2 w-full bg-[#141414]/10 mb-2">
              <div className="h-full bg-[#141414] w-[78%]"></div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span>78% Target Readiness</span>
              <span className="font-bold">TIER_1</span>
            </div>
          </div>
        </div>

        {/* RIGHT MAIN DATA GRID (Cols 4-12) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TOP HERO TARGET BANNER */}
          <div className="border border-[#141414] bg-white p-6 relative flex flex-col justify-between space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1 flex items-center space-x-2">
                  <span>Active Candidate Profile / Target Position</span>
                  {user?.experienceLevel && (
                    <span className="bg-[#141414] text-white text-[9px] px-2 py-0.5 rounded font-mono uppercase">
                      {user.experienceLevel}
                    </span>
                  )}
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter">
                  {user?.targetRole || 'Senior Java Full-Stack Engineer'}
                </h2>
                <p className="text-xs italic font-serif opacity-70 mt-0.5">
                  Target Spec: Enterprise Architecture, RESTful Services & Modern Web Frameworks
                </p>
              </div>
              <div className="text-right border-l md:border-l-0 md:border-t-0 border-[#141414]/10 pl-4 md:pl-0">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">
                  Peak ATS Match Score
                </p>
                <p className="text-4xl font-mono font-bold leading-none text-[#141414]">
                  {bestAtsScore}%
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/interviews/create"
                className="bg-[#141414] text-[#E4E3E0] px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center space-x-2"
              >
                <Play className="w-3.5 h-3.5 fill-[#E4E3E0]" />
                <span>Start Mock Interview</span>
              </Link>
              <Link
                to="/resume-analysis"
                className="border border-[#141414] px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-[#141414] hover:text-[#E4E3E0] transition-all flex items-center space-x-2"
              >
                <FileSearch className="w-3.5 h-3.5" />
                <span>Run ATS Audit</span>
              </Link>
            </div>
          </div>

          {/* METRIC GRID BAR */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-[#141414] bg-white p-4 font-mono">
              <p className="text-[10px] font-bold uppercase opacity-50 tracking-wider">MOCK SESSIONS</p>
              <p className="text-2xl font-bold mt-1">{totalInterviews}</p>
              <p className="text-[10px] text-emerald-600 font-bold uppercase mt-1">✓ Active Record</p>
            </div>

            <div className="border border-[#141414] bg-white p-4 font-mono">
              <p className="text-[10px] font-bold uppercase opacity-50 tracking-wider">AVG SCORE</p>
              <p className="text-2xl font-bold mt-1">{avgScore} <span className="text-xs font-normal opacity-50">/10</span></p>
              <p className="text-[10px] text-blue-600 font-bold uppercase mt-1">Top Percentile</p>
            </div>

            <div className="border border-[#141414] bg-white p-4 font-mono">
              <p className="text-[10px] font-bold uppercase opacity-50 tracking-wider">BEST ATS MATCH</p>
              <p className="text-2xl font-bold mt-1">{bestAtsScore}%</p>
              <p className="text-[10px] text-emerald-600 font-bold uppercase mt-1">High Compatibility</p>
            </div>

            <div className="border border-[#141414] bg-white p-4 font-mono">
              <p className="text-[10px] font-bold uppercase opacity-50 tracking-wider">CODING SOLVED</p>
              <p className="text-2xl font-bold mt-1">{codingSolved}</p>
              <p className="text-[10px] text-amber-600 font-bold uppercase mt-1">Accepted Tests</p>
            </div>
          </div>

          {/* AI RECOMMENDATIONS + SKILL MATRIX ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* DARK AI INSIGHTS BOX */}
            <div className="border border-[#141414] bg-[#141414] text-[#E4E3E0] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E4E3E0]/20 pb-3">
                <h3 className="font-serif italic text-sm text-[#E4E3E0]">AI Insights & Guidance</h3>
                <span className="text-[10px] font-mono uppercase bg-[#E4E3E0]/10 px-2 py-0.5 text-amber-400 font-bold">GEMINI_ANALYTICS</span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="border-l-2 border-amber-400 pl-3 space-y-0.5">
                  <p className="text-[10px] uppercase font-bold text-amber-400">Target Keyword Opportunity</p>
                  <p className="font-bold">Distributed Caching / Redis</p>
                  <p className="text-[11px] opacity-70">Target JDs heavily prioritize low-latency state. Mention Redis clustering & cache invalidation.</p>
                </div>

                <div className="border-l-2 border-blue-400 pl-3 space-y-0.5">
                  <p className="text-[10px] uppercase font-bold text-blue-400">ATS Optimization Tip</p>
                  <p className="font-bold">Keywords: 'Spring Microservices' & 'Kafka'</p>
                  <p className="text-[11px] opacity-70">Include explicit asynchronous event publishing experience to boost match above 90%.</p>
                </div>

                <div className="border-l-2 border-emerald-400 pl-3 space-y-0.5">
                  <p className="text-[10px] uppercase font-bold text-emerald-400">Mock Interview Strategy</p>
                  <p className="font-bold">Focus on 'System Design' Round</p>
                  <p className="text-[11px] opacity-70">Practice load balancing, database sharding, and ACID transaction boundaries.</p>
                </div>
              </div>
            </div>

            {/* COMPETENCY MATRIX */}
            <div className="border border-[#141414] bg-white flex flex-col justify-between">
              <div className="p-4 border-b border-[#141414] bg-[#141414]/5 flex justify-between items-center font-mono">
                <h3 className="text-[10px] font-bold uppercase tracking-widest">Technical Competency Matrix</h3>
                <span className="text-[10px]">SPEC_V2.1</span>
              </div>

              <div className="divide-y divide-[#141414]/10 font-mono text-xs flex-1">
                <div className="p-3.5 grid grid-cols-4 items-center">
                  <span className="col-span-2 uppercase font-bold">Java 21 / OOP</span>
                  <span className="text-right opacity-60">88%</span>
                  <div className="h-1.5 bg-[#141414]/10 ml-4"><div className="h-full bg-[#141414] w-[88%]"></div></div>
                </div>

                <div className="p-3.5 grid grid-cols-4 items-center">
                  <span className="col-span-2 uppercase font-bold">Spring Boot 3</span>
                  <span className="text-right opacity-60">82%</span>
                  <div className="h-1.5 bg-[#141414]/10 ml-4"><div className="h-full bg-[#141414] w-[82%]"></div></div>
                </div>

                <div className="p-3.5 grid grid-cols-4 items-center">
                  <span className="col-span-2 uppercase font-bold">React / JS</span>
                  <span className="text-right opacity-60">78%</span>
                  <div className="h-1.5 bg-[#141414]/10 ml-4"><div className="h-full bg-[#141414] w-[78%]"></div></div>
                </div>

                <div className="p-3.5 grid grid-cols-4 items-center">
                  <span className="col-span-2 uppercase font-bold">MySQL Relational</span>
                  <span className="text-right opacity-60">85%</span>
                  <div className="h-1.5 bg-[#141414]/10 ml-4"><div className="h-full bg-emerald-600 w-[85%]"></div></div>
                </div>

                <div className="p-3.5 grid grid-cols-4 items-center">
                  <span className="col-span-2 uppercase font-bold">Docker / AWS</span>
                  <span className="text-right opacity-60">65%</span>
                  <div className="h-1.5 bg-[#141414]/10 ml-4"><div className="h-full bg-amber-600 w-[65%]"></div></div>
                </div>
              </div>
            </div>

          </div>

          {/* TABLES ROW: MOCK INTERVIEWS & ATS AUDITS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* INTERVIEWS LIST TABLE */}
            <div className="lg:col-span-2 border border-[#141414] bg-white p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#141414]/10 pb-3">
                <h3 className="font-bold text-sm uppercase tracking-wider">Recent AI Mock Interviews</h3>
                <Link to="/interviews" className="text-xs font-mono font-bold uppercase underline hover:opacity-70">
                  All Records →
                </Link>
              </div>

              <div className="overflow-x-auto font-mono text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#141414] text-[10px] uppercase tracking-wider font-bold opacity-60">
                      <th className="pb-2">Target Title</th>
                      <th className="pb-2">Type</th>
                      <th className="pb-2">Difficulty</th>
                      <th className="pb-2">Score</th>
                      <th className="pb-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#141414]/10">
                    {interviews.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-6 text-center opacity-50">
                          No interview sessions logged. Click "Start Mock Interview" above.
                        </td>
                      </tr>
                    ) : (
                      interviews.slice(0, 4).map((item) => (
                        <tr key={item.id} className="hover:bg-[#141414]/5 transition-colors">
                          <td className="py-3 font-bold">
                            {item.jobTitle}
                            <span className="block text-[10px] font-normal opacity-60">{item.company}</span>
                          </td>
                          <td className="py-3">
                            <span className="border border-[#141414] px-1.5 py-0.5 text-[10px]">
                              {item.interviewType}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className="font-bold text-[10px]">
                              {item.difficulty}
                            </span>
                          </td>
                          <td className="py-3 font-bold text-indigo-700">
                            {item.score} / 10
                          </td>
                          <td className="py-3 text-right">
                            <Link
                              to={`/interviews/${item.id}`}
                              className="px-2.5 py-1 border border-[#141414] bg-white hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors text-[10px] font-bold uppercase"
                            >
                              Review
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ATS AUDITS LIST */}
            <div className="border border-[#141414] bg-white p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#141414]/10 pb-3">
                <h3 className="font-bold text-sm uppercase tracking-wider">ATS Audits</h3>
                <Link to="/resume-analysis" className="text-xs font-mono font-bold uppercase underline hover:opacity-70">
                  New Audit
                </Link>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {analyses.length === 0 ? (
                  <p className="text-xs opacity-50 py-4 text-center">No ATS reports logged.</p>
                ) : (
                  analyses.slice(0, 3).map((a) => (
                    <div key={a.id} className="p-3 border border-[#141414] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold truncate max-w-[130px]">
                          {a.jobTitle || 'Target Role'}
                        </span>
                        <span className="font-bold text-xs bg-[#141414] text-[#E4E3E0] px-2 py-0.5">
                          {a.atsScore}% Match
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        {a.matchedSkills.slice(0, 2).map((s) => (
                          <span key={s} className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-1 py-0.2">
                            ✓ {s}
                          </span>
                        ))}
                        {a.missingSkills.slice(0, 1).map((s) => (
                          <span key={s} className="bg-rose-100 text-rose-900 border border-rose-300 px-1 py-0.2">
                            ✕ {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
