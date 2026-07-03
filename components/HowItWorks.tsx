export default function HowItWorks() {
  return (
    <section id="how">
      <div className="how-inner">
        <div className="reveal" style={{ maxWidth: '62ch' }}>
          <p className="section-eyebrow">How it works</p>
          <h2 className="section-h2">Deposit, shipping, delivery: three clear steps.</h2>
        </div>
        <div className="steps reveal">
          <div className="step">
            <span className="step-num">01</span>
            <h3 className="step-h3">Reserve with a deposit</h3>
            <p className="step-p">
              A GHC 50,000 deposit locks in your vehicle and price. Pick DDP or CIF, you choose
              how the balance is handled.
            </p>
          </div>
          <div className="step">
            <span className="step-num">02</span>
            <h3 className="step-h3">We ship &amp; clear</h3>
            <p className="step-p">
              Your car is shipped to Tema Port. With CIF we deliver to port; with DDP we also
              handle customs and duties end&#8209;to&#8209;end.
            </p>
          </div>
          <div className="step">
            <span className="step-num">03</span>
            <h3 className="step-h3">Balance &amp; handover</h3>
            <p className="step-p">
              Settle the balance (on arrival for CIF, or within two weeks of clearance for DDP)
              and take the keys.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
