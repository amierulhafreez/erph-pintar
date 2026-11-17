import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.tsx';
import { LandingPortal } from './pages/LandingPortal.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      {/* Landing Portal for all subjects */}
      <Route path="/" element={<LandingPortal />} />

      {/* Dynamic subject routes: /kimia, /biologi, /fizik, /sains, /matematik, /matematik-tambahan */}
      <Route path="/:subjectParam" element={<App />} />

      {/* Catch-all redirect to portal */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
