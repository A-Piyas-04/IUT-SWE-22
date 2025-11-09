/**
 * Footer component
 * Simple, elegant footer with links and social icons.
 */
export default function Footer() {
  return (
    <footer className="bg-primary text-gray-200 mt-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-white transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-white transition-colors" href="#">Blog</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Help Center</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Connect</h4>
            <div className="flex items-center gap-3">
              <a className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-white/10 text-white hover:bg-white/20" href="#" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 5.9c-.8.4-1.6.7-2.5.8A4.2 4.2 0 0 0 21.4 4c-.8.5-1.7.9-2.6 1a4.2 4.2 0 0 0-7.2 3.8A11.9 11.9 0 0 1 3 4.7a4.2 4.2 0 0 0 1.3 5.7c-.7 0-1.3-.2-1.9-.5a4.2 4.2 0 0 0 3.4 4.1c-.6.2-1.2.2-1.8.1a4.2 4.2 0 0 0 3.9 2.9A8.5 8.5 0 0 1 2 19a12 12 0 0 0 6.5 1.9c7.8 0 12.1-6.4 12.1-11.9v-.5c.8-.5 1.5-1.2 2-2z"/>
                </svg>
              </a>
              <a className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-white/10 text-white hover:bg-white/20" href="#" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.12 1 2.5 1s2.48 1.1 2.48 2.5zM0 8h5v16H0V8zm7.5 0H12v2.2c.6-1.1 2.1-2.3 4.3-2.3 4.6 0 5.4 3 5.4 6.9V24h-5V16.8c0-1.8 0-4.1-2.5-4.1-2.5 0-2.9 2-2.9 4V24h-5V8z"/>
                </svg>
              </a>
              <a className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-white/10 text-white hover:bg-white/20" href="#" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.5-1.5-1.9-1.5-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 .7 2 .7 1.2 2 3.1 1.5 3.8 1.1.1-.9.5-1.5.9-1.9-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.6 11.6 0 0 1 6 0c2.2-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2.8.9 1.2 2 1.2 3.2 0 4.6-2.8 5.5-5.4 5.9.5.4 1 1.3 1 2.6v3.8c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 text-sm text-gray-300">© {new Date().getFullYear()} IUT SWE 22. All rights reserved.</div>
      </div>
    </footer>
  );
}