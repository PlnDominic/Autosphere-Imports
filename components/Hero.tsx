export default function Hero() {
  return (
    <section id="top">
      <div id="hero">
        <div className="hero-lanes" aria-hidden="true">
          <span></span>
          <span></span>
        </div>
        <div className="hero-overlay" aria-hidden="true"></div>
        <div className="hero-car" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/2019 Hyundai Tucson.jpg" alt="" />
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow">Direct vehicle imports &middot; Ghana</p>
          <h1 className="hero-h1">We drive the world to your doorstep.</h1>
          <div className="hero-actions">
            <a href="#inventory" className="btn-primary">
              Browse the lineup
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="#how" className="btn-ghost">
              See how it works
            </a>
          </div>
          <div className="hero-chips">
            <span>DDP &amp; CIF plans</span>
            <span>Tema Port clearance</span>
            <span>Deposit secures your car</span>
            <span>Limited promo slots</span>
          </div>
        </div>
      </div>
    </section>
  );
}
