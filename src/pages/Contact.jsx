import { useState } from "react";
import { Mail, MapPin, ArrowRight, CheckCircle2, LoaderCircle, } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoIosMailUnread } from "react-icons/io";
import { useTheme } from "../context/Themecontext.jsx";
import { SectionHeader } from "../components/Elements.jsx";
import contactService from "../appwrite/contactService.js";

export default function Contact() {
  const { dark } = useTheme();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const inputClass = `
    w-full rounded-2xl border px-5 py-4 text-sm outline-none transition-all
    ${dark
      ? "border-white/10 bg-[#0d0d0d] text-white placeholder:text-white/30 focus:border-white/30"
      : "border-black/10 bg-white text-black placeholder:text-black/30 focus:border-black/20"
    }
  `;

  const infoCard = `
    rounded-3xl border p-6 transition-all
    ${dark
      ? "border-white/10 bg-[#111]"
      : "border-black/10 bg-[#f5f5f7]"
    }
  `;

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      await contactService.createMessage({
        guest_name: form.name,
        guest_email: form.email,
        message_subject: form.subject,
        message_content: form.message,
        contact_status: false, // unread
      });

      setStatus("success");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to send your message.");
    }
  }

  return (
    <>

      <SectionHeader
        eyebrow="// contact"
        title="Let's build something great."
        subtitle="Whether it's a product, startup, freelance project or simply a question, I'd love to hear from you."
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-[420px_1fr]">

        {/* Left */}

        <div className="space-y-6">

          <div className={infoCard}>
            <h3 className="text-xl font-semibold">
              Contact Information
            </h3>

            <p className="mt-2 text-sm text-black/60 dark:text-white/60">
              Feel free to reach out using any of the platforms below.
            </p>

            <div className="mt-8 space-y-5">

              <a
                href="mailto:hello@example.com"
                className="group flex items-center gap-4 rounded-2xl p-4 transition hover:bg-black/5 dark:hover:bg-white/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="text-xs text-black/50 dark:text-white/50">
                    Email
                  </p>

                  <p className="font-medium group-hover:text-accent">
                    hello@example.com
                  </p>
                </div>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl p-4 transition hover:bg-black/5 dark:hover:bg-white/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500">
                  <FaGithub size={20} />
                </div>

                <div>
                  <p className="text-xs text-black/50 dark:text-white/50">
                    GitHub
                  </p>

                  <p className="font-medium group-hover:text-accent">
                    github.com/yourhandle
                  </p>
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl p-4 transition hover:bg-black/5 dark:hover:bg-white/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500">
                  <FaLinkedin size={20} />
                </div>

                <div>
                  <p className="text-xs text-black/50 dark:text-white/50">
                    LinkedIn
                  </p>

                  <p className="font-medium group-hover:text-accent">
                    linkedin.com/in/yourprofile
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="text-xs text-black/50 dark:text-white/50">
                    Location
                  </p>

                  <p className="font-medium">
                    West Bengal, India
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className={infoCard}>
            <h4 className="font-semibold">
              Typical response time
            </h4>

            <p className="mt-2 text-sm leading-7 text-black/60 dark:text-white/60">
              Usually within 24 hours on weekdays. For urgent work,
              email is the fastest way to reach me.
            </p>
          </div>

        </div>

        {/* Right */}

        <div
          className={`rounded-[36px] border p-8 md:p-10 ${dark
            ? "border-white/10 bg-[#111]"
            : "border-black/10 bg-[#f5f5f7]"
            }`}
        >

          {status === "success" ? (
            <div className="flex min-h-130 flex-col items-center justify-center text-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                <CheckCircle2 size={42} />
              </div>

              <h2 className="mt-8 text-3xl font-semibold">
                Message Sent
              </h2>

              <p className="mt-3 max-w-md text-black/60 dark:text-white/60">
                Thanks for reaching out. I'll review your message and
                get back to you as soon as possible.
              </p>

              <button
                onClick={() => setStatus("idle")}
                className="mt-8 rounded-full bg-black px-7 py-3 text-white transition hover:opacity-90 dark:bg-white dark:text-black"
              >
                Send Another Message
              </button>

            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Full Name
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="john@example.com"
                    required
                  />
                </div>

              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Subject
                </label>

                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Project Discussion"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Message
                </label>

                <textarea
                  rows={8}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              {status === "error" && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-500">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-4 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black"
              >
                {status === "loading" ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>
    </>
  );
}