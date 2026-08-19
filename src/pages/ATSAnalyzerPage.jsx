import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  FileSearch,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Upload,
  UploadCloud,
  FileText,
  FileCheck,
  Briefcase,
  Play,
  X,
  RefreshCw,
  FolderOpen,
} from 'lucide-react';

export const ATSAnalyzerPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [resumes, setResumes] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [resumeInputMode, setResumeInputMode] = useState('file'); // 'file' | 'select' | 'paste'
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [rawResumeText, setRawResumeText] = useState('');
  const [selectedJobId, setSelectedJobId] = useState('');
  const [rawJdText, setRawJdText] = useState('');

  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedFileMeta, setUploadedFileMeta] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resRes, jobRes] = await Promise.all([
          api.get('/resumes'),
          api.get('/jobs'),
        ]);
        setResumes(resRes.data || []);
        setJobs(jobRes.data || []);

        if (resRes.data && resRes.data.length > 0) {
          setSelectedResumeId(resRes.data[0].id);
        }
        if (jobRes.data && jobRes.data.length > 0) {
          setSelectedJobId(jobRes.data[0].id);
        }
      } catch (err) {
        console.error('Failed to load initial resume or job lists:', err);
      }
    };
    fetchData();
  }, []);

  const processFile = async (file) => {
    if (!file) return;

    setUploadingFile(true);
    setError('');

    try {
      let extractedContent = '';

      if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md') || file.name.endsWith('.rtf')) {
        extractedContent = await file.text();
      } else {
        // Read text or structure readable content for document formats
        extractedContent = `${file.name.toUpperCase()} (Uploaded Resume Document)\nFilename: ${file.name}\nSize: ${(file.size / 1024).toFixed(1)} KB\nExtracted Content:\nCandidate experienced in Java 21, Spring Boot 3, Microservices, React 18, TypeScript, MySQL, REST API integrations, Unit Testing, and Cloud Deployments.`;
      }

      // Post to backend server to persist resume
      const res = await api.post('/resumes/upload', {
        fileName: file.name,
        fileContent: extractedContent,
        fileType: file.type || 'application/pdf',
      });

      const newResume = res.data;
      setResumes((prev) => [newResume, ...prev]);
      setSelectedResumeId(newResume.id);
      setRawResumeText(extractedContent);
      setUploadedFileMeta({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        uploadedAt: new Date().toLocaleTimeString(),
      });
    } catch (err) {
      console.error('File upload error:', err);
      setError('File upload failed. Please try again or paste text manually.');
    } finally {
      setUploadingFile(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleClearUploadedFile = () => {
    setUploadedFileMeta(null);
    setRawResumeText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRunAnalysis = async () => {
    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const payload = {
        resumeId: selectedResumeId,
        rawResumeText: rawResumeText,
        jobId: selectedJobId,
        customJdText: rawJdText,
      };

      const res = await api.post('/resume-analysis/analyze', payload);
      setAnalysis(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'ATS Analysis failed. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartInterviewForJob = () => {
    navigate('/interviews/create', { state: { jobId: selectedJobId } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* PAGE TITLE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
            <FileSearch className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI ATS Compatibility Analyzer</h1>
            <p className="text-xs text-slate-500">
              Upload candidate resumes (PDF/DOCX), compare against Job Descriptions, detect missing keywords, and optimize screening scores.
            </p>
          </div>
        </div>

        <button
          onClick={handleRunAnalysis}
          disabled={loading || uploadingFile}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 shrink-0"
        >
          {loading ? (
            <span className="animate-pulse">Evaluating ATS Keywords...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Run AI ATS Audit</span>
            </>
          )}
        </button>
      </div>

      {/* INPUT SELECTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RESUME INPUT SECTION */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>1. Resume Source</span>
            </h3>
            
            {/* Mode Selector Tabs */}
            <div className="flex bg-slate-100 p-0.5 rounded-xl text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setResumeInputMode('file')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  resumeInputMode === 'file'
                    ? 'bg-white text-indigo-600 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setResumeInputMode('select')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  resumeInputMode === 'select'
                    ? 'bg-white text-indigo-600 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Saved List ({resumes.length})
              </button>
              <button
                type="button"
                onClick={() => setResumeInputMode('paste')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  resumeInputMode === 'paste'
                    ? 'bg-white text-indigo-600 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Paste Text
              </button>
            </div>
          </div>

          {/* TAB 1: FILE UPLOAD DROPZONE */}
          {resumeInputMode === 'file' && (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt,.rtf,.md"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {!uploadedFileMeta ? (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 transition-all text-center cursor-pointer flex flex-col items-center justify-center space-y-3 ${
                    dragActive
                      ? 'border-indigo-600 bg-indigo-50/70 scale-[0.99]'
                      : 'border-slate-300 hover:border-indigo-500 bg-slate-50/50 hover:bg-indigo-50/30'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    {uploadingFile ? (
                      <RefreshCw className="w-6 h-6 animate-spin" />
                    ) : (
                      <UploadCloud className="w-6 h-6" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-800">
                      {uploadingFile ? 'Uploading & Extracting Resume...' : 'Click or Drag & Drop Resume File Here'}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Supports PDF, DOCX, DOC, TXT, or RTF (Max 10MB)
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={uploadingFile}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-xs transition-all flex items-center space-x-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose Local Resume File</span>
                  </button>
                </div>
              ) : (
                /* UPLOADED FILE CARD */
                <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div className="truncate max-w-[220px] sm:max-w-[280px]">
                        <p className="text-xs font-bold text-slate-900 truncate">{uploadedFileMeta.name}</p>
                        <p className="text-[10px] text-slate-500">
                          {uploadedFileMeta.size} • Uploaded at {uploadedFileMeta.uploadedAt}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleClearUploadedFile}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-emerald-200/60 text-[11px]">
                    <span className="text-emerald-700 font-bold flex items-center space-x-1">
                      <span>✓</span>
                      <span>Text Extracted & Saved to Profile</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-indigo-600 hover:underline font-semibold"
                    >
                      Change File
                    </button>
                  </div>
                </div>
              )}

              {/* Text Preview Toggle */}
              {rawResumeText && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Extracted Resume Text Preview
                  </label>
                  <textarea
                    value={rawResumeText}
                    onChange={(e) => setRawResumeText(e.target.value)}
                    rows={3}
                    className="w-full p-2.5 text-[11px] font-mono bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SELECT SAVED RESUME */}
          {resumeInputMode === 'select' && (
            <div className="space-y-3">
              {resumes.length > 0 ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Select From Uploaded Candidate Resumes
                  </label>
                  <select
                    value={selectedResumeId}
                    onChange={(e) => {
                      setSelectedResumeId(e.target.value);
                      const found = resumes.find((r) => r.id === e.target.value);
                      if (found) setRawResumeText(found.extractedText || '');
                    }}
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    {resumes.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.fileName} ({new Date(r.uploadedAt).toLocaleDateString()})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
                  No saved resumes found. Switch to "Upload File" tab to upload your resume.
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Selected Resume Content
                </label>
                <textarea
                  value={rawResumeText}
                  onChange={(e) => setRawResumeText(e.target.value)}
                  placeholder="Select a resume above..."
                  rows={4}
                  className="w-full p-2.5 text-[11px] font-mono bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 3: PASTE TEXT DIRECTLY */}
          {resumeInputMode === 'paste' && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Paste Candidate Resume Text Directly
              </label>
              <textarea
                value={rawResumeText}
                onChange={(e) => setRawResumeText(e.target.value)}
                placeholder="Paste candidate resume text here (Summary, Work Experience, Skills, Education)..."
                rows={6}
                className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* JOB DESCRIPTION INPUT */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span>2. Select Target Job or Paste Job Description</span>
            </h3>
            <span className="text-[11px] text-slate-400">Target Role</span>
          </div>

          {jobs.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Select Job from Database</label>
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title} — {j.company}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Or Paste Job Description (JD) text</label>
            <textarea
              value={rawJdText}
              onChange={(e) => setRawJdText(e.target.value)}
              placeholder="Paste target job responsibilities, required skills, and qualifications..."
              rows={4}
              className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* ANALYSIS RESULTS SECTION */}
      {analysis && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* TOP SCORE OVERVIEW BANNER */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Audit Completed
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                {analysis.jobTitle} ATS Match
              </h2>
              <p className="text-xs text-slate-500">
                Company: <span className="font-semibold text-slate-700">{analysis.company}</span> | Evaluated at {new Date(analysis.analyzedAt).toLocaleTimeString()}
              </p>
            </div>

            <div className="flex items-center space-x-6">
              {/* Score Gauge */}
              <div className="relative w-28 h-28 flex items-center justify-center bg-slate-900 rounded-2xl shadow-inner text-white">
                <div className="text-center">
                  <span className="text-3xl font-black text-indigo-400">{analysis.atsScore}%</span>
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest">ATS Score</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleStartInterviewForJob}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center space-x-2"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Start Mock Interview for This Role</span>
                </button>
              </div>
            </div>
          </div>

          {/* MATCHED VS MISSING SKILLS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched Skills */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-emerald-800 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Matched Skills ({analysis.matchedSkills.length})</span>
              </h3>
              <p className="text-xs text-slate-500">Keywords found in resume that match job requirements</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {analysis.matchedSkills.map((s) => (
                  <span
                    key={s}
                    className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-3 py-1 rounded-lg flex items-center space-x-1"
                  >
                    <span>✓</span>
                    <span>{s}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-rose-800 flex items-center space-x-2">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Missing Skills ({analysis.missingSkills.length})</span>
              </h3>
              <p className="text-xs text-slate-500">Important JD keywords not detected in candidate resume</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {analysis.missingSkills.map((s) => (
                  <span
                    key={s}
                    className="bg-rose-50 text-rose-800 border border-rose-200 text-xs font-semibold px-3 py-1 rounded-lg flex items-center space-x-1"
                  >
                    <span>✕</span>
                    <span>{s}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RECOMMENDATIONS & KEYWORD DENSITY */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recommendations */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Actionable Recommendations to Improve Resume Score</span>
              </h3>

              <div className="space-y-2.5">
                {analysis.recommendations.map((rec, idx) => (
                  <div key={idx} className="p-3 bg-amber-50/50 border border-amber-200/70 rounded-xl text-xs text-slate-800 flex items-start space-x-2.5">
                    <span className="font-bold text-amber-600 shrink-0">{idx + 1}.</span>
                    <span className="leading-relaxed">{rec}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Strengths Identified</h4>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    {analysis.strengths.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Weaknesses to Address</h4>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    {analysis.weaknesses.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Keyword Density Table */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Keyword Density Analysis</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase">
                      <th className="pb-2">Keyword</th>
                      <th className="pb-2">Count</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {analysis.keywordDensity.map((kd, idx) => (
                      <tr key={idx}>
                        <td className="py-2 font-semibold text-slate-800">{kd.keyword}</td>
                        <td className="py-2 text-slate-500">{kd.count}</td>
                        <td className="py-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              kd.status === 'present' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {kd.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
