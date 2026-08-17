'use client';

import { useState } from 'react';

const WHATSAPP_NUMBER = '233537633242';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Compact waitlist form shown when no car matches the current filters.
 * `criteria` is a human-readable summary of what the visitor was looking
 * for (e.g. "Body: SUV, Price: Under GHC 100,000") — it's folded into the
 * WhatsApp message so staff know what to watch for on their behalf.
 */
export default function NotifyMeForm({ criteria }: { criteria: string }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    const trimmedBudget = budget.trim();

    if (!trimmedName || !trimmedPhone) {
      setError('Please add your name and a contact number.');
      setSent(false);
      return;
    }
    if (trimmedEmail && !EMAIL_RE.test(trimmedEmail)) {
      setError('That email address doesn’t look right — double-check it or leave it blank.');
      setSent(false);
      return;
    }
    setError('');

    const lines = [
      "Waitlist request — nothing currently matches on the site:",
      criteria,
      `Name: ${trimmedName}`,
      `Contact number: ${trimmedPhone}`,
    ];
    if (trimmedEmail) lines.push(`Email: ${trimmedEmail}`);
    if (trimmedBudget) lines.push(`Preferred budget: ${trimmedBudget}`);
    lines.push('Please notify me when a matching car becomes available.');

    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener');
    setSent(true);
    setName('');
    setPhone('');
    setEmail('');
    setBudget('');
  }

  return (
    <form className="notify-form" onSubmit={handleSubmit} noValidate>
      <div className="notify-fields">
        <input
          className="request-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name *"
          aria-label="Full name"
        />
        <input
          className="request-input"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="WhatsApp / phone number *"
          aria-label="WhatsApp or phone number"
        />
      </div>
      <div className="notify-fields notify-fields-optional">
        <input
          className="request-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional)"
          aria-label="Email address (optional)"
        />
        <input
          className="request-input"
          type="text"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Preferred budget (optional)"
          aria-label="Preferred budget (optional)"
        />
      </div>

      {error && <p className="request-error">{error}</p>}
      {sent && (
        <p className="request-success">
          Opened WhatsApp with your waitlist request &mdash; hit send there and we&apos;ll reach
          out the moment a match comes in.
        </p>
      )}

      <button type="submit" className="request-submit notify-submit">
        Notify me
      </button>
    </form>
  );
}
