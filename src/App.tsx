import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';

// Eager: the landing route, so first paint isn't gated on a chunk fetch.
import { Home } from './pages/Home';

// Lazy: every other route is split into its own chunk.
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Team = lazy(() => import('./pages/Team').then((m) => ({ default: m.Team })));
const CIServices = lazy(() => import('./pages/services/CIServices').then((m) => ({ default: m.CIServices })));
const GridServices = lazy(() => import('./pages/services/GridServices').then((m) => ({ default: m.GridServices })));
const Projects = lazy(() => import('./pages/Projects').then((m) => ({ default: m.Projects })));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail').then((m) => ({ default: m.ProjectDetail })));
const News = lazy(() => import('./pages/News').then((m) => ({ default: m.News })));
const NewsArticle = lazy(() => import('./pages/NewsArticle').then((m) => ({ default: m.NewsArticle })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const Jobs = lazy(() => import('./pages/Jobs').then((m) => ({ default: m.Jobs })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const HsesPolicyPage = lazy(() => import('./pages/HsesPolicyPage').then((m) => ({ default: m.HsesPolicyPage })));
const FormPage = lazy(() => import('./pages/FormPage').then((m) => ({ default: m.FormPage })));

const RouteFallback = () => (
  <div
    style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    aria-busy="true"
    aria-live="polite"
  >
    <span className="route-spinner" aria-label="Loading" />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <ErrorBoundary>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/team" element={<Team />} />

              {/* Services routes: /services redirects to C&I */}
              <Route path="/services" element={<Navigate to="/services/c-i" replace />} />
              <Route path="/services/c-i" element={<CIServices />} />
              <Route path="/services/mini-grids" element={<GridServices />} />

              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />

              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsArticle />} />

              <Route path="/jobs" element={<Jobs />} />

              <Route path="/contact" element={<Contact />} />
              <Route path="/hses-policy" element={<HsesPolicyPage />} />
              <Route path="/forms/:formId" element={<FormPage />} />
              <Route path="/admin" element={<AdminDashboard />} />

              {/* Catch-all: real 404 page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
