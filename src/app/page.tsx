"use client";

import { useState, type FormEvent } from "react";

const PHONE = "3856954804";
const services = [
  { icon: "/paint-roller.png", title: "Interior Painting", detail: "Walls, ceilings, and complete room refreshes." },
  { icon: "/exterior-paint.png", title: "Exterior Painting", detail: "Fresh curb appeal for your home's exterior." },
  { icon: "/trim-doors.png", title: "Walls • Trim • Doors", detail: "Precision finishing for walls, baseboards, casings, and doors." },
  { icon: "/decks-fences.png", title: "Decks & Fences", detail: "Refresh outdoor wood and painted surfaces." },
  { icon: "/commercial.png", title: "Residential & Commercial", detail: "Detail-focused painting for homes and commercial spaces." },
];
const projects = [
  { label: "Exterior Painting", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=85" },
  { label: "Interior Painting", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85" },
  { label: "Decks & Fences", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=85" },
  { label: "Commercial Painting", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=85" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", zip: "", service: "Interior Painting", details: "" });
  const [sending, setSending] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  async function submitEstimate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setFormMessage("");

    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          zip: form.zip,
          projectType: form.service,
          message: form.details,
        }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Unable to send your request. Please try again.");
      }
      setForm({ name: "", phone: "", zip: "", service: "Interior Painting", details: "" });
      setFormMessage("Your estimate request has been sent! We'll be in touch soon.");
    } catch (error) {
      setFormMessage(error instanceof Error ? error.message : "Unable to send your request. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#092459]">
      <header className="sticky top-0 z-40 bg-[#073783] text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3 lg:px-8">
          <a href="#home" className="shrink-0" aria-label="Kanga Paint home">
            <img src="/kanga-logo.png" alt="Kanga Paint" className="h-16 w-auto max-w-[190px] object-contain sm:h-20" />
          </a>
          <nav className="hidden items-center gap-7 font-bold lg:flex" aria-label="Main navigation">
            {[["Home", "#home"], ["Services", "#services"], ["About", "#about"], ["Projects", "#projects"], ["Contact", "#contact"]].map(([label, href]) => (
              <a key={href} href={href} className="transition hover:text-[#ff9518]">{label}</a>
            ))}
          </nav>
          <a href={`tel:${PHONE}`} className="hidden rounded-full bg-[#ff8a00] px-6 py-3 text-lg font-extrabold text-white shadow-md transition hover:bg-[#f57900] sm:inline-flex">☎ 385.695.4804</a>
          <button type="button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg border border-white/40 px-3 py-2 text-2xl lg:hidden">☰</button>
        </div>
        {menuOpen && <nav className="flex flex-col gap-1 border-t border-white/20 px-5 py-3 font-semibold lg:hidden">{[["Home", "#home"], ["Services", "#services"], ["About", "#about"], ["Projects", "#projects"], ["Contact", "#contact"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded px-3 py-2 hover:bg-white/10">{label}</a>)}<a className="px-3 py-2" href={`tel:${PHONE}`}>☎ 385.695.4804</a></nav>}
      </header>

      <section id="home" className="relative isolate overflow-hidden bg-[#f6f7f9] text-[#092459]">
        <div className="absolute inset-x-0 top-0 h-3 bg-[#ff8a00]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
          <div className="relative z-10">
            <p className="mb-4 text-sm font-black uppercase tracking-[.2em] text-[#ec7600]">Residential & Commercial Painting • Utah</p>
            <h1 className="text-5xl font-black italic leading-[1.08] tracking-tight sm:text-6xl xl:text-7xl">Exceptional Painting.<span className="mt-3 block w-fit -rotate-1 bg-[#ff8a00] px-3 py-2 text-white shadow-lg">Every Detail Matters.</span></h1>
            <p className="mt-8 max-w-xl text-xl font-semibold leading-relaxed">Professional painting with a focus on craftsmanship, precision, and a high-quality finish that lasts.</p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">From beautifully finished baseboards and door casings to seamless transitions and flawless walls, we believe exceptional results are built on the details.</p>
            <ul className="mt-7 space-y-3 text-lg font-extrabold">
              {["Meticulous Surface Preparation", "Seamless Caulk Joints & Transitions", "Crisp, Clean Trim Lines", "Smooth, Durable Finishes"].map(item => <li key={item} className="flex items-center gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ff8a00] text-white">✓</span>{item}</li>)}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3"><button onClick={() => setFormOpen(true)} className="rounded-full bg-[#ff8a00] px-8 py-4 text-lg font-black text-white shadow-lg transition hover:bg-[#ed7900]">Get a Free Estimate →</button><a href={`tel:${PHONE}`} className="rounded-full border-2 border-[#073783] px-8 py-4 text-lg font-black text-[#073783] transition hover:bg-[#073783] hover:text-white">Call Us Today</a></div>
          </div>
          <div className="grid min-w-0 grid-cols-[1.35fr_.8fr] gap-3">
            <div className="relative min-h-[480px] overflow-hidden rounded-3xl shadow-2xl sm:min-h-[600px]">
              <img src="/detail-door.png" alt="Modern white door with clean flat casing and precise painted trim" className="h-full w-full object-cover" onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&q=85'; }} />
              <span className="absolute bottom-4 left-4 rounded-xl bg-[#073783]/90 px-4 py-2 text-sm font-bold text-white">Beautiful results start with the details</span>
            </div>
            <div className="grid grid-rows-3 gap-3">
              {[{src:"/detail-casing.png", alt:"Smooth painted door casing and seamless corner joint", label:"Precise casing"},{src:"/detail-base.png",alt:"Clean baseboard-to-wall paint transition",label:"Clean baseboards"},{src:"/detail-joint.png",alt:"Refined paint and caulk transition at trim joint",label:"Seamless finishes"}].map((detail, index) => <div key={detail.src} className="relative min-h-0 overflow-hidden rounded-2xl border-4 border-white bg-[#e4e7ec] shadow-lg"><img src={detail.src} alt={detail.alt} className="h-full w-full object-cover" onError={e => { e.currentTarget.src = ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=85","https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=85","https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=85"][index]; }} /><span className="absolute inset-x-0 bottom-0 bg-[#031d4d]/80 px-2 py-2 text-center text-xs font-bold text-white sm:text-sm">{detail.label}</span></div>)}
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 bg-white px-5 py-6"><div className="mx-auto grid max-w-7xl gap-5 text-center font-black sm:grid-cols-2 lg:grid-cols-4"><span>✦ Quality Craftsmanship</span><span>⌂ Clean, Professional Results</span><span>✓ Long-Lasting Finishes</span><span>★ Local Utah Service</span></div></div>
      </section>

      <section id="services" className="scroll-mt-28 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle>Our Painting Services</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((service) => <article key={service.title} className="rounded-3xl border-b-[6px] border-[#ff8a00] bg-[#f4f6fa] px-5 py-8 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-xl"><div className="mb-3 flex h-24 items-center justify-center">{service.icon.startsWith("/") ? <img src={service.icon} alt="" className="h-full w-full object-contain" /> : <span className="text-6xl font-black leading-none text-[#0643a2]">{service.icon}</span>}</div><h3 className="text-xl font-black leading-tight">{service.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{service.detail}</p></article>)}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-28 overflow-hidden bg-[#ff8a00] text-white">
        <div className="grid lg:grid-cols-2">
          <div className="min-h-[320px] lg:min-h-[480px]"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85" alt="Beautifully finished interior painting inspiration" className="h-full w-full object-cover" /></div>
          <div className="flex flex-col justify-center bg-gradient-to-br from-[#ff9d15] to-[#ff7800] px-8 py-14 lg:px-16">
            <h2 className="mb-5 w-fit -rotate-2 rounded-lg bg-[#073783] px-5 py-3 text-3xl font-black italic shadow-lg sm:text-4xl">Why Every Detail Matters</h2>
            <p className="mb-7 max-w-xl text-lg font-semibold leading-relaxed">A great finish begins long before the final coat. Careful preparation, precise cutting-in, properly finished trim, and consistent coverage all contribute to a result you can feel proud of.</p>
            <ul className="space-y-4 text-lg font-bold">{["Thoughtful preparation and surface protection", "Clean edges and refined trim details", "Smooth, consistent paint application", "Respectful communication and tidy work areas", "Free, no-pressure estimates"].map(item => <li key={item} className="flex items-center gap-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0643a2] text-white">✓</span>{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-28 px-5 py-16 lg:px-8"><div className="mx-auto max-w-7xl"><SectionTitle>Painting Inspiration</SectionTitle><p className="mb-9 text-center text-slate-600">Explore the possibilities for your next painting project.</p><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{projects.map(project => <div key={project.label} className="group relative overflow-hidden rounded-3xl shadow-lg"><img src={project.image} alt={project.label + " inspiration"} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"/><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#031d4d]/90 to-transparent px-5 pb-5 pt-12 font-extrabold text-white">{project.label}</div></div>)}</div><p className="mt-4 text-center text-xs text-slate-500">Illustrative photography — actual Kanga Paint project photos coming soon.</p></div></section>

      <section id="contact" className="scroll-mt-28 bg-gradient-to-r from-[#0649ae] via-[#073783] to-[#031d4d] px-5 py-12 text-white"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 text-center md:flex-row md:text-left"><div><h2 className="text-3xl font-black italic sm:text-4xl">Ready for a Beautifully Finished Space?</h2><p className="mt-2 text-lg">Tell us about your project and the finish you envision. Get a free, no-obligation estimate.</p></div><button onClick={() => setFormOpen(true)} className="shrink-0 rounded-full bg-[#ff8a00] px-8 py-4 text-lg font-black shadow-lg transition hover:bg-[#ff9e20]">Get Your Free Estimate →</button></div></section>

      <footer className="border-t-8 border-[#ff8a00] bg-[#031d4d] px-5 py-12 text-white lg:px-8"><div className="mx-auto grid max-w-7xl gap-9 md:grid-cols-3 md:items-center"><div><img src="/kanga-logo.png" alt="Kanga Paint" className="h-24 w-auto" /></div><div><h3 className="mb-2 text-lg font-black">📍 Service Areas</h3><p>Salt Lake County | Utah County | Davis County</p></div><div className="space-y-2"><a className="block font-bold hover:text-[#ff9e20]" href={`tel:${PHONE}`}>☎ 385.695.4804</a><a className="block hover:text-[#ff9e20]" href="mailto:info@kangapaint.com">✉ info@kangapaint.com</a><p>🌐 kangapaint.com</p></div></div><p className="mx-auto mt-10 max-w-7xl border-t border-white/20 pt-6 text-center text-xs text-white/60">© 2026 Kanga Paint. All rights reserved.</p></footer>

      {formOpen && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#031d4d]/80 p-4" role="presentation" onMouseDown={e => { if(e.target === e.currentTarget) setFormOpen(false); }}><div role="dialog" aria-modal="true" aria-labelledby="estimate-title" className="relative my-auto w-full max-w-lg rounded-3xl bg-white p-6 text-[#092459] shadow-2xl sm:p-9"><button onClick={() => setFormOpen(false)} aria-label="Close estimate form" className="absolute right-5 top-4 text-3xl text-slate-500">×</button><h2 id="estimate-title" className="pr-8 text-3xl font-black">Get a Free Estimate</h2><p className="mb-6 mt-2 text-sm text-slate-600">Fill out the details below and we’ll contact you about your free estimate.</p><form onSubmit={submitEstimate} className="space-y-4">{[["Your name", "name", "text"], ["Phone number", "phone", "tel"], ["Project ZIP code", "zip", "text"]].map(([label,key,type]) => <label key={key} className="block text-sm font-bold">{label}<input required type={type} value={form[key as "name" | "phone" | "zip"]} onChange={e => setForm(prev => ({...prev, [key]: e.target.value}))} className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0649ae]" /></label>)}<label className="block text-sm font-bold">Project type<select value={form.service} onChange={e => setForm(prev => ({...prev, service:e.target.value}))} className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3">{services.map(service => <option key={service.title}>{service.title}</option>)}</select></label><label className="block text-sm font-bold">Tell us about your project<textarea rows={3} value={form.details} onChange={e => setForm(prev => ({...prev, details:e.target.value}))} className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3" /></label><button type="submit" disabled={sending} className="w-full rounded-full bg-[#ff8a00] px-6 py-4 text-lg font-black text-white hover:bg-[#ed7900]">{sending ? "Sending..." : "Send Estimate Request →"}</button>{formMessage && <p role="status" aria-live="polite" className="text-center text-sm font-semibold">{formMessage}</p>}</form></div></div>}
    </main>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="mb-10 text-center"><h2 className="text-3xl font-black tracking-tight text-[#092e71] sm:text-4xl">{children}</h2><div className="mx-auto mt-3 h-2 w-44 -rotate-2 rounded-full bg-[#ff8a00]" /></div>;
}
