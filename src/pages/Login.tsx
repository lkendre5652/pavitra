import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Heart, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-brand-dark">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass rounded-sm shadow-2xl p-10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-3xl -mr-12 -mt-12" />
        
        <div className="text-center mb-10">
          <div className="w-12 h-12 gold-bg rounded-sm flex items-center justify-center mx-auto mb-6 rotate-45 transition-transform hover:rotate-[225deg] duration-700">
            <Heart className="text-black h-6 w-6 -rotate-45" />
          </div>
          <h2 className="font-serif text-3xl font-bold gold-gradient-text uppercase tracking-widest">Portal Access</h2>
          <p className="text-text-muted mt-2 text-[10px] uppercase tracking-widest font-bold">Marathi Matrimony • Est. 1983</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-sm mb-6 text-xs font-bold uppercase tracking-widest">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold ml-1">Email Dossier</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-sm p-4 text-white focus:border-gold/30 outline-none transition-all font-serif"
              placeholder="rahul@domain.com"
            />
          </div>
          
          <div className="space-y-2">
             <div className="flex justify-between items-center px-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold ml-1">Secure Key</label>
                <Link to="/forgot-password" size="sm" className="text-[10px] uppercase tracking-widest font-bold text-text-muted hover:text-gold">Forgot Key?</Link>
             </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-sm p-4 text-white focus:border-gold/30 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full gold-bg text-black font-bold py-4 rounded-sm shadow-xl shadow-gold/10 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center uppercase tracking-[0.3em] text-xs"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : 'Enter Portal'}
          </button>
        </form>

        <div className="mt-10 text-center pt-8 border-t border-white/5">
          <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-bold">
            New Petitioner? <Link to="/register" className="text-gold hover:underline">Register Free</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
