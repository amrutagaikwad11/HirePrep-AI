import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { Bot, Sparkles, Sliders, Play, AlertCircle, Briefcase } from 'lucide-react';

export const InterviewGeneratorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(location.state?.jobId || '');
  const [interviewType, setInterviewType] = useState('Technical');
  const [difficulty, setDifficulty] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs');
        setJobs(res.data || []);
        if (!selectedJobId && res.data && res.data.length > 0) {
          setSelectedJobId(res.data[0].id);
        }
      } catch (err) {
        console.error('Failed to load jobs:', err);
      }
    };
    fetchJobs();
  }, []);

  const handleStartInterview = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/interviews/generate', {
        jobId: selectedJobId,
        interviewType,
        difficulty,
      });

      const interviewId = res.data.id;
      navigate(`/interviews/${interviewId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate interview session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 mb-2">
          <Bot className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Configure AI Mock Interview</h1>
        <p className="text-xs text-slate-500">
          AI will tailor custom technical and HR questions based on your resume and target job description.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleStartInterview} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        {/* Job Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Target Job Position
          </label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title} — {j.company} ({j.experience})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Interview Type */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Interview Focus Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {['Technical', 'HR', 'Mixed', 'System Design', 'Coding'].map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setInterviewType(type)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                  interviewType === type
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Level */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Difficulty Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                type="button"
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                  difficulty === diff
                    ? diff === 'Easy'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : diff === 'Medium'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center space-x-2"
        >
          {loading ? (
            <span className="animate-pulse">Generating Custom Interview Questions...</span>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>Launch AI Mock Interview Room</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
