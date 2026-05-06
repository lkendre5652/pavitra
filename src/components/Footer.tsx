import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Heart className="h-6 w-6 text-brand fill-brand" />
              <span className="font-serif text-xl font-bold text-brand leading-none">PavitraVivah</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Matching compatibility with tradition since 1983. Founded by Mrs. Kulkarni.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-brand mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/about" className="hover:text-brand">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand">Contact Us</Link></li>
              <li><Link to="/blogs" className="hover:text-brand">Blogs</Link></li>
              <li><Link to="/stories" className="hover:text-brand">Success Stories</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-brand mb-4">Policies</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/terms" className="hover:text-brand">Terms of Use</Link></li>
              <li><Link to="/privacy" className="hover:text-brand">Privacy Policy</Link></li>
              <li><Link to="/support" className="hover:text-brand">Customer Support</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold text-brand mb-4">Contact</h4>
             <p className="text-sm text-gray-500 leading-6">
                PavitraVivah.com Headquarters<br />
                Mumbai, Maharashtra, India<br />
                Email: support@pavitravivah.com
             </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© 2026 PavitraVivah.com. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0 italic">Traditional values, modern reach.</p>
        </div>
      </div>
    </footer>
  );
}
