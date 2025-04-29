import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-sky-50 to-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
                ThoraxIQ
              </span>
            </Link>
            <p className="text-gray-600 max-w-lg leading-relaxed">
              Revolutionizing chest X-ray diagnosis with AI-powered analysis for faster, 
              more accurate healthcare outcomes. Combining early detection with 
              affordable pricing and expert-guided support.
            </p>
            <div className="flex space-x-5">
              {[
                { 
                  name: 'Twitter',
                  icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84'
                },
                {
                  name: 'LinkedIn',
                  icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
                },
                {
                  name: 'Facebook',
                  icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                }
              ].map((social) => (
                <a 
                  key={social.name}
                  href="#" 
                  className="text-sky-600 hover:text-sky-700 transition-colors"
                  aria-label={social.name}
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Resources Column */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-sky-800">Resources</h3>
            <ul className="space-y-3">
              {[
                { path: "/help", label: "Help Center" },
                { path: "/faq", label: "FAQ" },
                { path: "/blog", label: "Blog" },
                { path: "/contact", label: "Contact Support" }
              ].map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="text-gray-600 hover:text-sky-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-sky-800">Legal</h3>
            <ul className="space-y-3">
              {[
                { path: "/terms", label: "Terms of Use" },
                { path: "/privacy", label: "Privacy Policy" },
                { path: "/compliance", label: "HIPAA Compliance" },
                { path: "/security", label: "Security" }
              ].map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="text-gray-600 hover:text-sky-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} ThoraxIQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
