import { useState, type FormEvent } from 'react';
import { LogIn, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './admin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError('Correo o contraseña incorrectos.');
  };

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={handleSubmit}>
        <img src="/logo.png" alt="" className="admin-login__logo" />
        <h1 className="admin-login__title">Panel de la Parroquia</h1>
        <p className="admin-login__subtitle">Inicia sesión para administrar el contenido del sitio</p>

        {error && (
          <div className="admin-login__error">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <label className="admin-field">
          <span>Correo electrónico</span>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
        </label>

        <label className="admin-field">
          <span>Contraseña</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
          />
        </label>

        <button type="submit" className="btn-primary admin-login__submit" disabled={loading}>
          {loading ? <Loader2 size={16} className="admin-spin" /> : <LogIn size={16} />}
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
