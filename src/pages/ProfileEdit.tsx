import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { generateAboutMe } from '../services/geminiService';
import { Sparkles, Loader2, Save, ChevronRight, User, GraduationCap, Users, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INTERESTS_OPTIONS = ["Music", "Cooking", "Photography", "Traveling", "Reading", "Dancing", "Trekking", "Gardening", "Sports", "Nature"];
const NATURE_OPTIONS = ["Introvert", "Extrovert", "Caring", "Ambitious", "Calm", "Humorous", "Spiritual", "Traditional", "Modern"];

export function ProfileEdit() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const d = await getDoc(doc(db, 'profiles', user.uid));
        if (d.exists()) {
          setProfile(d.data());
        }
        setLoading(false);
      } else {
        navigate('/login');
      }
    });
    return unsub;
  }, [navigate]);

  const handleUpdate = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, 'profiles', auth.currentUser!.uid), profile);
      // Optional: notification of success
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateAbout = async () => {
    setGenerating(true);
    const text = await generateAboutMe(profile);
    if (text) {
      setProfile({ ...profile, aboutMe: text });
    }
    setGenerating(false);
  };

  const toggleList = (field: string, val: string) => {
    const current = profile[field] || [];
    if (current.includes(val)) {
      setProfile({ ...profile, [field]: current.filter((v: string) => v !== val) });
    } else {
      setProfile({ ...profile, [field]: [...current, val] });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="font-serif text-4xl text-brand mb-2">Complete Your Profile</h1>
        <p className="text-gray-500">The more details you provide, the better matches you get.</p>
      </div>

      <div className="flex gap-4 mb-8">
        {[
          { id: 1, label: 'Personal', icon: <User size={16}/> },
          { id: 2, label: 'Education', icon: <GraduationCap size={16}/> },
          { id: 3, label: 'Family', icon: <Users size={16}/> },
          { id: 4, label: 'Interests', icon: <Heart size={16}/> }
        ].map(s => (
          <button 
            key={s.id}
            onClick={() => setStep(s.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${step === s.id ? 'bg-brand text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100'}`}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      <motion.div 
        key={step}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-50"
      >
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Full Name</label>
              <input 
                value={profile.fullName || ''}
                onChange={e => setProfile({...profile, fullName: e.target.value})}
                className="w-full bg-gray-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand/10" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Current City</label>
              <input 
                value={profile.city || ''}
                onChange={e => setProfile({...profile, city: e.target.value})}
                className="w-full bg-gray-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand/10" 
              />
            </div>
            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Height</label>
               <input 
                 value={profile.height || ''}
                 placeholder="e.g. 5ft 8in"
                 onChange={e => setProfile({...profile, height: e.target.value})}
                 className="w-full bg-gray-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand/10" 
               />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-10">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2 block mb-4">Personal Interests</label>
              <div className="flex flex-wrap gap-3">
                {INTERESTS_OPTIONS.map(opt => (
                  <button 
                    key={opt}
                    onClick={() => toggleList('interests', opt)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${profile.interests?.includes(opt) ? 'bg-brand text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2 block mb-4">Human Nature Type</label>
              <div className="flex flex-wrap gap-3">
                {NATURE_OPTIONS.map(opt => (
                  <button 
                    key={opt}
                    onClick={() => toggleList('natureType', opt)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${profile.natureType?.includes(opt) ? 'bg-brand text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-50">
               <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">About Myself</label>
                  <button 
                    onClick={handleGenerateAbout}
                    disabled={generating}
                    className="flex items-center gap-2 text-brand text-xs font-bold bg-brand/5 px-4 py-2 rounded-full hover:bg-brand/10 transition-all disabled:opacity-50"
                  >
                    {generating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    AI Autofill (Marathi Style)
                  </button>
               </div>
               <textarea 
                 value={profile.aboutMe || ''}
                 onChange={e => setProfile({...profile, aboutMe: e.target.value})}
                 rows={6}
                 className="w-full bg-gray-50 rounded-[28px] p-6 outline-none focus:ring-2 focus:ring-brand/10 text-gray-700 leading-relaxed"
                 placeholder="Write about yourself or use AI to generate based on your info..."
               />
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-between items-center">
           <button 
             onClick={() => setStep(Math.max(1, step - 1))}
             className="text-gray-400 font-bold hover:text-brand transition-all"
           >
             Back
           </button>
           <div className="flex gap-4">
              <button 
                onClick={handleUpdate}
                disabled={saving}
                className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-brand text-brand rounded-2xl font-bold hover:bg-brand hover:text-white transition-all shadow-md"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                Save Draft
              </button>
              <button 
                onClick={() => step < 4 ? setStep(step + 1) : navigate('/dashboard')}
                className="flex items-center gap-2 px-8 py-4 bg-brand text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg"
              >
                {step === 4 ? 'Finish' : 'Next Step'} <ChevronRight size={18} />
              </button>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
