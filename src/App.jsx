import { useState, useEffect, lazy, Suspense } from 'react';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { ToastProvider } from './components/ui/Toast';
import { trackEvent } from './utils/api';

// Code-splitting por ruta: cada página se descarga solo cuando se visita.
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CotizadorPage = lazy(() => import('./pages/CotizadorPage'));
const LogisticaPage = lazy(() => import('./pages/LogisticaPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-p3-red border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function AdminGuard({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-p3-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando sesión...</p>
        </div>
      </div>
    );
  }
  if (!user || user.rol !== 'admin') {
    window.location.href = '/dashboard';
    return null;
  }
  return children;
}

function App() {
  const [route] = useState(window.location.pathname || '/');

  useEffect(() => {
    trackEvent('page_view', { path: window.location.pathname, app: 'plataforma' });
  }, [route]);

  const segments = (window.location.pathname || '/').split('/').filter(Boolean);
  const section = segments[0] || 'dashboard';

  let content;
  if (section === 'login') {
    content = <LoginPage />;
  } else if (section === 'cotizador') {
    content = (
      <ProtectedRoute>
        <CotizadorPage />
      </ProtectedRoute>
    );
  } else if (section === 'logistica') {
    content = (
      <ProtectedRoute>
        <LogisticaPage />
      </ProtectedRoute>
    );
  } else if (section === 'admin') {
    content = (
      <ProtectedRoute>
        <AdminGuard>
          <AdminPage />
        </AdminGuard>
      </ProtectedRoute>
    );
  } else {
    // '/' y cualquier ruta desconocida caen al dashboard;
    // ProtectedRoute muestra el login si no hay sesión.
    content = (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-white">
        <main>
          <Suspense fallback={<PageLoader />}>{content}</Suspense>
        </main>
      </div>
    </ToastProvider>
  );
}

export default App;
