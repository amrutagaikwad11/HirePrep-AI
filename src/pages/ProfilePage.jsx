import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { User, Mail, Shield, FileText, Upload, Trash2, CheckCircle2 } from 'lucide-react';

export const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [name, setName] = useState(user?.name || '');
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Full Stack Java Developer');
  const [experienceLevel, setExperienceLevel] = useState(user?.experienceLevel || 'MID');
  const [uploadedText, setUploadedText] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await api.get('/resumes');
        setResumes(res.data || []);
      } catch (err) {
        console.error('Failed to load resumes:', err);
      }
    };
    fetchResumes();
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateUser({ name, targetRole, experienceLevel });
    setSavedMessage('Profile updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleAddResume = async () => {
    if (!uploadedText.trim()) return;
    try {
      const res = await api.post('/resumes', {
        fileName: `Resume_${Date.now()}.txt`,
        content: uploadedText,
      });
      setResumes((prev) => [res.data, ...prev]);
      setUploadedText('');
    } catch (err) {
      alert('Failed to upload resume text');
    }
  };

  const handleDeleteResume = async (id) => {
    try {
      await api.delete(`/resumes/${id}`);
      setResumes((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center space-x-4">
        <img
          src={user?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
          alt={user?.name}
          className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/20"
        />
        <div>
          <h1 className="text-2xl font-black text-slate-900">{user?.name}</h1>
          <p className="text-xs text-slate-500">{user?.email} • <span className="text-indigo-600 font-bold">{user?.role}</span></p>
        </div>
      </div>

      {savedMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{savedMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PROFILE FORM */}
        <form onSubmit={handleUpdateProfile} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Candidate Details</h3>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Target Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Target Position Level</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="INTERN">Intern (0-6 Months)</option>
              <option value="TRAINEE">Trainee / Graduate (0-1 Year)</option>
              <option value="JUNIOR">Junior Developer (1-2 Years)</option>
              <option value="MID">Mid Level Developer (2-5 Years)</option>
              <option value="SENIOR">Senior Developer (5-8 Years)</option>
              <option value="LEAD">Tech Lead / Engineering Manager (8+ Years)</option>
              <option value="ARCHITECT">Software / Solutions Architect (10+ Years)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow hover:bg-indigo-700 transition-colors"
          >
            Save Profile Settings
          </button>
        </form>

        {/* RESUME MANAGEMENT */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Resume Documents</h3>

          <div className="space-y-2">
            <textarea
              value={uploadedText}
              onChange={(e) => setUploadedText(e.target.value)}
              placeholder="Paste new resume text to add to candidate library..."
              rows={3}
              className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddResume}
              className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center space-x-1"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Add Resume Content</span>
            </button>
          </div>

          <div className="space-y-2 pt-2">
            {resumes.map((r) => (
              <div key={r.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 block">{r.fileName}</span>
                  <span className="text-[10px] text-slate-400">Uploaded {new Date(r.uploadedAt).toLocaleDateString()}</span>
                </div>
                <button
                  onClick={() => handleDeleteResume(r.id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
