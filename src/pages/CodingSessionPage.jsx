import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Code2, Play, CheckCircle2, XCircle, Sparkles, ArrowLeft, Terminal } from 'lucide-react';

export const CodingSessionPage = () => {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await api.get(`/coding/problems/${id}`);
        setProblem(res.data);
        if (res.data?.starterCode) {
          setCode(res.data.starterCode.java || '');
        }
      } catch (err) {
        console.error('Problem not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (problem?.starterCode) {
      setCode(problem.starterCode[newLang] || '');
    }
  };

  const handleRunCode = async () => {
    if (!problem) return;
    setEvaluating(true);
    setSubmission(null);

    try {
      const res = await api.post(`/coding/problems/${problem.id}/submit`, {
        code,
        language,
      });
      setSubmission(res.data);
    } catch (err) {
      alert('Code submission error: ' + (err.response?.data?.message || err.message));
    } finally {
      setEvaluating(false);
    }
  };

  if (loading || !problem) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <p className="text-sm font-bold text-slate-500">Loading Coding Problem...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/coding" className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Coding Sandbox</span>
        </Link>
        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase">
          Category: {problem.category}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN: PROBLEM SPECIFICATION */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  problem.difficulty === 'Easy'
                    ? 'bg-emerald-100 text-emerald-800'
                    : problem.difficulty === 'Medium'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {problem.difficulty}
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">{problem.title}</h1>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">{problem.description}</p>
          </div>

          {/* SAMPLE TEST CASES */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Visible Test Cases</h3>
            <div className="space-y-2">
              {problem.testCases.map((tc, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs space-y-1">
                  <div className="text-slate-500"><span className="font-bold text-slate-700">Input:</span> {tc.input}</div>
                  <div className="text-slate-500"><span className="font-bold text-indigo-600">Expected:</span> {tc.expectedOutput}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CODE EDITOR & EXECUTION */}
        <div className="bg-slate-900 text-slate-100 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-bold text-slate-300">Code Sandbox</span>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center space-x-1 bg-slate-800 p-1 rounded-xl">
                {['java', 'javascript', 'python'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase transition-all ${
                      language === lang ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Input Area */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={14}
              className="w-full bg-slate-950 text-emerald-400 font-mono text-xs p-4 rounded-2xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 leading-relaxed"
            />
          </div>

          <div className="space-y-4 pt-2">
            <button
              onClick={handleRunCode}
              disabled={evaluating}
              className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center space-x-2"
            >
              {evaluating ? (
                <span className="animate-pulse">Compiling & Running Test Cases...</span>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Run Code & Execute Tests</span>
                </>
              )}
            </button>

            {/* SUBMISSION RESULTS */}
            {submission && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    {submission.status === 'Accepted' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                    <span className={`text-xs font-black uppercase ${submission.status === 'Accepted' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {submission.status}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-300 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                    {submission.passCount ?? submission.passedTests ?? 0} / {submission.totalTests} Tests Passed ({submission.score ?? 0}%)
                  </span>
                </div>

                {/* Detailed Test Cases Results */}
                {submission.testCaseResults && submission.testCaseResults.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Test Case Execution Breakdown
                    </span>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {submission.testCaseResults.map((tc, idx) => (
                        <div
                          key={tc.id || idx}
                          className={`p-3 rounded-xl border text-xs space-y-1.5 font-mono ${
                            tc.passed
                              ? 'bg-emerald-950/20 border-emerald-800/40'
                              : 'bg-rose-950/20 border-rose-800/40'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[11px] text-slate-300">
                              Test Case #{idx + 1}
                            </span>
                            <span
                              className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                                tc.passed
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              }`}
                            >
                              {tc.passed ? '✓ PASSED' : '✕ FAILED'}
                            </span>
                          </div>

                          <div className="text-[11px] space-y-1 pt-1">
                            <div className="text-slate-400">
                              <span className="text-slate-500 font-bold">Input:</span> {tc.input}
                            </div>
                            <div className="text-slate-400">
                              <span className="text-teal-400 font-bold">Expected:</span> {tc.expectedOutput}
                            </div>
                            <div className={tc.passed ? 'text-emerald-300' : 'text-rose-300'}>
                              <span className="font-bold">Actual Output:</span> {tc.actualOutput ?? 'None'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {submission.feedback && (
                  <div className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-teal-400 uppercase flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>AI Code Feedback</span>
                    </span>
                    <p>{submission.feedback}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
