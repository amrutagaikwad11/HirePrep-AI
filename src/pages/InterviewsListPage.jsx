import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Bot, Play, Trophy, Calendar, ArrowRight, Plus } from 'lucide-react';

export const InterviewsListPage = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('ALL');

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await api.get('/interviews');
        setInterviews(res.data || []);
      } catch (err) {
        console.error('Failed to load interviews:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, []);

  const filtered = filterType === 'ALL'
    ? interviews
    : interviews.filter((i) => i.interviewType === filterType);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI Mock Interviews Library</h1>
            <p className="text-xs text-slate-500">
              Practice role-specific technical and HR interviews with AI feedback and question voice synthesis.
            </p>
          </div>
        </div>

        <Link
          to="/interviews/create"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New AI Mock Interview</span>
        </Link>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {['ALL', 'Technical', 'HR', 'Mixed', 'System Design', 'Coding'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              filterType === type
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {type === 'ALL' ? 'All Sessions' : `${type}`}
          </button>
        ))}
      </div>

      {/* SESSIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {item.interviewType}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    item.difficulty === 'Easy'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.difficulty === 'Medium'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {item.difficulty}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">{item.jobTitle}</h3>
              <p className="text-xs text-slate-500">{item.company}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs text-slate-600 font-bold">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>{item.score} / 10</span>
              </div>

              <Link
                to={`/interviews/${item.id}`}
                className="px-4 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-xs transition-colors flex items-center space-x-1"
              >
                <span>{item.status === 'Completed' ? 'Review' : 'Continue'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
