import { NavLink, Outlet } from 'react-router-dom';
import { CalendarDays, LogOut, ExternalLink, Loader2 } from 'lucide-react';
import { useAuth } from './useAuth';
import { supabase } from '../lib/supabase';
import AdminLogin from './AdminLogin';
import './admin.css';

// Navegación del panel. Cada módulo nuevo (Evangelio, Galería…) se agrega
// aquí como una entrada más — el layout y el guard de sesión no cambian.
const NAV = [
  { to: '/admin/eventos', label: 'Eventos', icon: CalendarDays },
];

export default function AdminLayout() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="admin-loading">
        <Loader2 size={28} className="admin-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <img src="/logo.png" alt="" className="admin-sidebar__logo" />
          <span>Panel Parroquial</span>
        </div>

        <nav className="admin-sidebar__nav">
          {NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
            >
              <item.icon size={18} /> {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-sidebar__link">
            <ExternalLink size={18} /> Ver el sitio
          </a>
          <button className="admin-sidebar__link admin-sidebar__logout" onClick={() => supabase.auth.signOut()}>
            <LogOut size={18} /> Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
