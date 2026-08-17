export default function SiteFooter() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span className="footer-logo-name">AUTOSPHERE</span>
            <span className="footer-logo-tag">IMPORTS &middot; DRIVING THE WORLD TO YOU</span>
          </div>
          <p className="footer-desc">
            Direct vehicle imports to Ghana with transparent DDP &amp; CIF plans and clearance at
            Tema Port.
          </p>
        </div>
        <div className="footer-cols">
          <div className="footer-col">
            <h4>Explore</h4>
            <div className="footer-col-links">
              <a href="#inventory">Inventory</a>
              <a href="#how">How it works</a>
              <a href="#pricing">Pricing</a>
              <a href="#estimator">Cost estimator</a>
              <a href="#request">Request a car</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-col-links">
              <a href="https://wa.me/233537633242" target="_blank" rel="noopener">
                WhatsApp &middot; +233 537 633 242
              </a>
              <a href="tel:+233247620520">Call &middot; +233 247 620 520</a>
              <a href="tel:+8618211575541">Call &middot; +86 182 1157 5541</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Follow</h4>
            <div className="social-links">
              <a
                href="https://facebook.com/Autosphereimports"
                target="_blank"
                rel="noopener"
                className="social-link"
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1Z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@Autosphereimports"
                target="_blank"
                rel="noopener"
                className="social-link"
                aria-label="YouTube"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.4 12 31 31 0 0 0 23 7.5ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/autosphere_imports"
                target="_blank"
                rel="noopener"
                className="social-link"
                aria-label="Instagram"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://x.com/InfoAutosphere"
                target="_blank"
                rel="noopener"
                className="social-link"
                aria-label="X (Twitter)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.2 2H21l-6.5 7.4L22 22h-6.3l-4.9-6.4L5.1 22H2.3l7-8L2 2h6.4l4.4 5.9L18.2 2Zm-1.1 18h1.6L7 3.8H5.3L17.1 20Z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@autosphere_imports"
                target="_blank"
                rel="noopener"
                className="social-link"
                aria-label="TikTok"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.5 2c.3 2.2 1.6 3.7 3.7 3.9v2.5c-1.3.1-2.5-.3-3.7-1v6.8c0 3.6-2.7 6-5.9 5.7-3-.3-5-2.9-4.5-6 .4-2.5 2.6-4.2 5.2-4v2.7c-.5-.1-1-.1-1.5.1-1 .3-1.6 1.2-1.4 2.3.2 1 1.1 1.7 2.2 1.5 1-.2 1.6-1 1.6-2.1V2h2.5Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2026 Autosphere Imports. All rights reserved.</span>
        <span>
          Tema Port &middot; Ghana &middot; <a href="/admin">Admin</a>
        </span>
      </div>
    </footer>
  );
}
