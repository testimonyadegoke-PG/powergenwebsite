import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AlternateDesignExperience } from './pages/AlternateDesignExperience';
import { AdminDashboard } from './pages/admin/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<AlternateDesignExperience />} />
          <Route path="/about" element={<AlternateDesignExperience />} />
          
          {/* Services routes: /services redirects to C&I */}
          <Route path="/services" element={<Navigate to="/services/c-i" replace />} />
          <Route path="/services/c-i" element={<AlternateDesignExperience />} />
          <Route path="/services/mini-grids" element={<AlternateDesignExperience />} />
          
          <Route path="/projects" element={<AlternateDesignExperience />} />
          <Route path="/projects/:id" element={<AlternateDesignExperience />} />
          
          <Route path="/news" element={<AlternateDesignExperience />} />
          <Route path="/news/:id" element={<AlternateDesignExperience />} />

          <Route path="/jobs" element={<AlternateDesignExperience />} />
          
          <Route path="/contact" element={<AlternateDesignExperience />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
