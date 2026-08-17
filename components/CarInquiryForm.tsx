'use client';

import { useState } from 'react';
import type { Car } from '@/lib/types';

const WHATSAPP_NUMBER = '233537633242';

export default function CarInquiryForm({ car }: { car: Car }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    if (!trimmedName || !trimmedPhone) {
      setError('Please add your name and a contact number.');
      setSent(false);
      return;
    }
    setError('');

    const lines = [
      `Enquiry about the ${car.name} (${car.year}) listed on the site.`,
      `Name: ${trimmedName}`,
      `Contact number: ${trimmedPhone}`,
    ];
    if (notes.trim()) lines.push(`Notes: ${notes.trim()}`);

    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener');
    setSent(true);
    setName('');
    setPhone('');
    setNotes('');
  }

  return (
    <form className="car-detail-form reveal" onSubmit={handleSubmit} noValidate>
      <p className="section-eyebrow">Interested in this car?</p>
      <h2 className="section-h2" style={{ fontSize: 'clamp(24px, 3vw, 32px)' }}>
        Ask us about the {car.name}.
      </h2>
      <p className="request-lead" style={{ marginTop: 12 }}>
        Send your details and we&apos;ll reply on WhatsApp with availability, DDP/CIF pricing, and
        next steps for this exact car.
      </p>

      <div className="request-grid" style={{ marginTop: 22 }}>
        <div className="request-field">
          <label className="request-label" htmlFor="ci-name">
            Full name *
          </label>
          <input
            id="ci-name"
            className="request-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Kwame Mensah"
          />
        </div>
        <div className="request-field">
          <label className="request-label" htmlFor="ci-phone">
            WhatsApp / phone number *
          </label>
          <input
            id="ci-phone"
            className="request-input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 024 762 0520"
          />
        </div>
        <div className="request-field request-field-wide">
          <label className="request-label" htmlFor="ci-notes">
            Anything else?
          </label>
          <textarea
            id="ci-notes"
            className="request-textarea"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Colour preference, DDP or CIF, timeline..."
          />
        </div>
      </div>

      {error && <p className="request-error">{error}</p>}
      {sent && (
        <p className="request-success">
          Opened WhatsApp with your enquiry filled in &mdash; hit send there and we&apos;ll reply
          as soon as we can.
        </p>
      )}

      <button type="submit" className="request-submit">
        Ask on WhatsApp
      </button>
    </form>
  );
}
