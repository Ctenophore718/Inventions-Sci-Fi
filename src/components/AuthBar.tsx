import React from 'react';
import { supabase } from '../lib/supabaseClient';
import { migrateLocalSheetsToServerIfEmpty } from '../utils/storage';

const AuthBar: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userEmail, setUserEmail] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event: any, session: any) => {
      setUserEmail(session?.user?.email ?? null);
      if (session?.user) {
        try { await migrateLocalSheetsToServerIfEmpty(); } catch (e) { console.error(e); }
      }
      window.dispatchEvent(new Event('character-updated'));
    });
    return () => { sub.subscription.unsubscribe(); };
  }, []);

  const signIn = async () => {
    setError(null); setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
  };

  const signUp = async () => {
    setError(null); setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) setError(error.message);
  };

  const signOut = async () => {
    setError(null); setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    if (error) setError(error.message);
  };

  if (userEmail) {
    return (
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
        <span>Signed in as {userEmail}</span>
        <button onClick={signOut} disabled={loading}>Sign out</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '4px 8px' }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '4px 8px' }}
      />
      <button onClick={signIn} disabled={loading}>Sign in</button>
      <button onClick={signUp} disabled={loading}>Sign up</button>
      {error && <span style={{ color: 'crimson' }}>{error}</span>}
    </div>
  );
};

export default AuthBar;
