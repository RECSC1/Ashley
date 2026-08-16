import { useEffect, useState } from 'react';
import { acceptInvite, handleAuthCallback, updateUser } from '@netlify/identity';

export default function IdentityCallback() {
  const [callback, setCallback] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    handleAuthCallback()
      .then((result) => {
        if (result?.type === 'invite' || result?.type === 'recovery') setCallback(result);
        if (result?.type === 'confirmation') setMessage('Your email is confirmed. You can now sign in at /admin.');
      })
      .catch(() => setMessage('This account link is invalid or has expired. Request a new email from the admin login screen.'));
  }, []);

  if (!callback && !message) return null;

  async function submit(event) {
    event.preventDefault();
    if (password.length < 8) return setMessage('Use a password with at least eight characters.');
    if (password !== confirmPassword) return setMessage('The passwords do not match.');
    setBusy(true);
    setMessage('');
    try {
      if (callback.type === 'invite') await acceptInvite(callback.token, password);
      else await updateUser({ password });
      window.location.assign('/admin');
    } catch {
      setMessage('The link could not be completed. Request a fresh invitation or password recovery email.');
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-navy/80 backdrop-blur-sm p-5 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Complete account setup">
      <div className="card max-w-md w-full">
        <p className="eyebrow mb-3">Ashley Smith Content Manager</p>
        {callback ? (
          <form onSubmit={submit}>
            <h1 className="font-serif text-3xl text-navy">{callback.type === 'invite' ? 'Create your password' : 'Reset your password'}</h1>
            <p className="text-navy/70 mt-2">Use this password with your invited email address at the private admin page.</p>
            <label className="label mt-5" htmlFor="identity-password">Password</label>
            <input id="identity-password" className="input" type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            <label className="label mt-4" htmlFor="identity-password-confirm">Confirm password</label>
            <input id="identity-password-confirm" className="input" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
            {message && <p className="text-sm text-red-700 mt-4">{message}</p>}
            <button className="btn btn-primary w-full mt-5" disabled={busy}>{busy ? 'Saving…' : 'Continue to Admin'}</button>
          </form>
        ) : (
          <div>
            <h1 className="font-serif text-3xl text-navy">Account update</h1>
            <p className="text-navy/70 mt-3">{message}</p>
            <a href="/admin" className="btn btn-primary mt-5">Open Admin</a>
          </div>
        )}
      </div>
    </div>
  );
}
