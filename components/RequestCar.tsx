'use client';

import { useState } from 'react';

const WHATSAPP_NUMBER = '233537633242';

type FormState = {
  name: string;
  phone: string;
  model: string;
  year: string;
  budget: string;
  notes: string;
};

const emptyForm: FormState = { name: '', phone: '', model: '', year: '', budget: '', notes: '' };

function buildWhatsAppMessage(form: FormState): string {
  const lines = [`Car request from ${form.name}`, `Make/model: ${form.model}`];
  if (form.year.trim()) lines.push(`Preferred year: ${form.year.trim()}`);
  if (form.budget.trim()) lines.push(`Budget: ${form.budget.trim()}`);
  lines.push(`Contact number: ${form.phone.trim()}`);
  if (form.notes.trim()) lines.push(`Notes: ${form.notes.trim()}`);
  return lines.join('\n');
}

export default function RequestCar() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = form.name.trim();
    const phone = form.phone.trim();
    const model = form.model.trim();
    if (!name || !phone || !model) {
      setError("Please fill in your name, a contact number, and the car you're after.");
      setSent(false);
      return;
    }
    setError('');
    const finalForm = { ...form, name, phone, model };
    const text = encodeURIComponent(buildWhatsAppMessage(finalForm));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener');
    setSent(true);
    setForm(emptyForm);
  }

  return (
    <section id="request" className="request">
      <div className="request-inner">
        <div className="request-copy reveal">
          <p className="section-eyebrow">Not in the showroom?</p>
          <h2 className="section-h2">Tell us the car you want. We&apos;ll source it.</h2>
          <p className="request-lead">
            Most of what we import moves through direct requests, not just the lineup above. Send
            us the make, model, and year you&apos;re after and we&apos;ll get back to you on
            WhatsApp with availability and pricing.
          </p>
        </div>

        <form className="request-form reveal" onSubmit={handleSubmit} noValidate>
          <div className="request-grid">
            <div className="request-field">
              <label className="request-label" htmlFor="req-name">
                Full name *
              </label>
              <input
                id="req-name"
                className="request-input"
                type="text"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="e.g. Kwame Mensah"
              />
            </div>
            <div className="request-field">
              <label className="request-label" htmlFor="req-phone">
                WhatsApp / phone number *
              </label>
              <input
                id="req-phone"
                className="request-input"
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="e.g. 024 762 0520"
              />
            </div>
            <div className="request-field">
              <label className="request-label" htmlFor="req-model">
                Make &amp; model *
              </label>
              <input
                id="req-model"
                className="request-input"
                type="text"
                value={form.model}
                onChange={(e) => update('model', e.target.value)}
                placeholder="e.g. Toyota Highlander"
              />
            </div>
            <div className="request-field">
              <label className="request-label" htmlFor="req-year">
                Preferred year
              </label>
              <input
                id="req-year"
                className="request-input"
                type="text"
                inputMode="numeric"
                value={form.year}
                onChange={(e) => update('year', e.target.value)}
                placeholder="e.g. 2019 or newer"
              />
            </div>
            <div className="request-field">
              <label className="request-label" htmlFor="req-budget">
                Budget
              </label>
              <input
                id="req-budget"
                className="request-input"
                type="text"
                value={form.budget}
                onChange={(e) => update('budget', e.target.value)}
                placeholder="e.g. up to GHC 150,000"
              />
            </div>
            <div className="request-field request-field-wide">
              <label className="request-label" htmlFor="req-notes">
                Anything else?
              </label>
              <textarea
                id="req-notes"
                className="request-textarea"
                rows={3}
                value={form.notes}
                onChange={(e) => update('notes', e.target.value)}
                placeholder="Colour, trim, mileage range, DDP or CIF preference..."
              />
            </div>
          </div>

          {error && <p className="request-error">{error}</p>}
          {sent && (
            <p className="request-success">
              Opened WhatsApp with your request filled in &mdash; hit send there and we&apos;ll
              reply as soon as we can.
            </p>
          )}

          <button type="submit" className="request-submit">
            Send request on WhatsApp
          </button>
          <p className="request-hint">
            This opens WhatsApp with your details pre-filled. Nothing is sent to us until you tap
            send there.
          </p>
        </form>
      </div>
    </section>
  );
}
