import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Heart, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    gender: 'female',
    mobile: '',
    profileFor: 'myself'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Create initial profile and user metadata
      await setDoc(doc(db, 'users', user.uid), {
        email: formData.email,
        role: 'user',
        mobile: formData.mobile,
        createdAt: new Date().toISOString()
      });

      await setDoc(doc(db, 'profiles', user.uid), {
        userId: user.uid,
        fullName: formData.fullName,
        gender: formData.gender,
        profileFor: formData.profileFor,
        isApproved: false,
        completeness: 10,
        createdAt: new Date().toISOString()
      });

      navigate('/profile/edit');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-brand-dark">
      {/* Left side: Visual Branding */}
      <div className="hidden lg:flex bg-[#0c0c0e] relative items-center justify-center p-20 overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069')] bg-cover opacity-10 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark via-brand-dark/80 to-transparent" />
        
        <div className="relative z-10 text-white max-w-lg">
           <div className="w-16 h-16 gold-bg rounded-sm flex items-center justify-center mb-10 rotate-45">
              <Heart className="h-8 w-8 text-black -rotate-45" />
           </div>
           <h1 className="font-serif text-6xl leading-[1.1] mb-10 gold-gradient-text uppercase">Begin Your <br />Beautiful <br />Legacy</h1>
           <p className="text-xl text-text-muted leading-relaxed italic border-l-2 border-gold pl-8">
              "Matching compatible life partners within the Marathi community since 1983."
           </p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex items-center justify-center p-8 lg:p-20 relative">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gold/5 rounded-full blur-[100px] -ml-16 -mt-16" />
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full glass p-8 sm:p-12 rounded-sm shadow-2xl"
        >
          <div className="mb-12 lg:text-left text-center">
            <h2 className="font-serif text-4xl font-bold gold-gradient-text uppercase tracking-widest leading-none mb-4">Register</h2>
            <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-bold">Traditional Marathi Matrimonyl • Est. 1983</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-sm mb-6 text-xs uppercase tracking-widest font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-1 col-span-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold ml-1">Full Legal Name</label>
                <input 
                  type="text" required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white focus:border-gold/40 outline-none transition-all font-serif"
                  placeholder="Name as per Aadhar"
                />
             </div>

             <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold ml-1">Identity</label>
                <select 
                   value={formData.gender}
                   onChange={(e) => setFormData({...formData, gender: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white focus:border-gold/40 outline-none transition-all appearance-none uppercase text-[10px] font-bold tracking-widest"
                >
                  <option value="female" className="bg-brand-dark">Bride</option>
                  <option value="male" className="bg-brand-dark">Groom</option>
                </select>
             </div>

             <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold ml-1">Filing For</label>
                <select 
                   value={formData.profileFor}
                   onChange={(e) => setFormData({...formData, profileFor: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white focus:border-gold/40 outline-none transition-all appearance-none uppercase text-[10px] font-bold tracking-widest"
                >
                  <option value="myself" className="bg-brand-dark">Self</option>
                  <option value="son" className="bg-brand-dark">Son</option>
                  <option value="daughter" className="bg-brand-dark">Daughter</option>
                  <option value="relative" className="bg-brand-dark">Relative</option>
                </select>
             </div>

             <div className="space-y-1 col-span-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold ml-1">Whatsapp Dossier</label>
                <input 
                  type="tel" required
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white focus:border-gold/40 outline-none transition-all"
                  placeholder="+91 Mobile Number"
                />
             </div>

             <div className="space-y-1 col-span-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold ml-1">Email Dossier</label>
                <input 
                  type="email" required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white focus:border-gold/40 outline-none transition-all"
                  placeholder="email@example.com"
                />
             </div>

             <div className="space-y-1 col-span-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold ml-1">Access Key</label>
                <input 
                  type="password" required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white focus:border-gold/40 outline-none transition-all"
                  placeholder="Minimum 6 characters"
                />
             </div>

             <button 
                disabled={loading}
                className="col-span-2 gold-bg text-black font-bold py-4 rounded-sm shadow-xl shadow-gold/20 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center mt-6 uppercase tracking-[0.3em] text-xs"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : 'Create Legacy Profile'}
              </button>
          </form>

          <p className="mt-10 text-center text-[10px] uppercase tracking-widest text-text-muted font-bold">
            Already registered? <Link to="/login" className="text-gold hover:underline">Log In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
