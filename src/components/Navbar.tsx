import { Link } from 'react-router-dom';
import { Heart, Search, User, Menu } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav class="h-20 w-full glass border-b border-white/10 flex items-center justify-between px-4 sm:px-10 flex-shrink-0 sticky top-0 z-50">
      <div class="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 bg-gold flex items-center justify-center rounded-sm rotate-45 group-hover:scale-110 transition-transform">
            <span className="text-black font-bold -rotate-45 serif text-xl">P</span>
          </div>
          <div>
            <h1 className="serif text-2xl tracking-widest font-bold gold-gradient-text uppercase leading-none">Pavitra Vivah</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted">Marathi Matrimonial Services</p>
          </div>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-bold">
        <Link to="/search" className="text-text-muted hover:text-gold transition-colors">Search</Link>
        <Link to="/success-stories" className="text-text-muted hover:text-gold transition-colors">Stories</Link>
        <Link to="/register" className="text-gold border border-gold/30 px-5 py-2 rounded-sm hover:bg-gold hover:text-black transition-all">Register</Link>
        <Link to="/login" className="text-text-main opacity-60 hover:opacity-100 transition-opacity">Login</Link>
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gold">
          <Menu />
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-brand-dark border-b border-white/10 p-6 space-y-4 animate-in slide-in-from-top duration-300 md:hidden">
          <Link to="/search" className="block text-text-muted hover:text-gold">Search</Link>
          <Link to="/register" className="block text-gold">Register</Link>
          <Link to="/login" className="block text-text-main">Login</Link>
        </div>
      )}
    </nav>
  );
}
