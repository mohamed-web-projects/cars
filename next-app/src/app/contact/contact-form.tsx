"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StaggerGroup, StaggerItem } from "@/components/motion-primitives";

const contactCards = [
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: "hello@autovault.dev",
    href: "mailto:hello@autovault.dev",
  },
  {
    icon: <Phone size={18} />,
    label: "Phone",
    value: "+1 (555) 010-2026",
    href: "tel:+15550102026",
  },
  {
    icon: <MapPin size={18} />,
    label: "Studio",
    value: "Detroit, MI, USA",
    href: "#",
  },
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialForm: FormState = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setForm(initialForm);
      setSubmitted(false);
    }, 4000);
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <span className="text-gradient">talk cars</span>
          </>
        }
        description="Corrections, ideas, or a full spec-sheet opinion? Send a message and we'll get back to you within 48 hours."
      />

      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Contact cards */}
          <StaggerGroup className="space-y-4">
            {contactCards.map((card) => (
              <StaggerItem key={card.label}>
                <a
                  href={card.href}
                  className="group glass flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-soft text-white">
                    {card.icon}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-ink-muted">
                      {card.label}
                    </p>
                    <p className="font-medium text-ink group-hover:text-primary">
                      {card.value}
                    </p>
                  </div>
                </a>
              </StaggerItem>
            ))}

            <StaggerItem>
              <div className="glass rounded-2xl p-5">
                <p className="text-xs uppercase tracking-widest text-ink-muted">
                  Response time
                </p>
                <p className="mt-1 font-heading text-ink">under 48 hours</p>
              </div>
            </StaggerItem>
          </StaggerGroup>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="glass rounded-3xl p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Driver"
                autoComplete="name"
                required
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="mt-5">
              <Field
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                required
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us everything…"
                required
                className="w-full resize-y rounded-2xl border border-line bg-surface-raised px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-primary/60"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary-soft px-6 py-3.5 font-semibold text-white shadow-glow transition-all duration-300 hover:scale-[1.01] hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-80 sm:w-auto"
            >
              {submitted ? (
                <>
                  <CheckCircle2 size={17} /> Message sent
                </>
              ) : (
                <>
                  Send message
                  <Send
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-2xl border border-line bg-surface-raised px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-primary/60"
      />
    </div>
  );
}