export default function Contact() {
  return (
    <section id="contact">
      <div className="contact-inner reveal">
        <div>
          <p className="contact-eyebrow">Ready to import?</p>
          <h2 className="contact-h2">Let&apos;s get your car moving.</h2>
          <p className="contact-lead">
            Message us on WhatsApp to reserve, or call to talk through DDP and CIF options.
          </p>
        </div>
        <div className="contact-links">
          <a href="https://wa.me/233537633242" target="_blank" rel="noopener" className="contact-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.76.46 3.45 1.34 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.08c-.25.69-1.45 1.32-1.99 1.36-.51.04-1.16.21-3.78-.79-3.18-1.25-5.2-4.5-5.36-4.71-.16-.21-1.28-1.7-1.28-3.24 0-1.54.81-2.3 1.09-2.61.28-.31.61-.39.81-.39.2 0 .41 0 .59.01.19.01.44-.07.69.53.25.59.85 2.05.93 2.2.07.15.12.32.02.53-.1.21-.15.32-.3.5-.15.18-.31.39-.45.53-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.45.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.65-.15.26.1 1.66.78 1.95.93.29.15.48.21.55.33.07.12.07.71-.18 1.4Z" />
            </svg>
            <div className="contact-link-text">
              <span className="contact-link-label">WhatsApp only</span>
              <span className="contact-link-number">+233 537 633 242</span>
            </div>
          </a>
          <a href="tel:+233247620520" className="contact-link">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9fc0ff"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            <div className="contact-link-text">
              <span className="contact-link-label">Calls only</span>
              <span className="contact-link-number">+233 247 620 520</span>
              <span className="contact-link-alt">+86 182 1157 5541</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
