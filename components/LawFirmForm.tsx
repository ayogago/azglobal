'use client';

import { useId, useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';
import { AlertCircle, CheckCircle2, FileText, Loader2, Lock, Upload, X } from 'lucide-react';
import { LANGUAGE_PAIRS, SITE } from '@/lib/site';
import {
  ACCEPT_ATTRIBUTE,
  contentTypeFor,
  formatBytes,
  MAX_FILE_BYTES,
  MAX_FILES,
  safeFilename,
} from '@/lib/uploads';

export const FIRM_ROLES = ['Paralegal', 'Legal assistant', 'Attorney', 'Office manager', 'Other'] as const;

type PickedFile = { id: string; file: File; progress: number };

/**
 * Intake form for the free-first-document offer to immigration law firms.
 * English only by design (the buyer works in English). Posts kind: 'law-firm'
 * to /api/request, which routes it to the team with the firm details up top.
 */
export default function LawFirmForm() {
  const formId = useId();
  const id = (name: string) => `${formId}-${name}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<PickedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');
  const busy = status === 'uploading' || status === 'sending';

  function addFiles(list: FileList | File[]) {
    setError('');
    const next: PickedFile[] = [];
    const problems: string[] = [];
    for (const file of Array.from(list)) {
      if (files.length + next.length >= MAX_FILES) {
        problems.push(`You can attach up to ${MAX_FILES} files per request.`);
        break;
      }
      if (!contentTypeFor(file.name)) {
        problems.push(`${file.name} is not a supported file type.`);
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        problems.push(`${file.name} is larger than ${formatBytes(MAX_FILE_BYTES)}.`);
        continue;
      }
      if (files.some((f) => f.file.name === file.name && f.file.size === file.size)) continue;
      next.push({ id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`, file, progress: 0 });
    }
    if (problems.length) setError(problems.join(' '));
    if (next.length) setFiles((prev) => [...prev, ...next]);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError('');
    if (!files.length) {
      setError('Attach the document you would like translated — a scan or a clear phone photo is fine.');
      return;
    }

    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? '').trim();
    const submissionId = crypto.randomUUID();
    const day = new Date().toISOString().slice(0, 10);

    const uploaded: { url: string; pathname: string; name: string }[] = [];
    setStatus('uploading');
    try {
      for (const picked of files) {
        const blob = await upload(`requests/${day}/${submissionId}/${safeFilename(picked.file.name)}`, picked.file, {
          access: 'private',
          handleUploadUrl: '/api/upload',
          contentType: contentTypeFor(picked.file.name) ?? undefined,
          multipart: picked.file.size > 8 * 1024 * 1024,
          onUploadProgress: ({ percentage }) =>
            setFiles((prev) => prev.map((f) => (f.id === picked.id ? { ...f, progress: percentage } : f))),
        });
        uploaded.push({ url: blob.url, pathname: blob.pathname, name: picked.file.name });
        setFiles((prev) => prev.map((f) => (f.id === picked.id ? { ...f, progress: 100 } : f)));
      }
    } catch (err) {
      console.error(err);
      setStatus('idle');
      setError(`We couldn't upload the document. Please try again, or email it to ${SITE.email}.`);
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'law-firm',
          submissionId,
          firm: value('firm'),
          name: value('name'),
          role: value('role'),
          email: value('email'),
          phone: value('phone'),
          languagePair: value('languagePair'),
          deadline: value('deadline'),
          matter: value('matter'),
          message: value('message'),
          website: value('website'),
          files: uploaded,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Something went wrong. Please try again.');
      setStatus('done');
      window.gtag?.('event', 'generate_lead', { form: 'law-firm', files: uploaded.length });
      window.fbq?.('track', 'Lead', { content_name: 'law-firm' });
    } catch (err) {
      setStatus('idle');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-2xl border border-leaf/40 bg-leaf-soft p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-14 w-14 text-leaf-dark" />
        <h3 className="mt-4 text-2xl">Got it — your first document is on us</h3>
        <p className="mx-auto mt-3 max-w-md text-dark-light">
          {SITE.replyPromise}. You will get the page count and delivery time by email, then the finished translation as
          PDF and DOCX.
        </p>
        <p className="mt-5 text-sm text-dark-light">
          Need it sooner? Call{' '}
          <a href={SITE.phoneHref} className="font-semibold text-primary hover:underline">
            {SITE.phone}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5" noValidate={false}>
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={id('website')}>Website</label>
        <input id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={id('firm')} className="field-label">
            Law firm <span className="text-red-600">*</span>
          </label>
          <input id={id('firm')} name="firm" required minLength={2} maxLength={150} autoComplete="organization" className="field" />
        </div>
        <div>
          <label htmlFor={id('name')} className="field-label">
            Your name <span className="text-red-600">*</span>
          </label>
          <input id={id('name')} name="name" required minLength={2} maxLength={100} autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor={id('role')} className="field-label">
            Your role
          </label>
          <select id={id('role')} name="role" defaultValue={FIRM_ROLES[0]} className="field">
            {FIRM_ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={id('email')} className="field-label">
            Work email <span className="text-red-600">*</span>
          </label>
          <input id={id('email')} name="email" type="email" required maxLength={200} autoComplete="email" className="field" />
        </div>
        <div>
          <label htmlFor={id('phone')} className="field-label">
            Phone <span className="font-normal text-dark-light">(optional)</span>
          </label>
          <input id={id('phone')} name="phone" type="tel" maxLength={40} autoComplete="tel" className="field" />
        </div>
        <div>
          <label htmlFor={id('languagePair')} className="field-label">
            Language of the document <span className="text-red-600">*</span>
          </label>
          <select id={id('languagePair')} name="languagePair" required defaultValue="" className="field">
            <option value="" disabled>
              Select…
            </option>
            {LANGUAGE_PAIRS.map((pair) => (
              <option key={pair} value={pair}>
                {pair}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={id('deadline')} className="field-label">
            Filing deadline <span className="font-normal text-dark-light">(optional)</span>
          </label>
          <input id={id('deadline')} name="deadline" type="date" className="field" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id('matter')} className="field-label">
            Client or matter reference <span className="font-normal text-dark-light">(optional — shown on your statement)</span>
          </label>
          <input id={id('matter')} name="matter" maxLength={120} className="field" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id('message')} className="field-label">
            Anything we should know <span className="font-normal text-dark-light">(optional)</span>
          </label>
          <textarea
            id={id('message')}
            name="message"
            rows={3}
            maxLength={5000}
            className="field"
            placeholder="How the client’s name is spelled on their passport, what the document is for, anything unusual about it."
          />
        </div>
      </div>

      <div>
        <span className="field-label" id={id('files-label')}>
          The document <span className="text-red-600">*</span>{' '}
          <span className="font-normal text-dark-light">(scan or phone photo)</span>
        </span>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            if (!busy) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            if (!busy && e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
          }}
          className={`rounded-xl border-2 border-dashed px-4 py-7 text-center transition-colors ${
            dragging ? 'border-primary bg-primary-soft' : 'border-slate-300 bg-slate-50'
          }`}
        >
          <Upload className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
          <p className="mt-2 text-sm text-dark">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="font-semibold text-primary underline-offset-2 hover:underline"
              aria-describedby={id('files-help')}
            >
              Choose files
            </button>{' '}
            or drag them here
          </p>
          <p id={id('files-help')} className="mt-1 text-xs text-dark-light">
            PDF, JPG, PNG, HEIC, DOC or DOCX · up to {MAX_FILES} files · {formatBytes(MAX_FILE_BYTES)} each
          </p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={ACCEPT_ATTRIBUTE}
            className="sr-only"
            aria-labelledby={id('files-label')}
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
              e.target.value = '';
            }}
          />
        </div>

        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((f) => (
              <li key={f.id} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5">
                <FileText className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-dark">{f.file.name}</p>
                  {status === 'uploading' || f.progress > 0 ? (
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full bg-primary transition-all" style={{ width: `${f.progress}%` }} />
                    </div>
                  ) : (
                    <p className="text-xs text-dark-light">{formatBytes(f.file.size)}</p>
                  )}
                </div>
                {!busy && (
                  <button
                    type="button"
                    onClick={() => setFiles((prev) => prev.filter((x) => x.id !== f.id))}
                    className="rounded-md p-1.5 text-dark-light hover:bg-slate-100 hover:text-dark"
                    aria-label={`Remove ${f.file.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button type="submit" disabled={busy} className="btn-primary w-full py-3.5 text-base">
        {busy ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            {status === 'uploading' ? 'Uploading document…' : 'Sending…'}
          </>
        ) : (
          'Send my first document free'
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-dark-light">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        Uploaded privately over an encrypted connection, seen only by our translators, and deleted automatically after 90 days.
      </p>
    </form>
  );
}
