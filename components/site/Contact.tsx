'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateMinLength,
} from '@/lib/validation';
import { contactServices } from '@/lib/data';
import { useScrollReveal } from '@/hooks/use-gsap';

type Fields = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'hello@wayfarertravel.co', href: 'mailto:hello@wayfarertravel.co' },
  { icon: Phone, label: 'Phone', value: '+1 (212) 555-0148', href: 'tel:+12125550148' },
  { icon: MapPin, label: 'Studio', value: '12 Mercer Street, SoHo, New York', href: undefined },
];

export function Contact() {
  const ref = useScrollReveal<HTMLElement>('[data-reveal]');
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const update = (key: keyof Fields, value: string) => {
    setFields((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Errors = {};
    e.name = validateRequired(fields.name, 'Your name');
    e.email = validateEmail(fields.email);
    e.phone = validatePhone(fields.phone);
    e.service = validateRequired(fields.service, 'A service');
    e.message = validateMinLength(fields.message, 10, 'Your message');
    setErrors(e);
    return Object.values(e).every((v) => !v);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    window.setTimeout(() => {
      setStatus('done');
      setFields(empty);
    }, 1200);
  };

  return (
    <section id="contact" ref={ref} className="section-py bg-forest-50">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — copy + contact details */}
          <div>
            <p className="eyebrow" data-reveal>
              Contact
            </p>
            <h2 className="heading-lg mt-4 text-forest" data-reveal>
              Let’s plan your next journey.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-forest/70" data-reveal>
              Tell us where you’d like to go and what you need — a dedicated
              advisor will reply within one business day. This is a demo form;
              no message is sent or stored.
            </p>

            <ul className="mt-10 space-y-5">
              {contactDetails.map((d) => (
                <li key={d.label} data-reveal className="flex items-center gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-forest text-sand">
                    <d.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-forest/50">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="font-serif text-lg text-forest transition-colors hover:text-terracotta-600"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="font-serif text-lg text-forest">{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div data-reveal>
            {status === 'done' ? (
              <div
                role="status"
                className="flex h-full flex-col items-center justify-center rounded-2xl border border-forest/10 bg-card p-10 text-center shadow-soft"
              >
                <CheckCircle2
                  className="h-14 w-14 text-terracotta-600"
                  aria-hidden="true"
                />
                <h3 className="mt-5 font-serif text-2xl text-forest">
                  Thank you — message received!
                </h3>
                <p className="mt-3 max-w-sm text-forest/70">
                  This is a demo confirmation. In a live build, a WAYFARER
                  advisor would be in touch within one business day.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-6 rounded-full border-forest/20 text-forest hover:bg-forest hover:text-ivory"
                  onClick={() => setStatus('idle')}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="rounded-2xl border border-forest/10 bg-card p-7 shadow-soft sm:p-8"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField label="Name" htmlFor="name" error={errors.name}>
                    <Input
                      id="name"
                      placeholder="Jane Doe"
                      value={fields.name}
                      onChange={(e) => update('name', e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                  </FormField>
                  <FormField label="Email" htmlFor="email" error={errors.email}>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      value={fields.email}
                      onChange={(e) => update('email', e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                  </FormField>
                  <FormField label="Phone" htmlFor="phone" error={errors.phone}>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (212) 555-0123"
                      value={fields.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                  </FormField>
                  <FormField label="Service" htmlFor="service" error={errors.service}>
                    <Select
                      value={fields.service}
                      onValueChange={(v) => update('service', v)}
                    >
                      <SelectTrigger
                        id="service"
                        aria-invalid={!!errors.service}
                        aria-describedby={errors.service ? 'service-error' : undefined}
                      >
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {contactServices.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>
                <div className="mt-5">
                  <FormField label="Message" htmlFor="message" error={errors.message}>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Where would you like to go, and what can we help with?"
                      value={fields.message}
                      onChange={(e) => update('message', e.target.value)}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                  </FormField>
                </div>
                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-6 w-full rounded-full bg-forest py-3 text-ivory hover:bg-forest-600 sm:w-auto sm:px-10"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                      Send message
                    </>
                  )}
                </Button>
                <p className="mt-4 text-xs text-forest/50">
                  Demo form — no data is transmitted or stored.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label
        htmlFor={htmlFor}
        className="text-xs font-medium uppercase tracking-wide text-forest/70"
      >
        {label}
      </Label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
