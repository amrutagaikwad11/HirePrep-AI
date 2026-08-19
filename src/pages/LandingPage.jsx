import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Bot,
  FileText,
  Code2,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Users,
  Play,
  Upload,
  Star,
  ChevronRight,
  Award,
  Cpu,
  Check,
  Brain,
  FileSearch,
  Rocket,
  TrendingUp,
  Terminal,
  Activity,
  Lightbulb,
} from 'lucide-react';

export const LandingPage = () => {
  const { user, demoLogin } = useAuth();
  const navigate = useNavigate();

  // Interactive ATS Preview Widget State
  const [sampleResume, setSampleResume] = useState(
    'Experienced Full Stack Developer with 4+ years in Java, Spring Boot, REST APIs, React, TypeScript, and MySQL database optimization.'
  );
  const [sampleJd, setSampleJd] = useState(
    'Seeking Java Full Stack Engineer with Spring Boot 3, React, Docker containerization, AWS cloud, and REST microservices expertise.'
  );
  const [atsResult, setAtsResult] = useState(null);
  const [calculating, setCalculating] = useState(false);

  const handleQuickAtsCheck = () => {
    setCalculating(true);
    setTimeout(() => {
      setAtsResult({
        score: 88,
        matched: ['Java', 'Spring Boot', 'React', 'REST APIs', 'MySQL', 'TypeScript'],
        missing: ['Docker', 'AWS', 'Microservices'],
      });
      setCalculating(false);
    }, 800);
  };

  const handleDemoCandidate = async () => {
    await demoLogin('CANDIDATE');
    navigate('/dashboard');
  };

  const handleDemoAdmin = async () => {
    await demoLogin('ADMIN');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#07080D] text-slate-100 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      
      {/* HERO SECTION MATCHING SCREENSHOT */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[85vh] flex flex-col justify-center">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* LEFT HERO TEXT & CTAS (Cols 1-6) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-8"
          >
            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                Prepare Smarter.<br />
                Interview <span className="bg-gradient-to-r from-purple-400 via-[#8B5CF6] to-cyan-400 bg-clip-text text-transparent">Better.</span><br />
                Get Hired.
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
              Upload your resume and the job description. Our AI will analyze your ATS compatibility, conduct realistic mock interviews, and evaluate your technical skills.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to={user ? (user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard') : '/register'}
                  className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#3B82F6] hover:opacity-95 text-white font-bold text-sm px-8 py-4 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all flex items-center justify-center space-x-2"
                >
                  <span>Start Preparing Free</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/resume-analysis"
                  className="border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm px-8 py-4 rounded-full backdrop-blur-md transition-all flex items-center space-x-2"
                >
                  <span>Analyze Resume</span>
                </Link>
              </motion.div>
            </div>

            {/* Quick Demo Logins if not logged in */}
            {!user && (
              <div className="pt-2 flex items-center space-x-3 text-xs text-slate-400">
                <span>Or explore demo:</span>
                <button
                  onClick={handleDemoCandidate}
                  className="text-purple-400 hover:text-purple-300 underline font-medium cursor-pointer"
                >
                  Candidate Portal
                </button>
                <span>•</span>
                <button
                  onClick={handleDemoAdmin}
                  className="text-indigo-400 hover:text-indigo-300 underline font-medium cursor-pointer"
                >
                  Admin Console
                </button>
              </div>
            )}

            {/* STATS ROW (Matching screenshot bottom left) */}
            <div className="pt-10 border-t border-white/10 grid grid-cols-3 gap-6">
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
                >
                  98%
                </motion.div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                  SUCCESS RATE
                </div>
              </div>

              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
                >
                  50k+
                </motion.div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                  MOCK INTERVIEWS
                </div>
              </div>

              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
                >
                  #1
                </motion.div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                  AI RECRUITER
                </div>
              </div>
            </div>

          </motion.div>

          {/* RIGHT 3D GRAPHIC / ILLUSTRATION CARD (Cols 7-12) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            {/* Outer Glowing Border Frame */}
            <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-[#111322] via-[#0D0F1A] to-[#0A0C16] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
              
              {/* Top Bar inside Graphic */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-xs font-mono text-purple-300 font-bold ml-2">AI TALENT ANALYZER</span>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  LIVE SCANNING
                </span>
              </div>

              {/* Holographic Graphic Layout Canvas */}
              <div className="relative min-h-[380px] sm:min-h-[420px] flex items-center justify-center">
                
                {/* Central Laptop Screen Concept */}
                <div className="w-full max-w-md bg-[#0F1222] border border-cyan-500/30 rounded-2xl p-5 shadow-[0_0_40px_rgba(139,92,246,0.3)] relative z-10 space-y-4">
                  
                  {/* Laptop Screen Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        SJ
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">SARAH JENKINS</h4>
                        <p className="text-[11px] text-purple-300">Software Engineer</p>
                      </div>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
                      98% ATS MATCH
                    </span>
                  </div>

                  {/* Experience & Skills Bars */}
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-300 mb-1 font-mono">
                        <span>EXPERIENCE & ARCHITECTURE</span>
                        <span className="text-cyan-400">EXPERT</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/10">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '92%' }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full"
                        />
                      </div>
                    </div>

                    {/* Skill Tags */}
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">DETECTED SKILLS</span>
                      <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                        <span className="bg-purple-950/80 border border-purple-500/40 text-purple-300 px-2 py-0.5 rounded">Python</span>
                        <span className="bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 px-2 py-0.5 rounded">JS / TS</span>
                        <span className="bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 px-2 py-0.5 rounded">AI / LLM</span>
                        <span className="bg-blue-950/80 border border-blue-500/40 text-blue-300 px-2 py-0.5 rounded">DevOps</span>
                      </div>
                    </div>

                    {/* Animated Code snippet inside graphic */}
                    <div className="bg-[#080A12] border border-white/10 rounded-xl p-3 font-mono text-[11px] text-slate-300 space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500 border-b border-white/5 pb-1">
                        <span>interview_eval.py</span>
                        <span className="text-emerald-400">PASSED</span>
                      </div>
                      <p className="text-purple-300"><span className="text-cyan-400">def</span> evaluate_response(ans):</p>
                      <p className="text-slate-400 pl-4">score = ai_engine.analyze(ans)</p>
                      <p className="text-emerald-400 pl-4">return &#123; "ats": 98, "status": "HIRED" &#125;</p>
                    </div>
                  </div>

                </div>

                {/* Floating 3D Cards & Badges */}
                <motion.div 
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-3 -right-2 sm:right-2 z-20 bg-[#12162B]/90 border border-purple-500/50 backdrop-blur-xl rounded-2xl p-3 shadow-[0_0_20px_rgba(139,92,246,0.4)] flex items-center space-x-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-400/50 flex items-center justify-center text-purple-300">
                    <Brain className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-purple-300 font-bold">AI EVALUATOR</p>
                    <p className="text-xs font-bold text-white">Gemini 3.6 Synced</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [8, -8, 8] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-2 sm:left-2 z-20 bg-[#12162B]/90 border border-cyan-500/50 backdrop-blur-xl rounded-2xl p-3 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center space-x-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-600/30 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
                    <FileText className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-cyan-300 font-bold">RESUME SCORED</p>
                    <p className="text-xs font-bold text-white">98/100 Compatibility</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-1/2 -left-6 z-20 hidden sm:flex w-10 h-10 rounded-full bg-indigo-600/30 border border-indigo-400/50 items-center justify-center text-indigo-300 backdrop-blur-md shadow-lg"
                >
                  <Code2 className="w-5 h-5 text-indigo-300" />
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-12 -right-4 z-20 hidden sm:flex w-10 h-10 rounded-full bg-blue-600/30 border border-blue-400/50 items-center justify-center text-blue-300 backdrop-blur-md shadow-lg"
                >
                  <Rocket className="w-5 h-5 text-blue-300" />
                </motion.div>

              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* INTERACTIVE ATS DEMO WIDGET SECTION */}
      <section className="py-16 bg-[#0B0D17] border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/30">
              INTERACTIVE DEMO
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Test Your ATS Compatibility in Seconds
            </h2>
            <p className="text-sm text-slate-400">
              Try our instant AI resume keyword analyzer below to inspect matched skills and missing target keywords.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#121526] to-[#0D0F1C] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-xs font-mono text-purple-300 font-bold uppercase tracking-wider mb-2">
                  1. Candidate Resume Summary
                </label>
                <textarea
                  value={sampleResume}
                  onChange={(e) => setSampleResume(e.target.value)}
                  rows={4}
                  className="w-full p-4 text-xs font-mono bg-[#080A12] border border-white/15 rounded-2xl text-slate-200 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Paste candidate resume text..."
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider mb-2">
                  2. Target Job Description (JD)
                </label>
                <textarea
                  value={sampleJd}
                  onChange={(e) => setSampleJd(e.target.value)}
                  rows={4}
                  className="w-full p-4 text-xs font-mono bg-[#080A12] border border-white/15 rounded-2xl text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Paste job description..."
                />
              </div>

            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleQuickAtsCheck}
                disabled={calculating}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                {calculating ? (
                  <span>Analyzing Keywords...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Run Live ATS Audit</span>
                  </>
                )}
              </motion.button>

              {atsResult && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full sm:w-auto flex items-center space-x-6 bg-[#080A12] border border-white/15 px-6 py-3 rounded-2xl text-xs font-mono"
                >
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">MATCH SCORE</span>
                    <span className="text-2xl font-extrabold text-emerald-400">{atsResult.score}%</span>
                  </div>
                  <div className="border-l border-white/10 pl-6 space-y-0.5">
                    <p className="text-emerald-400 font-bold">✓ {atsResult.matched.length} Matched Skills</p>
                    <p className="text-rose-400 font-bold">✕ {atsResult.missing.length} Missing Keywords</p>
                  </div>
                </motion.div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* FEATURES SECTION (`#features`) */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/30">
            PLATFORM CAPABILITIES
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Complete Suite for Technical Job Success
          </h2>
          <p className="text-slate-400 text-base">
            Everything you need to optimize your resume, conquer tough interview questions, and sharpen your coding speed.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: ATS Analyzer */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-gradient-to-b from-[#111425] to-[#0B0D18] border border-white/10 hover:border-purple-500/50 rounded-3xl p-6 space-y-4 flex flex-col justify-between transition-all shadow-xl group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <FileSearch className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">ATS Resume Audit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Parse PDF/DOCX resumes against target job descriptions. Extract missing keywords and improve bullet point formatting.
              </p>
            </div>
            <Link
              to="/resume-analysis"
              className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center space-x-1.5 pt-4 border-t border-white/10"
            >
              <span>Explore ATS Analyzer</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Card 2: AI Mock Interviewer */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-gradient-to-b from-[#111425] to-[#0B0D18] border border-white/10 hover:border-indigo-500/50 rounded-3xl p-6 space-y-4 flex flex-col justify-between transition-all shadow-xl group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">AI Mock Interviewer</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Realistic technical & HR interviews powered by Gemini AI. Speech synthesis, response evaluation (0-10), and model answers.
              </p>
            </div>
            <Link
              to="/interviews"
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1.5 pt-4 border-t border-white/10"
            >
              <span>Launch Mock Interviewer</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Card 3: Coding Lab */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-gradient-to-b from-[#111425] to-[#0B0D18] border border-white/10 hover:border-cyan-500/50 rounded-3xl p-6 space-y-4 flex flex-col justify-between transition-all shadow-xl group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Coding Sandbox</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Data structures & algorithms playground for Java, JS, and Python with automated test suite validation and complexity checks.
              </p>
            </div>
            <Link
              to="/coding"
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1.5 pt-4 border-t border-white/10"
            >
              <span>Enter Coding Sandbox</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Card 4: Skill Matrix */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-gradient-to-b from-[#111425] to-[#0B0D18] border border-white/10 hover:border-blue-500/50 rounded-3xl p-6 space-y-4 flex flex-col justify-between transition-all shadow-xl group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Skill Matrix</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Historical performance benchmarks, score breakdowns over time, and candidate readiness analytics for top tech companies.
              </p>
            </div>
            <Link
              to="/performance"
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1.5 pt-4 border-t border-white/10"
            >
              <span>View Skill Matrix</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION (`#how-it-works`) */}
      <section id="how-it-works" className="py-20 bg-[#0A0C16] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
              SIMPLE 4-STEP PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How HirePrep AI Gets You Job Ready
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            <div className="space-y-4 relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-mono font-bold text-sm flex items-center justify-center shadow-lg">
                01
              </div>
              <h3 className="text-lg font-bold text-white">Upload Documents</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload your latest candidate resume and target job spec URL or text description.
              </p>
            </div>

            <div className="space-y-4 relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white font-mono font-bold text-sm flex items-center justify-center shadow-lg">
                02
              </div>
              <h3 className="text-lg font-bold text-white">Instant ATS Gap Audit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Gemini AI parses missing technical keywords, frameworks, and keyword match scores.
              </p>
            </div>

            <div className="space-y-4 relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-600 text-white font-mono font-bold text-sm flex items-center justify-center shadow-lg">
                03
              </div>
              <h3 className="text-lg font-bold text-white">Simulated AI Interview</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Practice voice/text interview rounds with custom difficulty tailored to your role.
              </p>
            </div>

            <div className="space-y-4 relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-emerald-500 text-white font-mono font-bold text-sm flex items-center justify-center shadow-lg">
                04
              </div>
              <h3 className="text-lg font-bold text-white">Recruiter Feedback & Offer</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive model answers, technical improvement pointers, and skill readiness metrics.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* PRICING SECTION (`#pricing`) */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/30">
            FLEXIBLE PLANS
          </span>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Transparent Plans for Every Engineer
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {/* Free Tier */}
          <div className="bg-[#0E101A] border border-white/10 rounded-3xl p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Starter Free</h3>
              <div className="text-3xl font-extrabold text-white">$0 <span className="text-xs font-normal text-slate-400">/ forever</span></div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /> <span>3 ATS Resume Scans / month</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /> <span>2 AI Mock Interview Rounds</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /> <span>Basic Coding Sandbox</span></li>
              </ul>
            </div>
            <Link
              to="/register"
              className="w-full text-center py-3 rounded-full border border-white/20 text-xs font-bold text-white hover:bg-white/5 transition-colors"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Tier (Popular) */}
          <div className="bg-gradient-to-b from-[#161933] to-[#0F1224] border-2 border-purple-500 rounded-3xl p-8 space-y-6 flex flex-col justify-between relative shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
              MOST POPULAR
            </span>
            <div className="space-y-4 pt-2">
              <h3 className="text-xl font-bold text-white">Pro Candidate</h3>
              <div className="text-3xl font-extrabold text-white">$19 <span className="text-xs font-normal text-slate-400">/ month</span></div>
              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /> <span>Unlimited ATS Resume Scans</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /> <span>Unlimited AI Mock Interviews</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /> <span>Gemini 3.6 Flash Voice Feedback</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /> <span>Full Coding Lab Test Cases</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /> <span>Skill Matrix Analytics</span></li>
              </ul>
            </div>
            <Link
              to="/register"
              className="w-full text-center py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-xs font-bold text-white shadow-lg hover:opacity-90 transition-opacity"
            >
              Start 7-Day Free Trial
            </Link>
          </div>

          {/* Recruiter / Admin Tier */}
          <div className="bg-[#0E101A] border border-white/10 rounded-3xl p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Recruiter Team</h3>
              <div className="text-3xl font-extrabold text-white">$49 <span className="text-xs font-normal text-slate-400">/ month</span></div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /> <span>All Pro Features included</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /> <span>Candidate Management Console</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /> <span>Custom Interview Question Banks</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /> <span>Job Posting & ATS Filters</span></li>
              </ul>
            </div>
            <button
              onClick={handleDemoAdmin}
              className="w-full text-center py-3 rounded-full border border-white/20 text-xs font-bold text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Explore Admin Console
            </button>
          </div>

        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-blue-900/40 border border-purple-500/30 rounded-3xl p-10 sm:p-14 text-center space-y-6 relative overflow-hidden backdrop-blur-xl">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to Land Your Dream Role?
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Join thousands of candidates who improved their interview confidence and ATS match rate with HirePrep AI.
            </p>
            <div className="pt-4 flex justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white font-bold text-sm px-10 py-4 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.6)] inline-flex items-center space-x-2"
                >
                  <span>Start Preparing Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
