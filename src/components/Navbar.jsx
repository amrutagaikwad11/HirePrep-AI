import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  FileText,
  Briefcase,
  Bot,
  Code2,
  BarChart3,
  UserCheck,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  User as UserIcon,
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/' + id);
      return;
    }
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A0D14]/90 backdrop-blur-xl border-b border-white/10 text-slate-100 shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ rotate: 12, scale: 1.05 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.6)] shrink-0"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                HirePrep <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
              </span>
              <span className="text-[10px] font-mono font-medium text-purple-300/60 tracking-wider -mt-1">
                RECRUITMENT INTELLIGENCE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-slate-300">
            {!user ? (
              <>
                <button
                  onClick={() => scrollToSection('#features')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('#how-it-works')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  How it Works
                </button>
                <button
                  onClick={() => scrollToSection('#pricing')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  Pricing
                </button>
                <Link
                  to="/about"
                  className={`transition-colors ${
                    isActive('/about') ? 'text-purple-400 font-semibold' : 'hover:text-purple-400'
                  }`}
                >
                  Architecture
                </Link>
                <Link
                  to="/contact"
                  className={`transition-colors ${
                    isActive('/contact') ? 'text-purple-400 font-semibold' : 'hover:text-purple-400'
                  }`}
                >
                  Contact
                </Link>
              </>
            ) : user.role === 'ADMIN' ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className={`flex items-center space-x-1.5 transition-colors ${
                    isActive('/admin/dashboard') ? 'text-purple-400 font-semibold' : 'hover:text-purple-400'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-purple-400" />
                  <span>Admin Overview</span>
                </Link>
                <Link
                  to="/admin/users"
                  className={`flex items-center space-x-1.5 transition-colors ${
                    isActive('/admin/users') ? 'text-purple-400 font-semibold' : 'hover:text-purple-400'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Users</span>
                </Link>
                <Link
                  to="/admin/jobs"
                  className={`flex items-center space-x-1.5 transition-colors ${
                    isActive('/admin/jobs') ? 'text-purple-400 font-semibold' : 'hover:text-purple-400'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                  <span>Jobs</span>
                </Link>
                <Link
                  to="/admin/questions"
                  className={`flex items-center space-x-1.5 transition-colors ${
                    isActive('/admin/questions') ? 'text-purple-400 font-semibold' : 'hover:text-purple-400'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5 text-purple-400" />
                  <span>Question Bank</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-1.5 transition-colors ${
                    isActive('/dashboard') ? 'text-purple-400 font-semibold' : 'hover:text-purple-400'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-purple-400" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/resume-analysis"
                  className={`flex items-center space-x-1.5 transition-colors ${
                    isActive('/resume-analysis') ? 'text-purple-400 font-semibold' : 'hover:text-purple-400'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  <span>ATS Analyzer</span>
                </Link>
                <Link
                  to="/interviews"
                  className={`flex items-center space-x-1.5 transition-colors ${
                    isActive('/interviews') || location.pathname.startsWith('/interviews/')
                      ? 'text-purple-400 font-semibold'
                      : 'hover:text-purple-400'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5 text-purple-400" />
                  <span>Mock Interviews</span>
                </Link>
                <Link
                  to="/coding"
                  className={`flex items-center space-x-1.5 transition-colors ${
                    isActive('/coding') || location.pathname.startsWith('/coding/')
                      ? 'text-purple-400 font-semibold'
                      : 'hover:text-purple-400'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Coding Sandbox</span>
                </Link>
                <Link
                  to="/performance"
                  className={`flex items-center space-x-1.5 transition-colors ${
                    isActive('/performance') ? 'text-purple-400 font-semibold' : 'hover:text-purple-400'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Skill Matrix</span>
                </Link>
              </>
            )}
          </nav>

          {/* User Auth Buttons / Profile Menu */}
          <div className="hidden md:flex items-center space-x-5 pl-6 border-l border-white/10">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-xs font-semibold text-slate-200 hover:text-white px-3 py-2 transition-colors"
                >
                  Log in
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all flex items-center space-x-1.5"
                  >
                    <span>Sign up</span>
                  </Link>
                </motion.div>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-3 text-right focus:outline-none group p-1.5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div>
                    <p className="text-[10px] font-mono font-bold text-purple-400 uppercase">{user.role}</p>
                    <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center font-bold text-white shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                    {user.name.charAt(0)}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-[#0E1017] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 text-xs backdrop-blur-2xl"
                    >
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="font-bold text-white">{user.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                      </div>
                      {user.role === 'CANDIDATE' && (
                        <Link
                          to="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <UserIcon className="w-4 h-4 text-purple-400" />
                          <span>Profile & Resumes</span>
                        </Link>
                      )}
                      {user.role === 'ADMIN' && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-purple-400" />
                          <span>Admin Console</span>
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-2.5 text-rose-400 hover:bg-rose-500/10 transition-colors border-t border-white/10 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0D14] border-b border-white/10 px-6 py-6 space-y-4 text-sm"
          >
            {!user ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToSection('#features');
                  }}
                  className="block w-full text-left font-medium text-slate-300 hover:text-white py-1"
                >
                  Features
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToSection('#how-it-works');
                  }}
                  className="block w-full text-left font-medium text-slate-300 hover:text-white py-1"
                >
                  How it Works
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToSection('#pricing');
                  }}
                  className="block w-full text-left font-medium text-slate-300 hover:text-white py-1"
                >
                  Pricing
                </button>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-medium text-slate-300 hover:text-white py-1"
                >
                  Architecture
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-medium text-slate-300 hover:text-white py-1"
                >
                  Contact
                </Link>
                <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl border border-white/20 font-semibold text-white bg-white/5"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white font-bold"
                  >
                    Sign up
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-medium text-slate-200 py-1"
                >
                  Dashboard
                </Link>
                <Link
                  to="/resume-analysis"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-medium text-slate-200 py-1"
                >
                  ATS Analyzer
                </Link>
                <Link
                  to="/interviews"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-medium text-slate-200 py-1"
                >
                  Mock Interviews
                </Link>
                <Link
                  to="/coding"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-medium text-slate-200 py-1"
                >
                  Coding Sandbox
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left font-medium text-rose-400 pt-2 border-t border-white/10"
                >
                  Log Out
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
