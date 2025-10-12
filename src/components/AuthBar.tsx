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
    supabase.auth.getUser().then(({ data, error }) => {
      if (error) {
        console.error('AuthBar: Error getting user on mount:', error);
      }
      const email = data.user?.email ?? null;
      console.log('AuthBar: Initial user email:', email);
      setUserEmail(email);
    });
    
    const { data: sub } = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
      const email = session?.user?.email ?? null;
      console.log('AuthBar: Auth state changed, event:', event, 'user email:', email);
      setUserEmail(email);
      
      if (session?.user) {
        try { 
          console.log('AuthBar: User signed in, attempting migration');
          await migrateLocalSheetsToServerIfEmpty(); 
          console.log('AuthBar: Migration completed');
        } catch (e) { 
          console.error('AuthBar: Migration error:', e); 
        }
      }
      
      window.dispatchEvent(new Event('character-updated'));
    });
    return () => { sub.subscription.unsubscribe(); };
  }, []);

  const signIn = async () => {
    setError(null); setLoading(true);
    console.log('AuthBar: Attempting sign in for:', email);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      console.error('AuthBar: Sign in error:', error);
      setError(error.message);
    } else {
      console.log('AuthBar: Sign in successful');
    }
  };

  const signUp = async () => {
    setError(null); setLoading(true);
    console.log('AuthBar: Attempting sign up for:', email);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      console.error('AuthBar: Sign up error:', error);
      setError(error.message);
    } else {
      console.log('AuthBar: Sign up successful');
    }
  };

  const signOut = async () => {
    setError(null); setLoading(true);
    console.log('AuthBar: Attempting sign out');
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    if (error) {
      console.error('AuthBar: Sign out error:', error);
      setError(error.message);
    } else {
      console.log('AuthBar: Sign out successful');
    }
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
