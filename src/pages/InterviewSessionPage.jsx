import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import {
  Bot,
  Volume2,
  Mic,
  MicOff,
  Send,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Sparkles,
  Award,
  RotateCcw,
  BookOpen,
  AlertTriangle,
} from 'lucide-react';

export const InterviewSessionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await api.get(`/interviews/${id}`);
        setInterview(res.data);

        // Resume at first unanswered question if returning to an in-progress session
        if (res.data?.questions && res.data?.answers) {
          const answeredCount = Object.keys(res.data.answers).length;
          if (answeredCount < res.data.questions.length) {
            setCurrentStep(answeredCount);
          } else {
            setCurrentStep(res.data.questions.length - 1);
          }
        }
      } catch (err) {
        setError('Interview session not found');
      } finally {
        setLoading(false);
      }
    };
    fetchInterview();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm font-bold text-slate-700">Initializing AI Mock Interview Room...</p>
      </div>
    );
  }

  if (error || !interview) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <div className="p-4 bg-red-50 text-red-700 text-xs font-semibold rounded-2xl">{error || 'Session error'}</div>
        <Link to="/interviews" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">
          Return to Interviews
        </Link>
      </div>
    );
  }

  const currentQuestion = interview.questions[currentStep];
  const currentAnswer = currentQuestion ? interview.answers[currentQuestion.id] : undefined;

  // Read Question Aloud via TTS API or Web Speech Fallback
  const handleReadQuestionAloud = async () => {
    if (!currentQuestion) return;
    setSpeaking(true);

    try {
      const res = await api.post('/interviews/tts', { text: currentQuestion.questionText });
      if (res.data?.audioBase64) {
        // Play base64 audio
        const audio = new Audio(`data:audio/wav;base64,${res.data.audioBase64}`);
        audio.onended = () => setSpeaking(false);
        audio.play();
        return;
      }
    } catch (err) {
      console.warn('Backend TTS failed, trying browser Web Speech synthesis fallback');
    }

    // Web Speech Fallback
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentQuestion.questionText);
      utterance.rate = 1.0;
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setSpeaking(false);
    }
  };

  // Toggle Voice Mic Speech Recognition
  const handleToggleMic = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech Recognition is not supported in this browser. Please type your answer directly into the text field.');
      return;
    }

    if (listening) {
      setListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setListening(true);
    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setCandidateAnswer((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.start();
  };

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || !candidateAnswer.trim()) return;
    setSubmitting(true);

    try {
      const res = await api.post(`/interviews/${interview.id}/submit-answer`, {
        questionId: currentQuestion.id,
        answer: candidateAnswer,
      });

      setInterview(res.data.interview);
      setCandidateAnswer('');
    } catch (err) {
      alert('Error evaluating answer: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const isCompleted = interview.status === 'Completed' || Object.keys(interview.answers).length === interview.questions.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* INTERVIEW HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-500/30">
              {interview.interviewType} Focus
            </span>
            <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-slate-700">
              {interview.difficulty} Difficulty
            </span>
          </div>
          <h1 className="text-xl font-extrabold mt-1">{interview.jobTitle}</h1>
          <p className="text-xs text-slate-400">{interview.company}</p>
        </div>

        <div className="flex items-center space-x-4 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Average Score</span>
            <span className="text-xl font-black text-indigo-400">{interview.score} / 10</span>
          </div>
          <Trophy className="w-6 h-6 text-amber-400" />
        </div>
      </div>

      {/* QUESTION NAVIGATION STEPPER */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center space-x-2">
          {interview.questions.map((q, idx) => {
            const hasAnswer = Boolean(interview.answers[q.id]);
            const isCurrent = idx === currentStep;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentStep(idx)}
                className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300'
                    : hasAnswer
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {hasAnswer ? '✓' : idx + 1}
              </button>
            );
          })}
        </div>

        <span className="text-xs font-bold text-slate-500">
          Question {currentStep + 1} of {interview.questions.length}
        </span>
      </div>

      {/* ACTIVE QUESTION CARD */}
      {currentQuestion && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                {currentQuestion.category}
              </span>
              <h2 className="text-lg font-bold text-slate-900 leading-snug pt-1">
                {currentQuestion.questionText}
              </h2>
            </div>

            {/* AI Reader Button */}
            <button
              onClick={handleReadQuestionAloud}
              disabled={speaking}
              className={`p-2.5 rounded-xl border transition-all shrink-0 ${
                speaking ? 'bg-indigo-100 text-indigo-700 border-indigo-300 animate-pulse' : 'bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border-slate-200'
              }`}
              title="AI Question Voice Reader"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* IF ANSWER SUBMITTED FOR THIS QUESTION: DISPLAY EVALUATION */}
          {currentAnswer ? (
            <div className="space-y-6 pt-2 border-t border-slate-100">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Submitted Answer:</span>
                <p className="text-xs text-slate-800 leading-relaxed font-normal">{currentAnswer.answer}</p>
              </div>

              {/* AI EVALUATION CARD */}
              <div className="bg-indigo-50/70 p-6 rounded-2xl border border-indigo-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-sm font-bold text-indigo-950">AI Answer Evaluation</h3>
                  </div>
                  <div className="bg-white px-3 py-1 rounded-xl shadow-2xs border border-indigo-200">
                    <span className="text-xs text-slate-500 font-semibold">Score: </span>
                    <span className="text-sm font-black text-indigo-600">{currentAnswer.score} / 10</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">{currentAnswer.feedback}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-white p-3 rounded-xl border border-emerald-200">
                    <h4 className="text-[11px] font-bold text-emerald-800 uppercase mb-1">Strengths</h4>
                    <ul className="text-xs text-slate-600 space-y-0.5 list-disc list-inside">
                      {currentAnswer.strengths.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-rose-200">
                    <h4 className="text-[11px] font-bold text-rose-800 uppercase mb-1">Areas to Improve</h4>
                    <ul className="text-xs text-slate-600 space-y-0.5 list-disc list-inside">
                      {currentAnswer.weaknesses.map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Model Answer Accordion */}
                <div className="bg-white p-4 rounded-xl border border-indigo-200/80 space-y-1">
                  <span className="text-[11px] font-bold text-indigo-900 uppercase flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Exemplary Model Answer</span>
                  </span>
                  <p className="text-xs text-slate-700 italic leading-relaxed pt-1">{currentAnswer.modelAnswer}</p>
                </div>
              </div>

              {/* Step Controls */}
              <div className="flex justify-between items-center pt-2">
                <button
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold disabled:opacity-40"
                >
                  Previous
                </button>

                {currentStep < interview.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentStep((s) => s + 1)}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center space-x-1.5"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    to="/dashboard"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center space-x-1.5"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Complete Interview & View Summary</span>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            /* ANSWER INPUT FORM */
            <div className="space-y-4 pt-2">
              <div className="relative">
                <textarea
                  value={candidateAnswer}
                  onChange={(e) => setCandidateAnswer(e.target.value)}
                  placeholder="Type your response here in detail. Include architectural principles, code patterns, and real-world project context..."
                  rows={6}
                  className="w-full p-4 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={handleToggleMic}
                  className={`absolute right-3 bottom-3 p-2 rounded-xl transition-all ${
                    listening ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                  title={listening ? 'Recording Voice... Click to Stop' : 'Click to Speak (Voice-to-Text)'}
                >
                  {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[11px] text-slate-400">
                  Tip: A clear answer covering technical principles gets higher scores from AI.
                </p>

                <button
                  onClick={handleSubmitAnswer}
                  disabled={submitting || !candidateAnswer.trim()}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="animate-pulse">Evaluating Answer...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Answer</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* COMPLETED INTERVIEW SCORECARD SUMMARY */}
      {isCompleted && (
        <div className="bg-gradient-to-b from-white to-indigo-50/50 p-8 rounded-3xl border border-indigo-100 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Mock Interview Completed!</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Great job! You answered all {interview.questions.length} questions. Your final performance score is{' '}
            <span className="font-extrabold text-indigo-600 text-base">{interview.score} / 10</span>.
          </p>

          <div className="pt-2 flex justify-center space-x-3">
            <Link
              to="/dashboard"
              className="px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow hover:bg-indigo-700 transition-colors"
            >
              Return to Candidate Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
