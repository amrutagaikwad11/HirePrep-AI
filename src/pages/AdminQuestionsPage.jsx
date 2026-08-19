import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Bot, Plus, Trash2, BookOpen } from 'lucide-react';

export const AdminQuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [questionText, setQuestionText] = useState('');
  const [category, setCategory] = useState('Java');
  const [difficulty, setDifficulty] = useState('Medium');
  const [modelAnswer, setModelAnswer] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await api.get('/admin/questions');
      setQuestions(res.data || []);
    } catch (err) {
      console.error('Failed to load questions:', err);
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/admin/questions', {
        questionText,
        category,
        difficulty,
        modelAnswer,
      });
      setQuestions((prev) => [res.data, ...prev]);
      setShowModal(false);
      setQuestionText('');
      setModelAnswer('');
    } catch (err) {
      alert('Failed to add question');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/questions/${id}`);
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Interview Question Bank</h1>
            <p className="text-xs text-slate-500">Manage technical and behavioral questions used during AI mock interviews</p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center space-x-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Question</span>
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full space-y-4">
            <h3 className="text-lg font-black text-slate-900">Add Interview Question</h3>
            <form onSubmit={handleAddQuestion} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Question Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Java">Java / Core OOP</option>
                  <option value="Spring Boot">Spring Boot / Microservices</option>
                  <option value="React">React / Frontend</option>
                  <option value="Database">SQL / MySQL Database</option>
                  <option value="System Design">System Architecture & Design</option>
                  <option value="HR">HR & Behavioral</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Question Prompt</label>
                <textarea
                  required
                  rows={3}
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="e.g. Explain Dependency Injection and IoC in Spring Boot..."
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Exemplary Model Answer</label>
                <textarea
                  required
                  rows={3}
                  value={modelAnswer}
                  onChange={(e) => setModelAnswer(e.target.value)}
                  placeholder="Standard model answer keywords and architectural points..."
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow hover:bg-blue-500"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-500 uppercase">
          Total Bank Questions ({questions.length})
        </div>
        <div className="divide-y divide-slate-100">
          {questions.map((q) => (
            <div key={q.id} className="p-5 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {q.category}
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                    {q.difficulty}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 pt-1">{q.questionText}</h4>
                <p className="text-[11px] text-slate-500 italic">Model Answer: {q.modelAnswer}</p>
              </div>

              <button
                onClick={() => handleDelete(q.id)}
                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
