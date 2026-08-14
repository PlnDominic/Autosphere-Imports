'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Car } from '@/lib/types';
import styles from './admin.module.css';

const STORAGE_KEY = 'autosphere_admin_draft_v1';
const MAX_IMAGE_BYTES = 1.5 * 1024 * 1024;

function slugify(str: string): string {
  return (
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'car'
  );
}

function serialize(list: Car[]): string {
  return JSON.stringify({ cars: list }, null, 2) + '\n';
}

const emptyCar = (): Car => ({
  id: '',
  name: '',
  year: '',
  body: '',
  note: 'Request a quote',
  image: '',
  promo: false,
  engine: '',
  fuel: 'Petrol',
  seats: 5,
  brand: '',
});

export default function AdminPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [liveCars, setLiveCars] = useState<Car[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [managerMsg, setManagerMsg] = useState<{ type: 'error' | 'ok' | 'info' | ''; text: string }>({
    type: '',
    text: '',
  });

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [editingIsNew, setEditingIsNew] = useState(false);
  const [form, setForm] = useState<Car>(emptyCar());
  const [previewSrc, setPreviewSrc] = useState('');
  const [editorMsg, setEditorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDirty = loaded && serialize(cars) !== serialize(liveCars);

  useEffect(() => {
    let cancelled = false;

    async function loadInitial() {
      let live: Car[] = [];
      try {
        const res = await fetch('/api/cars', { cache: 'no-store' });
        const data = res.ok ? await res.json() : { cars: [] };
        live = Array.isArray(data.cars) ? data.cars : [];
      } catch {
        live = [];
      }
      if (cancelled) return;
      setLiveCars(live);

      const draft = localStorage.getItem(STORAGE_KEY);
      if (draft) {
        try {
          const parsed = JSON.parse(draft);
          setCars(Array.isArray(parsed.cars) ? parsed.cars : live.map((c) => ({ ...c })));
          setManagerMsg({ type: 'info', text: 'Loaded your unsaved local draft from a previous session.' });
        } catch {
          setCars(live.map((c) => ({ ...c })));
        }
      } else {
        setCars(live.map((c) => ({ ...c })));
      }
      setLoaded(true);
    }

    loadInitial();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, serialize(cars));
    } catch {
      setManagerMsg({
        type: 'error',
        text: 'Could not save your draft to this browser (storage may be full). Consider using smaller photos.',
      });
    }
  }, [cars, loaded]);

  useEffect(() => {
    function beforeUnload(e: BeforeUnloadEvent) {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    }
    window.addEventListener('beforeunload', beforeUnload);
    return () => window.removeEventListener('beforeunload', beforeUnload);
  }, [isDirty]);

  function moveCar(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= cars.length) return;
    setCars((prev) => {
      const next = prev.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setEditingIndex((idx) => (idx === i ? j : idx === j ? i : idx));
  }

  function removeCar(i: number) {
    const name = cars[i].name || 'this car';
    if (!confirm(`Remove "${name}" from the draft lineup?`)) return;
    setCars((prev) => prev.filter((_, idx) => idx !== i));
    if (editingIndex === i && !editingIsNew) closeEditor();
  }

  function openEditor(index: number | null) {
    const isNew = index === null;
    setEditingIsNew(isNew);
    setEditingIndex(isNew ? -1 : index);
    const car = isNew ? emptyCar() : cars[index];
    setForm({ ...car });
    setPreviewSrc(car.image || '');
    setEditorMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setEditorOpen(true);
  }

  function closeEditor() {
    setEditingIndex(-1);
    setEditingIsNew(false);
    setEditorOpen(false);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_IMAGE_BYTES) {
      setEditorMsg('That image is larger than 1.5 MB. Please resize it and try again.');
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      setForm((prev) => ({ ...prev, image: dataUrl }));
      setPreviewSrc(dataUrl);
      setEditorMsg('');
    };
    reader.readAsDataURL(file);
  }

  function saveEditor() {
    const name = form.name.trim();
    if (!name) {
      setEditorMsg('Please give the car a model name.');
      return;
    }
    const car: Car = {
      ...form,
      id: form.id || slugify(`${name}-${form.year.trim()}-${Date.now().toString(36)}`),
      name,
      year: form.year.trim(),
      body: form.body.trim(),
      note: form.note.trim(),
    };
    if (editingIsNew) {
      setCars((prev) => [...prev, car]);
    } else {
      setCars((prev) => prev.map((c, idx) => (idx === editingIndex ? car : c)));
    }
    closeEditor();
  }

  function resetToLive() {
    if (!confirm('Discard all local draft changes and reload the currently published lineup?')) return;
    closeEditor();
    setCars(liveCars.map((c) => ({ ...c })));
    localStorage.removeItem(STORAGE_KEY);
    setManagerMsg({ type: '', text: '' });
  }

  return (
    <>
      <header className={styles.pageHeader}>
        <Link className={styles.logo} href="/">
          <span className={styles['logo-name']}>AUTOSPHERE</span>
          <span className={styles['logo-tag']}>IMPORTS &middot; ADMIN</span>
        </Link>
        <div className={styles['header-right']}>
          <Link href="/" target="_blank" rel="noopener">
            View site
          </Link>
        </div>
      </header>

      <main className={styles.mainWrap}>
        <p className={styles.eyebrow}>Content management</p>
        <h1 className={styles.h1}>Manage the homepage lineup.</h1>
        <p className={styles.lead}>
          Add, edit, remove, and reorder the cars shown in the &ldquo;Cars ready to import&rdquo;
          section. This is a local draft workspace: changes are saved in this browser only.
          Publishing straight to the live homepage isn&apos;t set up yet.
        </p>

        {managerMsg.text && (
          <div
            className={`${styles.msg} ${
              managerMsg.type === 'error'
                ? styles.msgError
                : managerMsg.type === 'ok'
                  ? styles.msgOk
                  : managerMsg.type === 'info'
                    ? styles.msgInfo
                    : ''
            }`}
          >
            {managerMsg.text}
          </div>
        )}

        <div className={styles.toolbar}>
          <h2>
            Lineup - {cars.length} {cars.length === 1 ? 'car' : 'cars'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            {isDirty && <span className={styles['dirty-note']}>Unsaved local changes</span>}
            <button className={`${styles.btn} ${styles.small}`} type="button" onClick={() => openEditor(null)}>
              + Add a car
            </button>
          </div>
        </div>

        <div>
          {cars.length === 0 ? (
            <div className={styles.card} style={{ color: '#8a8e98' }}>
              No cars yet. Use &ldquo;Add a car&rdquo; to post the first one.
            </div>
          ) : (
            cars.map((car, i) => (
              <div
                key={car.id || i}
                className={`${styles['car-row']} ${editingIndex === i && !editingIsNew ? styles.editing : ''}`}
              >
                <div className={styles['row-thumb']}>
                  {car.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={car.image} alt="" />
                  ) : (
                    <span>No photo</span>
                  )}
                </div>

                <div className={styles['row-main']}>
                  <div className={styles['row-name']}>
                    {car.name || '(unnamed)'}
                    {car.promo && <span className={styles['row-badge']}>Promo</span>}
                  </div>
                  <div className={styles['row-sub']}>
                    {[car.year, car.body, car.note].filter(Boolean).join(' · ')}
                  </div>
                </div>

                <div className={styles['row-actions']}>
                  <button
                    className={styles['icon-btn']}
                    type="button"
                    title="Move up"
                    disabled={i === 0}
                    onClick={() => moveCar(i, -1)}
                  >
                    &uarr;
                  </button>
                  <button
                    className={styles['icon-btn']}
                    type="button"
                    title="Move down"
                    disabled={i === cars.length - 1}
                    onClick={() => moveCar(i, 1)}
                  >
                    &darr;
                  </button>
                  <button
                    className={`${styles.btn} ${styles.ghost} ${styles.small}`}
                    type="button"
                    onClick={() => openEditor(i)}
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.btn} ${styles.danger} ${styles.small}`}
                    type="button"
                    onClick={() => removeCar(i)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {editorOpen && (
          <div className={styles.card}>
            <h2 style={{ margin: '0 0 18px', fontFamily: "'Merriweather Sans', sans-serif", fontWeight: 800, fontSize: 20 }}>
              {editingIsNew ? 'Add a car' : `Edit - ${form.name || 'car'}`}
            </h2>
            <div className={styles['editor-grid']}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="f-name">
                  Model name *
                </label>
                <input
                  className={styles.textInput}
                  id="f-name"
                  type="text"
                  placeholder="e.g. Toyota Corolla"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="f-year">
                  Year
                </label>
                <input
                  className={styles.textInput}
                  id="f-year"
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 2018"
                  value={form.year}
                  onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="f-body">
                  Body type
                </label>
                <input
                  className={styles.textInput}
                  id="f-body"
                  type="text"
                  placeholder="e.g. Sedan / SUV / Hatchback"
                  value={form.body}
                  onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="f-note">
                  Price / note
                </label>
                <input
                  className={styles.textInput}
                  id="f-note"
                  type="text"
                  placeholder="e.g. from GHC 84,000 or Request a quote"
                  value={form.note}
                  onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
                />
              </div>
            </div>
            <label className={styles.check}>
              <input
                type="checkbox"
                checked={form.promo}
                onChange={(e) => setForm((p) => ({ ...p, promo: e.target.checked }))}
              />
              Show the yellow &ldquo;Promo&rdquo; badge on this car
            </label>
            <div className={styles.field} style={{ marginTop: 20 }}>
              <label className={styles.label} htmlFor="f-image-file">
                Photo
              </label>
              <input
                className={styles.fileInput}
                id="f-image-file"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <p className={styles.hint}>
                Upload a photo (JPG/PNG/WebP, max 1.5 MB) or leave empty to keep the current one.
                It&apos;s stored in this browser&apos;s draft only until publishing is wired up.
              </p>
              <div className={styles['img-preview']}>
                {previewSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewSrc} alt="" />
                ) : (
                  <span>No photo</span>
                )}
              </div>
            </div>
            {editorMsg && <div className={`${styles.msg} ${styles.msgError}`}>{editorMsg}</div>}
            <div className={styles['editor-actions']}>
              <button className={styles.btn} type="button" onClick={saveEditor}>
                Save to lineup
              </button>
              <button className={`${styles.btn} ${styles.ghost}`} type="button" onClick={closeEditor}>
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className={styles['draft-bar']}>
          <button className={`${styles.btn} ${styles.ghost}`} type="button" onClick={resetToLive}>
            Reset to live version
          </button>
          <span className={styles['draft-note']}>
            Everything here stays local to this browser until publishing is wired up.
          </span>
        </div>
      </main>
    </>
  );
}
