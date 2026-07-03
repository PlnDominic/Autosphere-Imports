export default function Pricing() {
  return (
    <section id="pricing">
      <div className="pricing-lanes" aria-hidden="true">
        <span></span>
        <span></span>
      </div>

      <div className="pricing-inner reveal">
        <div>
          <p className="pricing-eyebrow">Featured promo &middot; Limited slots</p>
          <h2 className="pricing-h2">Toyota Yaris L &middot; 2016</h2>
          <p className="pricing-lead">
            Choose the plan that suits you. A GHC 50,000 deposit secures your Yaris L, pay the
            balance on the terms below.
          </p>

          <div className="pricing-plans">
            <div className="plan-card">
              <div className="plan-header">
                <span className="plan-type">DDP</span>
                <span className="plan-subtitle">Delivered Duty Paid</span>
              </div>
              <div className="plan-price">GHC 135,000</div>
              <div className="plan-rows">
                <div className="plan-row bordered">
                  <span className="plan-label">Deposit</span>
                  <span className="plan-value">GHC 50,000</span>
                </div>
                <div className="plan-row">
                  <span className="plan-label">Balance</span>
                  <span className="plan-value">GHC 85,000</span>
                </div>
                <span className="plan-note">Due 2 weeks after customs clearance</span>
              </div>
            </div>
            <div className="plan-card">
              <div className="plan-header">
                <span className="plan-type">CIF</span>
                <span className="plan-subtitle">To Tema Port</span>
              </div>
              <div className="plan-price">GHC 84,000</div>
              <div className="plan-rows">
                <div className="plan-row bordered">
                  <span className="plan-label">Deposit</span>
                  <span className="plan-value">GHC 50,000</span>
                </div>
                <div className="plan-row">
                  <span className="plan-label">Balance</span>
                  <span className="plan-value">GHC 34,000</span>
                </div>
                <span className="plan-note">Due when the car arrives at port</span>
              </div>
            </div>
          </div>

          <div className="pricing-warning">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffce3a"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flex: 'none', marginTop: '1px' }}
              aria-hidden="true"
            >
              <path d="M12 9v4M12 17h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0Z" />
            </svg>
            <p>
              <strong style={{ color: '#fff' }}>Important:</strong> miss the final payment and
              you lose the car, but you get back{' '}
              <strong style={{ color: '#ffce3a' }}>80% of your deposit (GHC 40,000)</strong>.
            </p>
          </div>

          <a
            href="https://wa.me/233537633242?text=I'm%20interested%20in%20the%20Yaris%20L%202016%20promo"
            target="_blank"
            rel="noopener"
            className="pricing-cta"
          >
            Reserve this Yaris
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
        </div>

        <div className="car-visual">
          <div className="car-glow" aria-hidden="true"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/yaris-render.png"
            alt="Toyota Yaris L 2016, top-down view"
            className="car-img"
          />
        </div>
      </div>

      <div className="trust-chips reveal">
        <div className="trust-chip">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9fc0ff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span>Deposit secures your car</span>
        </div>
        <div className="trust-chip">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9fc0ff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3v18M3 7h18M6 7l-3 6a3 3 0 0 0 6 0L6 7Zm12 0-3 6a3 3 0 0 0 6 0l-3-6Z" />
          </svg>
          <span>Transparent &amp; fair terms</span>
        </div>
        <div className="trust-chip">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9fc0ff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="13" r="8" />
            <path d="M12 9v4l2 2M9 2h6" />
          </svg>
          <span>Limited promo slots</span>
        </div>
      </div>
    </section>
  );
}
