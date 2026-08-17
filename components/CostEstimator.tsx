'use client';

import { useMemo, useState } from 'react';

const WHATSAPP_NUMBER = '233537633242';

function formatGHC(n: number): string {
  if (!Number.isFinite(n)) return 'GHC 0';
  return 'GHC ' + Math.max(0, Math.round(n)).toLocaleString('en-US');
}

export default function CostEstimator() {
  const [price, setPrice] = useState('84000');
  const [shipping, setShipping] = useState('15000');
  const [dutyRate, setDutyRate] = useState('20');
  const [otherFees, setOtherFees] = useState('5000');

  const result = useMemo(() => {
    const p = Math.max(0, Number(price) || 0);
    const s = Math.max(0, Number(shipping) || 0);
    const rate = Math.max(0, Number(dutyRate) || 0);
    const fees = Math.max(0, Number(otherFees) || 0);
    const cif = p + s;
    const duty = cif * (rate / 100);
    const total = cif + duty + fees;
    return { cif, duty, fees, total };
  }, [price, shipping, dutyRate, otherFees]);

  function handleWhatsApp() {
    const lines = [
      'Import cost estimate — could you confirm the exact landed cost?',
      `Car price: ${formatGHC(Number(price) || 0)}`,
      `Shipping & freight: ${formatGHC(Number(shipping) || 0)}`,
      `Assumed duty rate: ${dutyRate || 0}%`,
      `Clearing & other fees: ${formatGHC(Number(otherFees) || 0)}`,
      `My rough estimate: ${formatGHC(result.total)}`,
    ];
    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener');
  }

  return (
    <section id="estimator" className="estimator">
      <div className="estimator-inner">
        <div className="estimator-copy reveal">
          <p className="section-eyebrow">Plan your budget</p>
          <h2 className="section-h2">Rough import cost estimator.</h2>
          <p className="request-lead">
            Adjust the numbers for a ballpark landed cost. This is a planning tool, not a quote
            &mdash; Ghana Revenue Authority sets duty from their own benchmark value for the
            model, which can differ from your purchase price. Confirm the exact figure with us
            before you commit.
          </p>
        </div>

        <div className="estimator-card reveal">
          <div className="request-grid">
            <div className="request-field">
              <label className="request-label" htmlFor="est-price">
                Car price (GHC)
              </label>
              <input
                id="est-price"
                className="request-input"
                type="number"
                min="0"
                inputMode="numeric"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="request-field">
              <label className="request-label" htmlFor="est-shipping">
                Shipping &amp; freight (GHC)
              </label>
              <input
                id="est-shipping"
                className="request-input"
                type="number"
                min="0"
                inputMode="numeric"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
              />
            </div>
            <div className="request-field">
              <label className="request-label" htmlFor="est-duty">
                Assumed duty rate (%)
              </label>
              <input
                id="est-duty"
                className="request-input"
                type="number"
                min="0"
                max="100"
                inputMode="numeric"
                value={dutyRate}
                onChange={(e) => setDutyRate(e.target.value)}
              />
            </div>
            <div className="request-field">
              <label className="request-label" htmlFor="est-fees">
                Clearing &amp; other fees (GHC)
              </label>
              <input
                id="est-fees"
                className="request-input"
                type="number"
                min="0"
                inputMode="numeric"
                value={otherFees}
                onChange={(e) => setOtherFees(e.target.value)}
              />
            </div>
          </div>

          <div className="estimator-breakdown">
            <div className="estimator-row">
              <span>CIF value (price + shipping)</span>
              <strong>{formatGHC(result.cif)}</strong>
            </div>
            <div className="estimator-row">
              <span>Estimated duty ({dutyRate || 0}%)</span>
              <strong>{formatGHC(result.duty)}</strong>
            </div>
            <div className="estimator-row">
              <span>Clearing &amp; other fees</span>
              <strong>{formatGHC(result.fees)}</strong>
            </div>
            <div className="estimator-row estimator-total">
              <span>Estimated landed cost</span>
              <strong>{formatGHC(result.total)}</strong>
            </div>
          </div>

          <p className="estimator-disclaimer">
            Example numbers only. Actual duty depends on engine size, vehicle age, and GRA&apos;s
            benchmark value for this exact model &mdash; this is not a quote.
          </p>

          <button type="button" className="request-submit" onClick={handleWhatsApp}>
            Get an exact quote on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
