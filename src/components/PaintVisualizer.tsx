"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";

type Color = { name: string; hex: string };
const COLORS: Color[] = [
  { name: "Warm White", hex: "#E9E4DB" },
  { name: "Soft Greige", hex: "#C9C2B9" },
  { name: "Sage Green", hex: "#9BA58E" },
  { name: "Eucalyptus", hex: "#718C84" },
  { name: "Blue Gray", hex: "#607D93" },
  { name: "Sandstone", hex: "#D4C2AA" },
  { name: "Mushroom", hex: "#B6A999" },
  { name: "Slate Gray", hex: "#8C9399" },
  { name: "Dusty Blue", hex: "#91B1C4" },
  { name: "Deep Navy", hex: "#273F60" },
];
const MAX_BYTES = 10 * 1024 * 1024;

export default function PaintVisualizer() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [selected, setSelected] = useState<Color>(COLORS[4]);
  const [custom, setCustom] = useState("#607D93");
  const [position, setPosition] = useState(50);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const latestRequest = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!photo) { setOriginalUrl(null); return; }
    const url = URL.createObjectURL(photo);
    setOriginalUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  useEffect(() => {
    return () => latestRequest.current?.abort();
  }, []);

  function onFile(file?: File) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image."); return;
    }
    if (file.size > MAX_BYTES) {
      setError("Please choose a photo under 10 MB."); return;
    }
    latestRequest.current?.abort();
    setBusy(false);
    setPhoto(file);
    setResultUrl(null);
    setError("");
    setPosition(50);
  }

  async function preview() {
    if (!photo || busy) return;
    setBusy(true);
    setError("");
    setResultUrl(null);
    const controller = new AbortController();
    latestRequest.current = controller;
    try {
      const data = new FormData();
      data.append("photo", photo);
      data.append("colorName", selected.name);
      data.append("colorHex", selected.hex);
      const response = await fetch("/api/paint-preview", { method: "POST", body: data, signal: controller.signal });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.image) throw new Error(payload.error || "Unable to generate the preview.");
      setResultUrl(payload.image);
      setPosition(50);
    } catch (e) {
      if (controller.signal.aborted) return;
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      if (latestRequest.current === controller) { setBusy(false); latestRequest.current = null; }
    }
  }

  function chooseColor(color: Color) {
    setSelected(color);
    setCustom(color.hex);
    setResultUrl(null);
  }

  return (
    <section id="visualizer" className="relative scroll-mt-28 overflow-hidden bg-[#f5f8fd] px-5 py-16 text-[#092459] lg:px-8 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-48 h-[430px] w-[430px] rounded-full border-[65px] border-[#dbeaff]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <p className="mb-3 text-sm font-black uppercase tracking-[.22em] text-[#ec7600]">Try Before You Paint</p>
          <h2 className="text-4xl font-black italic tracking-tight sm:text-5xl lg:text-6xl">Visualize Your <span className="text-[#ff8a00]">Project</span></h2>
          <div className="mx-auto mt-4 h-2 w-48 -rotate-2 rounded-full bg-[#ff8a00]" />
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-600">Upload a photo of your space, choose a paint color, and see an AI-generated preview before you paint.</p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[350px_minmax(0,1fr)]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-7">
            <h3 className="mb-4 flex items-center gap-3 text-xl font-black"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#ff8a00] text-white">1</span> Upload Your Space</h3>
            <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e: ChangeEvent<HTMLInputElement>) => onFile(e.target.files?.[0])} aria-label="Upload a photo of your room" />
            <button type="button" onClick={() => inputRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); onFile(e.dataTransfer.files?.[0]); }} className="flex min-h-40 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#a5bbd6] bg-[#f6f9fd] px-4 text-center transition hover:border-[#ff8a00] hover:bg-orange-50">
              <span className="text-4xl" aria-hidden="true">▧</span>
              <span className="font-bold">{photo ? photo.name : "Choose or drop a photo"}</span>
              <span className="text-xs text-slate-500">JPG, PNG, or WebP · Up to 10 MB</span>
            </button>
            <h3 className="mb-4 mt-8 flex items-center gap-3 text-xl font-black"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#ff8a00] text-white">2</span> Choose a Paint Color</h3>
            <div className="grid grid-cols-5 gap-2.5" role="group" aria-label="Paint color swatches">
              {COLORS.map(color => (
                <button key={color.hex} type="button" title={color.name} aria-label={color.name} aria-pressed={selected.hex === color.hex} onClick={() => chooseColor(color)} style={{ backgroundColor: color.hex }} className={`aspect-square rounded-xl border-2 transition hover:scale-105 ${selected.hex === color.hex ? "border-[#ff8a00] ring-2 ring-[#ff8a00] ring-offset-2" : "border-slate-200"}`}>
                  {selected.hex === color.hex && <span className="font-black text-white" style={{ textShadow: "0 1px 3px #000" }}>✓</span>}
                </button>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 p-3">
              <input type="color" value={custom} aria-label="Custom paint color" onChange={e => { const hex = e.target.value.toUpperCase(); setCustom(hex); setSelected({ name: "Custom Color", hex }); setResultUrl(null); }} className="h-11 w-12 cursor-pointer rounded-lg border-0 bg-transparent" />
              <div><div className="font-extrabold">{selected.name}</div><div className="text-sm text-slate-500">{selected.hex.toUpperCase()}</div></div>
            </div>
            <h3 className="mb-4 mt-8 flex items-center gap-3 text-xl font-black"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#ff8a00] text-white">3</span> Preview Your Space</h3>
            <button type="button" onClick={preview} disabled={!photo || busy} className="w-full rounded-full bg-[#ff8a00] px-5 py-4 text-lg font-black text-white shadow-lg transition hover:bg-[#eb7900] disabled:cursor-not-allowed disabled:opacity-50">{busy ? "Creating Your Preview…" : "Preview My Space →"}</button>
            {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
            <p className="mt-4 text-xs leading-relaxed text-slate-500">AI previews are illustrative. Actual paint appearance varies with lighting, surface texture, and screen settings. Please avoid uploading photos containing sensitive personal information.</p>
          </div>

          <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-3 shadow-xl sm:p-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[#e3eaf2] to-[#cad7e7] [container-type:inline-size]" style={{ touchAction: resultUrl ? "pan-y" : "auto" }}>
              {originalUrl ? (
                <>
                  <img src={originalUrl} alt="Original uploaded room" className="absolute inset-0 h-full w-full object-contain" />
                  {resultUrl && <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}><img src={resultUrl} alt="AI preview with selected paint color" className="absolute left-0 top-0 h-full max-w-none object-contain" style={{ width: "100cqw", height: "100%" }} /></div>}
                  {resultUrl && <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-lg" style={{ left: `${position}%` }} />}
                  <span className="absolute left-3 top-3 rounded-full bg-[#092459]/85 px-4 py-2 text-sm font-bold text-white">{resultUrl ? "After" : "Original"}</span>
                  {resultUrl && <span className="absolute right-3 top-3 rounded-full bg-[#ff8a00] px-4 py-2 text-sm font-bold text-white">Before</span>}
                  {busy && <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#092459]/70 px-6 text-center text-white"><span className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-[#ff8a00]" /><span className="text-lg font-black">Reimagining your space…</span><span className="text-sm">This may take a little while.</span></div>}
                </>
              ) : <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center"><span className="text-6xl" aria-hidden="true">🏠</span><p className="max-w-sm text-xl font-black">Your room preview will appear here</p><p className="max-w-sm text-slate-600">Start by uploading a photo of the room you want to paint.</p></div>}
            </div>
            {resultUrl && <div className="mt-5 px-2"><label htmlFor="paint-compare" className="mb-2 block text-sm font-bold">Drag to compare before and after</label><input id="paint-compare" type="range" min="0" max="100" value={position} onChange={e => setPosition(Number(e.target.value))} className="w-full accent-[#ff8a00]" /><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><span className="text-sm font-semibold text-slate-600">Preview: {selected.name}</span><a href={resultUrl} download="kanga-paint-preview.png" className="rounded-full border-2 border-[#073783] px-5 py-2 text-sm font-black text-[#073783] hover:bg-[#073783] hover:text-white">Download Preview ↓</a></div></div>}
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-200 pt-5 text-center text-xs font-extrabold text-[#092459] sm:text-sm"><span>◉ See the Difference</span><span>▤ Explore Paint Colors</span><span>⌂ Visualize Your Space</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
