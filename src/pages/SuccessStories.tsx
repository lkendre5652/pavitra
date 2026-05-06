import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const STORIES = [
  {
    id: 1,
    couple: "Rajesh & Megha",
    date: "Dec 2024",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop",
    text: "Being from a Traditional family, we were looking for someone who shares our culture and values. PavitraVivah made it easy to connect with verified families."
  },
  {
    id: 2,
    couple: "Amit & Shalini",
    date: "Oct 2024",
    image: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?q=80&w=2070&auto=format&fit=crop",
    text: "The compatibility matching actually works! We found we had so much in common beyond just the horoscope."
  },
  {
    id: 3,
    couple: "Sanjay & Pooja",
    date: "Jan 2025",
    image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=2072&auto=format&fit=crop",
    text: "We used the Personalised Pro plan. The RM staff was very helpful in finding the right matches for us."
  }
];

export function SuccessStories() {
  return (
    <div className="bg-brand-dark min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-10" />
          <h1 className="font-serif text-6xl md:text-8xl gold-gradient-text uppercase leading-none mb-6">Success Stories</h1>
          <p className="text-text-muted max-w-xl mx-auto uppercase tracking-[0.2em] text-[10px] font-bold border-t border-gold/20 pt-6 inline-block">Join the legacy of unions since 1983</p>
        </header>

        <div className="space-y-40">
          {STORIES.map((story, i) => (
            <motion.div 
              key={story.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row items-center gap-16 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="lg:w-1/2 aspect-[4/3] rounded-sm overflow-hidden shadow-2xl relative glass p-1">
                <div className="w-full h-full rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                  <img src={story.image} alt={story.couple} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
              </div>
              
              <div className="lg:w-1/2 space-y-10">
                <div className="gold-bg w-12 h-12 flex items-center justify-center rounded-sm rotate-45">
                   <Quote className="text-black h-6 w-6 -rotate-45" />
                </div>
                <div className="space-y-4">
                  <h2 className="font-serif text-5xl text-white">{story.couple}</h2>
                  <div className="h-1 w-20 gold-bg" />
                </div>
                <p className="text-2xl text-text-muted leading-relaxed italic font-light">"{story.text}"</p>
                <div className="pt-10 border-t border-white/5 flex items-center justify-between">
                   <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Union Date: {story.date}</span>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] uppercase tracking-widest text-text-muted">Verified Success</span>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
