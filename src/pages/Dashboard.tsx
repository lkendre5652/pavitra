import { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { User, Heart, Search, Eye, Bell, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profileDoc = await getDoc(doc(db, 'profiles', user.uid));
        if (profileDoc.exists()) {
          setProfile(profileDoc.data());
          // Fetch some matches (simplified)
          const q = query(collection(db, 'profiles'), where('gender', '!=', profileDoc.data().gender || 'none'));
          const snapshot = await getDocs(q);
          setMatches(snapshot.docs.map(d => ({ id: d.id, ...d.data() })).slice(0, 6));
        }
        setLoading(false);
      } else {
        navigate('/login');
      }
    });
    return unsubscribe;
  }, [navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-warm-bg text-brand">
       <span className="font-serif text-2xl animate-pulse">Entering PavitraVivah...</span>
    </div>
  );

  return (
    <div className="bg-brand-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:flex gap-12">
        {/* Sidebar Profile Summary */}
        <aside className="lg:w-1/4 space-y-6">
          <div className="glass rounded-sm p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full -mr-12 -mt-12 blur-2xl" />
            
            <div className="relative mx-auto w-24 h-24 mb-6">
               <div className="w-full h-full rounded-full flex items-center justify-center border border-gold/30 p-1">
                  <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                    {profile?.photos?.[0] ? (
                       <img src={profile.photos[0]} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                       <User className="text-gold w-10 h-10" />
                    )}
                  </div>
               </div>
               <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-[#0c0c0e] shadow-lg" />
            </div>

            <h3 className="font-serif text-2xl font-bold gold-gradient-text text-center">{profile?.fullName}</h3>
            <p className="text-text-muted text-center text-[10px] uppercase tracking-widest mt-1 mb-6">{profile?.profileId || 'PV-9201'}</p>
            
            <div className="space-y-4">
               <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                  <span className="text-text-muted">Profile Reliability</span>
                  <span className="text-gold">{profile?.completeness || 72}%</span>
               </div>
               <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${profile?.completeness || 72}%` }}
                    className="bg-gold h-full shadow-[0_0_10px_#d4af37]" 
                  />
               </div>
            </div>

            <button 
              onClick={() => navigate('/profile/edit')}
              className="w-full mt-10 py-4 border border-gold/20 text-gold hover:bg-gold hover:text-brand-dark rounded-sm font-bold text-[10px] uppercase tracking-widest transition-all"
            >
              Update Credentials
            </button>
          </div>

          <div className="glass rounded-sm p-8 border border-gold/10">
             <h4 className="font-serif text-xl gold-text mb-4 italic">RM Concierge</h4>
             <p className="text-text-muted text-xs mb-6 leading-relaxed">Personalized Pro access active. Your Relationship Manager (RM) is identifying verified leads.</p>
             <div className="bg-white/5 p-4 border border-white/5 rounded-sm italic text-[11px] opacity-60">
                "Profile PV-1102 suggested for initial screening..."
             </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:w-3/4 space-y-10 mt-8 lg:mt-0">
          {/* Metric Grid from Design */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass p-5 rounded-sm stat-card">
              <p className="text-[10px] text-text-muted uppercase tracking-widest">Total Match Pool</p>
              <h3 className="text-2xl font-serif mt-1">24,102</h3>
              <p className="text-[10px] text-green-500 mt-2">+12% growth</p>
            </div>
            <div className="glass p-5 rounded-sm stat-card">
              <p className="text-[10px] text-text-muted uppercase tracking-widest">Interests Sent</p>
              <h3 className="text-2xl font-serif mt-1">48</h3>
              <p className="text-[10px] gold-text mt-2">Active Engagement</p>
            </div>
            <div className="glass p-5 rounded-sm stat-card">
              <p className="text-[10px] text-text-muted uppercase tracking-widest">Pending Verification</p>
              <h3 className="text-2xl font-serif mt-1">8</h3>
              <p className="text-[10px] text-orange-400 mt-2">Document Audit</p>
            </div>
            <div className="glass p-5 rounded-sm stat-card">
              <p className="text-[10px] text-text-muted uppercase tracking-widest">Success Rate</p>
              <h3 className="text-2xl font-serif mt-1">1:40</h3>
              <p className="text-[10px] opacity-40 mt-2">Industry Leading</p>
            </div>
          </div>

          <section>
            <div className="flex justify-between items-end mb-10 pb-4 border-b border-white/5">
               <h2 className="font-serif text-3xl gold-gradient-text uppercase">Curated Matches</h2>
               <div className="flex gap-4">
                  <span className="text-[10px] gold-text border border-gold px-3 py-1 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={12}/> Verified Only
                  </span>
                  <Link to="/matches" className="text-text-muted font-bold text-[10px] uppercase tracking-widest hover:text-gold">Browse All</Link>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
               {matches.length > 0 ? matches.map((match) => (
                  <motion.div 
                     key={match.id}
                     whileHover={{ y: -5 }}
                     className="glass rounded-sm p-4 hover:border-gold/30 transition-all flex flex-col items-center text-center relative group"
                  >
                     <div className="absolute top-4 right-4 bg-white/5 p-2 rounded-full cursor-pointer hover:bg-gold transition-all text-gold hover:text-black">
                        <Heart size={16} />
                     </div>
                     <div className="w-24 h-24 rounded-full bg-gray-800 mb-6 p-1 border border-white/5 group-hover:border-gold/40 transition-colors">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          {match.photos?.[0] ? (
                             <img src={match.photos[0]} alt="Match" className="w-full h-full object-cover" />
                          ) : (
                             <User className="text-white/10 w-full h-full p-4" />
                          )}
                        </div>
                     </div>
                     <h4 className="font-serif text-xl font-bold text-white mb-1">{match.fullName}</h4>
                     <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] mb-4">{match.age} Yrs • {match.city || 'Mumbai'}</p>
                     
                     <div className="w-full grid grid-cols-2 gap-2 mb-8">
                        <div className="bg-white/5 p-2 border border-white/5 text-[9px] uppercase tracking-tighter text-text-muted">{match.occupation || 'Engineer'}</div>
                        <div className="bg-white/5 p-2 border border-white/5 text-[9px] uppercase tracking-tighter text-text-muted">{match.caste || 'Marathi'}</div>
                     </div>
                     
                     <button className="w-full py-4 gold-bg text-black font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-gold/10 hover:brightness-110 transition-all">
                        View Dossier
                     </button>
                  </motion.div>
               )) : (
                  <div className="col-span-full py-32 text-center text-text-muted glass rounded-sm border-dashed border-white/10">
                     <p className="font-serif text-xl italic opacity-40">Identifying compatible profiles through AI and RM staff...</p>
                  </div>
               )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
