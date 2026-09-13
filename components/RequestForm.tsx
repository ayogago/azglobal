'use client';

import { useId, useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';
import { AlertCircle, CheckCircle2, FileText, Loader2, Lock, Paperclip, Upload, X } from 'lucide-react';
import { DOCUMENT_TYPES, LANGUAGE_PAIRS, SERVICE_LEVELS, SITE, TURNAROUND } from '@/lib/site';
import { FORM_COPY, type Locale, optionLabel } from '@/lib/i18n';
import {
  ACCEPT_ATTRIBUTE,
  contentTypeFor,
  formatBytes,
  MAX_FILE_BYTES,
  MAX_FILES,
  safeFilename,
} from '@/lib/uploads';

type Kind = 'quote' | 'contact';

type PickedFile = {
  id: string;
  file: File;
  progress: number;
  error?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export default function RequestForm({
  kind = 'quote',
  defaultLanguagePair = '',
  locale = 'en',
}: {
  kind?: Kind;
  defaultLanguagePair?: string;
  locale?: Locale;
}) {
  const t = FORM_COPY[locale];
  const label = (value: string) => optionLabel(locale, value);
  const formId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<PickedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');

  const busy = status === 'uploading' || status === 'sending';
  const isQuote = kind === 'quote';

  function addFiles(list: FileList | File[]) {
    setError('');
    const incoming = Array.from(list);
    const next: PickedFile[] = [];
    const problems: string[] = [];

    for (const file of incoming) {
      if (files.length + next.length >= MAX_FILES) {
        problems.push(t.errorTooMany(MAX_FILES));
        break;
      }
      if (!contentTypeFor(file.name)) {
        problems.push(t.errorType(file.name));
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        problems.push(t.errorSize(file.name, formatBytes(MAX_FILE_BYTES)));
        continue;
      }
      if (files.some((f) => f.file.name === file.name && f.file.size === file.size)) continue;
      next.push({ id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`, file, progress: 0 });
    }

    if (problems.length) setError(problems.join(' '));
    if (next.length) setFiles((prev) => [...prev, ...next]);
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError('');

    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? '').trim();
    const submissionId = crypto.randomUUID();
    const day = new Date().toISOString().slice(0, 10);

    // 1) Upload documents directly to private storage.
    const uploaded: { url: string; pathname: string; name: string }[] = [];
    if (files.length) {
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
        setError(t.errorUpload(SITE.email));
        return;
      }
    }

    // 2) Send the request details.
    setStatus('sending');
    try {
      const response = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind,
          submissionId,
          name: value('name'),
          email: value('email'),
          phone: value('phone'),
          languagePair: value('languagePair'),
          documentType: value('documentType'),
          serviceLevel: value('serviceLevel'),
          turnaround: value('turnaround'),
          subject: value('subject'),
          message: value('message'),
          website: value('website'),
          files: uploaded,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || t.errorGeneric);

      setStatus('done');
      window.gtag?.('event', 'generate_lead', { form: kind, files: uploaded.length });
      window.fbq?.('track', 'Lead', { content_name: kind });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setStatus('idle');
      setError(err instanceof Error ? err.message : t.errorGeneric);
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-2xl border border-leaf/40 bg-leaf-soft p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-14 w-14 text-leaf-dark" />
        <h2 className="mt-4 text-2xl">{isQuote ? t.doneQuoteTitle : t.doneContactTitle}</h2>
        <p className="mx-auto mt-3 max-w-md text-dark-light">{isQuote ? t.doneQuoteText : t.doneContactText}</p>
        <p className="mt-5 text-sm text-dark-light">
          {t.sooner}{' '}
          <a href={SITE.phoneHref} className="font-semibold text-primary hover:underline">
            {SITE.phone}
          </a>
        </p>
      </div>
    );
  }

  const id = (name: string) => `${formId}-${name}`;

  return (
    <form onSubmit={onSubmit} className="relative space-y-5">
      {/* Honeypot: hidden from people, tempting for bots */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={id('website')}>Website</label>
        <input id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={id('name')} className="field-label">
            {t.name} <span className="text-red-600">*</span>
          </label>
          <input id={id('name')} name="name" required minLength={2} maxLength={100} autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor={id('email')} className="field-label">
            {t.email} <span className="text-red-600">*</span>
          </label>
          <input id={id('email')} name="email" type="email" required maxLength={200} autoComplete="email" className="field" />
        </div>
        <div>
          <label htmlFor={id('phone')} className="field-label">
            {t.phone} <span className="font-normal text-dark-light">{t.optional}</span>
          </label>
          <input id={id('phone')} name="phone" type="tel" maxLength={40} autoComplete="tel" className="field" />
        </div>

        {isQuote ? (
          <>
            <div>
              <label htmlFor={id('languagePair')} className="field-label">
                {t.languagePair} <span className="text-red-600">*</span>
              </label>
              <select id={id('languagePair')} name="languagePair" required defaultValue={defaultLanguagePair} className="field">
                <option value="" disabled>
                  {t.choosePair}
                </option>
                {LANGUAGE_PAIRS.map((pair) => (
                  <option key={pair} value={pair}>
                    {label(pair)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={id('documentType')} className="field-label">
                {t.documentType}
              </label>
              <select id={id('documentType')} name="documentType" defaultValue="" className="field">
                <option value="">{t.select}</option>
                {DOCUMENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {label(type)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={id('serviceLevel')} className="field-label">
                {t.serviceLevel}
              </label>
              <select id={id('serviceLevel')} name="serviceLevel" defaultValue={SERVICE_LEVELS[0]} className="field">
                {SERVICE_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {label(level)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={id('turnaround')} className="field-label">
                {t.turnaround}
              </label>
              <select id={id('turnaround')} name="turnaround" defaultValue={TURNAROUND[0]} className="field">
                {TURNAROUND.map((option) => (
                  <option key={option} value={option}>
                    {label(option)}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <div className="sm:col-span-2">
            <label htmlFor={id('subject')} className="field-label">
              {t.subject}
            </label>
            <input id={id('subject')} name="subject" maxLength={150} className="field" />
          </div>
        )}

        <div className="sm:col-span-2">
          <label htmlFor={id('message')} className="field-label">
            {isQuote ? t.messageQuote : t.messageContact} {!isQuote && <span className="text-red-600">*</span>}
          </label>
          <textarea
            id={id('message')}
            name="message"
            rows={isQuote ? 3 : 5}
            required={!isQuote}
            maxLength={5000}
            className="field resize-y"
            placeholder={isQuote ? t.messagePlaceholder : ''}
          />
        </div>
      </div>

      {/* File upload */}
      <div>
        <span className="field-label" id={id('files-label')}>
          {isQuote ? t.filesQuote : t.filesContact}{' '}
          <span className="font-normal text-dark-light">({isQuote ? t.filesHintQuote : t.filesHintContact})</span>
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
              {t.chooseFiles}
            </button>{' '}
            {t.orDrag}
          </p>
          <p id={id('files-help')} className="mt-1 text-xs text-dark-light">
            {t.fileTypes(MAX_FILES, formatBytes(MAX_FILE_BYTES))}
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
                    onClick={() => removeFile(f.id)}
                    className="rounded-md p-1.5 text-dark-light hover:bg-slate-100 hover:text-dark"
                    aria-label={`${t.remove} ${f.file.name}`}
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
            {status === 'uploading' ? t.uploading : t.sending}
          </>
        ) : (
          <>
            {files.length ? <Paperclip className="h-5 w-5" /> : null}
            {isQuote ? t.submitQuote : t.submitContact}
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-dark-light">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        {t.privacy}
      </p>
    </form>
  );
}
