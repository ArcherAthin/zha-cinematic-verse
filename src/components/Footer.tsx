
import { Lock, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">ZHA PRODUCTIONS</h3>
            <p className="text-red-500 font-semibold tracking-wide">RAW. REAL. RELENTLESS.</p>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-4 w-4 text-red-500" />
              <span className="text-gray-300">info@zhaproductions.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-red-500" />
              <span className="text-gray-300">+1 (555) 123-4567</span>
            </div>
          </div>
          
          <div>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors uppercase tracking-wide">
                Home
              </Link>
              <Link to="/works" className="text-gray-300 hover:text-white transition-colors uppercase tracking-wide">
                Works
              </Link>
              <Link to="/services" className="text-gray-300 hover:text-white transition-colors uppercase tracking-wide">
                Services
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors uppercase tracking-wide">
                About
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors uppercase tracking-wide">
                Contact
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 flex justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 Zha Productions. All rights reserved.
          </p>
          <Link to="/admin" className="text-gray-600 hover:text-red-500 transition-colors">
            <Lock className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
