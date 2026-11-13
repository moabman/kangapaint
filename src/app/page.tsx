"use client";

import { useState, type FormEvent } from "react";

const PHONE = "3856954804";
const services = [
  { icon: "⌂", title: "Interior Painting", detail: "Walls, ceilings, and complete room refreshes." },
  { icon: "⌂", title: "Exterior Painting", detail: "Fresh curb appeal for your home's exterior." },
  { icon: "▰", title: "Walls • Trim • Doors", detail: "Clean lines and carefully finished details." },
  { icon: "▥", title: "Decks & Fences", detail: "Refresh outdoor wood and painted surfaces." },
  { icon: "▦", title: "Residential & Commercial", detail: "Painting solutions for homes and businesses." },
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

  function submitEstimate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(`Kanga Paint estimate request - ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nZIP: ${form.zip}\nService: ${form.service}\nProject details: ${form.details}`);
    window.location.href = `mailto:info@kangapaint.com?subject=${subject}&body=${body}`;
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

      <section id="home" className="relative isolate overflow-hidden bg-gradient-to-br from-[#0955bc] via-[#073783] to-[#031d4d] text-white">
        <div className="absolute -left-32 -top-40 h-[500px] w-[500px] rounded-full border-[85px] border-[#1674dc]/30" />
        <div className="absolute -bottom-36 right-[-12%] h-80 w-[80%] rotate-[-12deg] rounded-[50%] bg-[#ff8a00]" />
        <div className="mx-auto grid min-h-[550px] max-w-7xl items-center gap-8 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
          <div className="relative z-10">
            <h1 className="max-w-2xl text-5xl font-black italic leading-[1.08] tracking-tight drop-shadow-lg sm:text-6xl lg:text-7xl">We Make Your <span className="block">Home Jump!</span></h1>
            <div className="mb-7 mt-5 h-2 w-56 -rotate-2 rounded-full bg-[#ff920b] sm:w-80" />
            <p className="max-w-xl text-xl font-medium leading-relaxed sm:text-2xl">Professional painting for homes & businesses in Salt Lake, Utah & Davis Counties.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setFormOpen(true)} className="rounded-full bg-[#ff8a00] px-7 py-4 text-lg font-extrabold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-[#ff9e20]">Get a Free Estimate →</button>
              <a href={`tel:${PHONE}`} className="rounded-full border-2 border-white px-7 py-4 text-lg font-bold transition hover:bg-white hover:text-[#073783]">☎ Call Now</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm font-bold sm:gap-9"><span>☆ Quality-Focused</span><span>✓ Local Utah Company</span><span>♡ Free Estimates</span></div>
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[620px]">
            <div className="absolute -inset-3 rotate-3 rounded-[3rem] bg-[#ff8a00]" />
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1300&q=90" alt="Beautifully finished modern home" className="relative h-[340px] w-full rounded-[2.5rem] border-8 border-white object-cover shadow-2xl sm:h-[450px]" />
            <div className="absolute -bottom-5 -left-4 rounded-2xl border-4 border-white bg-[#ff8a00] px-5 py-3 text-lg font-black shadow-xl sm:text-xl">🦘 Kanga Paint</div>
          </div>
        </div>
        <svg className="relative -mb-px block w-full" viewBox="0 0 1440 75" preserveAspectRatio="none" aria-hidden="true"><path fill="#ffffff" d="M0 42 C300 5 450 75 720 34 S1150 10 1440 45 L1440 75 L0 75Z" /></svg>
      </section>

      <section id="services" className="scroll-mt-28 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle>Our Painting Services</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((service) => <article key={service.title} className="rounded-3xl border-b-[6px] border-[#ff8a00] bg-[#f4f6fa] px-5 py-8 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-xl"><div className="mb-3 text-6xl font-black leading-none text-[#0643a2]">{service.icon}</div><h3 className="text-xl font-black leading-tight">{service.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{service.detail}</p></article>)}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-28 overflow-hidden bg-[#ff8a00] text-white">
        <div className="grid lg:grid-cols-2">
          <div className="min-h-[320px] lg:min-h-[480px]"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85" alt="Freshly painted, inviting living room" className="h-full w-full object-cover" /></div>
          <div className="flex flex-col justify-center bg-gradient-to-br from-[#ff9d15] to-[#ff7800] px-8 py-14 lg:px-16">
            <h2 className="mb-7 w-fit -rotate-2 rounded-lg bg-[#073783] px-5 py-3 text-3xl font-black italic shadow-lg sm:text-4xl">Why Choose Kanga Paint?</h2>
            <ul className="space-y-5 text-xl font-bold">{["Attention to detail", "Quality-focused painting", "Clear communication", "Local Utah service", "Free, no-pressure estimates"].map(item => <li key={item} className="flex items-center gap-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0643a2] text-white">✓</span>{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-28 px-5 py-16 lg:px-8"><div className="mx-auto max-w-7xl"><SectionTitle>Painting Inspiration</SectionTitle><p className="mb-9 text-center text-slate-600">Explore the possibilities for your next painting project.</p><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{projects.map(project => <div key={project.label} className="group relative overflow-hidden rounded-3xl shadow-lg"><img src={project.image} alt={project.label + " inspiration"} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"/><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#031d4d]/90 to-transparent px-5 pb-5 pt-12 font-extrabold text-white">{project.label}</div></div>)}</div><p className="mt-4 text-center text-xs text-slate-500">Illustrative photography — actual Kanga Paint project photos coming soon.</p></div></section>

      <section id="contact" className="scroll-mt-28 bg-gradient-to-r from-[#0649ae] via-[#073783] to-[#031d4d] px-5 py-12 text-white"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 text-center md:flex-row md:text-left"><div><h2 className="text-3xl font-black italic sm:text-4xl">Ready to Refresh Your Space?</h2><p className="mt-2 text-lg">Get a free, no-obligation estimate today.</p></div><button onClick={() => setFormOpen(true)} className="shrink-0 rounded-full bg-[#ff8a00] px-8 py-4 text-lg font-black shadow-lg transition hover:bg-[#ff9e20]">Get Your Free Estimate →</button></div></section>

      <footer className="border-t-8 border-[#ff8a00] bg-[#031d4d] px-5 py-12 text-white lg:px-8"><div className="mx-auto grid max-w-7xl gap-9 md:grid-cols-3 md:items-center"><div><img src="/kanga-logo.png" alt="Kanga Paint" className="h-24 w-auto" /></div><div><h3 className="mb-2 text-lg font-black">📍 Service Areas</h3><p>Salt Lake County | Utah County | Davis County</p></div><div className="space-y-2"><a className="block font-bold hover:text-[#ff9e20]" href={`tel:${PHONE}`}>☎ 385.695.4804</a><a className="block hover:text-[#ff9e20]" href="mailto:info@kangapaint.com">✉ info@kangapaint.com</a><p>🌐 kangapaint.com</p></div></div><p className="mx-auto mt-10 max-w-7xl border-t border-white/20 pt-6 text-center text-xs text-white/60">© {new Date().getFullYear()} Kanga Paint. All rights reserved.</p></footer>

      {formOpen && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#031d4d]/80 p-4" role="presentation" onMouseDown={e => { if(e.target === e.currentTarget) setFormOpen(false); }}><div role="dialog" aria-modal="true" aria-labelledby="estimate-title" className="relative my-auto w-full max-w-lg rounded-3xl bg-white p-6 text-[#092459] shadow-2xl sm:p-9"><button onClick={() => setFormOpen(false)} aria-label="Close estimate form" className="absolute right-5 top-4 text-3xl text-slate-500">×</button><h2 id="estimate-title" className="pr-8 text-3xl font-black">Get a Free Estimate</h2><p className="mb-6 mt-2 text-sm text-slate-600">Fill out the details below. Submitting opens your email app with the request ready to send.</p><form onSubmit={submitEstimate} className="space-y-4">{[["Your name", "name", "text"], ["Phone number", "phone", "tel"], ["Project ZIP code", "zip", "text"]].map(([label,key,type]) => <label key={key} className="block text-sm font-bold">{label}<input required type={type} value={form[key as "name" | "phone" | "zip"]} onChange={e => setForm(prev => ({...prev, [key]: e.target.value}))} className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#0649ae]" /></label>)}<label className="block text-sm font-bold">Project type<select value={form.service} onChange={e => setForm(prev => ({...prev, service:e.target.value}))} className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3">{services.map(service => <option key={service.title}>{service.title}</option>)}</select></label><label className="block text-sm font-bold">Tell us about your project<textarea rows={3} value={form.details} onChange={e => setForm(prev => ({...prev, details:e.target.value}))} className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3" /></label><button type="submit" className="w-full rounded-full bg-[#ff8a00] px-6 py-4 text-lg font-black text-white hover:bg-[#ed7900]">Prepare Email Request →</button></form></div></div>}
    </main>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="mb-10 text-center"><h2 className="text-3xl font-black tracking-tight text-[#092e71] sm:text-4xl">{children}</h2><div className="mx-auto mt-3 h-2 w-44 -rotate-2 rounded-full bg-[#ff8a00]" /></div>;
}
