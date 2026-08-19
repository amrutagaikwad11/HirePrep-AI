import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CandidateDashboard } from './pages/CandidateDashboard';
import { ATSAnalyzerPage } from './pages/ATSAnalyzerPage';
import { InterviewGeneratorPage } from './pages/InterviewGeneratorPage';
import { InterviewSessionPage } from './pages/InterviewSessionPage';
import { InterviewsListPage } from './pages/InterviewsListPage';
import { CodingListPage } from './pages/CodingListPage';
import { CodingSessionPage } from './pages/CodingSessionPage';
import { PerformancePage } from './pages/PerformancePage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { AdminJobsPage } from './pages/AdminJobsPage';
import { AdminQuestionsPage } from './pages/AdminQuestionsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Protected Route for Candidates
const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Protected Route for Admins
const RequireAdmin = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user || user.role !== 'ADMIN') return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Candidate Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <CandidateDashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/resume-analysis"
                element={
                  <RequireAuth>
                    <ATSAnalyzerPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/interviews"
                element={
                  <RequireAuth>
                    <InterviewsListPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/interviews/create"
                element={
                  <RequireAuth>
                    <InterviewGeneratorPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/interviews/:id"
                element={
                  <RequireAuth>
                    <InterviewSessionPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/coding"
                element={
                  <RequireAuth>
                    <CodingListPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/coding/:id"
                element={
                  <RequireAuth>
                    <CodingSessionPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/performance"
                element={
                  <RequireAuth>
                    <PerformancePage />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <ProfilePage />
                  </RequireAuth>
                }
              />

              {/* Admin Protected Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <RequireAdmin>
                    <AdminDashboard />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <RequireAdmin>
                    <AdminUsersPage />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/jobs"
                element={
                  <RequireAdmin>
                    <AdminJobsPage />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/questions"
                element={
                  <RequireAdmin>
                    <AdminQuestionsPage />
                  </RequireAdmin>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
