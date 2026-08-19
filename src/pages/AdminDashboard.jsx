import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  Shield,
  Users,
  Briefcase,
  Bot,
  Code2,
  BarChart3,
  CheckCircle2,
  Plus,
  UserCheck,
  TrendingUp,
} from 'lucide-react';

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const [uRes, jRes, iRes, pRes] = await Promise.all([
          api.get('/admin/users'),
          api.get('/jobs'),
          api.get('/interviews'),
          api.get('/coding/problems'),
        ]);
        setUsers(uRes.data || []);
        setJobs(jRes.data || []);
        setInterviews(iRes.data || []);
        setProblems(pRes.data || []);
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 px-3 py-1 rounded-full text-amber-300 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>Platform Administrator Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">HirePrep AI System Management</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Monitor candidate usage, maintain job post repositories, manage interview question banks, and audit AI evaluations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/admin/jobs"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Job Post</span>
          </Link>
          <Link
            to="/admin/users"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center space-x-1.5"
          >
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>Manage Candidates</span>
          </Link>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Registered Users</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{users.length}</h3>
            <span className="text-[10px] text-emerald-600 font-semibold mt-1">Candidates & Admins</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Job Posts</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{jobs.length}</h3>
            <span className="text-[10px] text-indigo-600 font-semibold mt-1">Java / React / DevOps</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mock Interviews Run</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{interviews.length}</h3>
            <span className="text-[10px] text-emerald-600 font-semibold mt-1">Completed by AI</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Coding Problems</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{problems.length}</h3>
            <span className="text-[10px] text-slate-500 mt-1">Easy, Medium, Hard</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
            <Code2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* QUICK ADMIN NAV GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/users"
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">User Management</h3>
          <p className="text-xs text-slate-500">Search candidates, assign roles, toggle account status, and view profiles.</p>
        </Link>

        <Link
          to="/admin/jobs"
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Job Openings Bank</h3>
          <p className="text-xs text-slate-500">Create target job descriptions, experience requirements, and skill sets.</p>
        </Link>

        <Link
          to="/admin/questions"
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Question Bank Manager</h3>
          <p className="text-xs text-slate-500">Categorize questions by technology (Java, Spring Boot, React, Microservices).</p>
        </Link>
      </div>
    </div>
  );
};
