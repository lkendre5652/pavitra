import { motion } from 'motion/react';
import { Search, ShieldCheck, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="flex flex-col bg-brand-dark min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center overflow-hidden">
        {/* Background Overlay with Gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?q=80&w=2070&auto=format&fit=crop" 
            alt="Marathi Tradition"
            className="w-full h-full object-cover grayscale opacity-20 ml-[10%]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="font-serif text-6xl md:text-8xl leading-[1.1] mb-8">
              <span className="gold-gradient-text uppercase tracking-tighter">Legacy</span> <br />
              <span className="italic font-light text-white/90">Of Unions</span>
            </h1>
            <p className="text-text-muted text-lg mb-10 max-w-lg leading-relaxed border-l border-gold/30 pl-6">
              Est. 1983. Founded by Mrs. Kulkarni. 
              Connecting compatible life partners within the Marathi community for over four decades.
            </p>

            {/* Quick Search Preview - Dark Glass */}
            <div className="glass p-6 rounded-sm shadow-2xl flex flex-col md:flex-row gap-6 items-center">
              <div className="flex flex-col w-full px-4 border-r border-white/5 last:border-0">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-2">Looking for</label>
                <select className="bg-transparent font-serif text-xl focus:outline-none appearance-none">
                  <option className="bg-brand-dark">A Suitable Bride</option>
                  <option className="bg-brand-dark">A Suitable Groom</option>
                </select>
              </div>
              <div className="flex flex-col w-full px-4 border-r border-white/5 last:border-0">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-2">Age Bracket</label>
                <div className="flex items-center gap-1">
                  <span className="font-serif text-xl tracking-widest">24 — 32</span>
                </div>
              </div>
              <button className="bg-gold text-black px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-3">
                <Search size={18} /> Explore
              </button>
            </div>
            
            <div className="mt-12 flex items-center space-x-8 opacity-40 uppercase tracking-[0.2em] text-[10px] font-bold">
               <div className="flex items-center space-x-2">
                  <ShieldCheck size={14} className="text-gold" />
                  <span>Verified Identity</span>
               </div>
               <div className="flex items-center space-x-2">
                  <Users size={14} className="text-gold" />
                  <span>100K+ Success Stories</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section inspired by Dashboard style */}
      <section className="py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
           <div className="stat-card">
              <p className="text-[10px] uppercase tracking-widest text-text-muted mb-1">Active Profiles</p>
              <h3 className="text-4xl font-serif text-white">24,102</h3>
           </div>
           <div className="stat-card">
              <p className="text-[10px] uppercase tracking-widest text-text-muted mb-1">Verified Users</p>
              <h3 className="text-4xl font-serif text-white">18,940</h3>
           </div>
           <div className="stat-card">
              <p className="text-[10px] uppercase tracking-widest text-text-muted mb-1">Member Growth</p>
              <h3 className="text-4xl font-serif text-gold">+12%</h3>
           </div>
           <div className="stat-card">
              <p className="text-[10px] uppercase tracking-widest text-text-muted mb-1">Legacy Years</p>
              <h3 className="text-4xl font-serif text-white">43+</h3>
           </div>
        </div>
      </section>
    </div>
  );
}
