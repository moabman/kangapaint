import OpenAI, { toFile } from "openai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 120;
const MAX_BYTES = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "Image preview service is not configured." }, { status: 503 });
    }
    const form = await request.formData();
    const photo = form.get("photo");
    const colorName = String(form.get("colorName") || "Custom Color").slice(0, 60);
    const colorHex = String(form.get("colorHex") || "").toUpperCase();
    if (!(photo instanceof File) || !["image/jpeg", "image/png", "image/webp"].includes(photo.type)) {
      return NextResponse.json({ error: "Upload a JPG, PNG, or WebP photo." }, { status: 400 });
    }
    if (photo.size > MAX_BYTES || photo.size === 0) {
      return NextResponse.json({ error: "Image must be under 10 MB." }, { status: 400 });
    }
    if (!/^#[0-9A-F]{6}$/.test(colorHex)) {
      return NextResponse.json({ error: "Invalid paint color." }, { status: 400 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const image = await toFile(Buffer.from(await photo.arrayBuffer()), photo.name || "room.png", { type: photo.type });
    const result = await client.images.edit({
      model: "gpt-image-1.5",
      image,
      size: "1024x1024",
      quality: "medium",
      prompt: `Photorealistic residential interior paint color visualization. Edit the provided photo, repainting ONLY the visible interior wall surfaces with a realistic paint color named ${colorName}, hexadecimal reference ${colorHex}. Maintain the EXACT same room composition, perspective, camera viewpoint, architecture, furniture, floor, ceiling, doors, windows, window frames, baseboards, casings, wall art, fixtures, lighting, and shadows. Do NOT recolor trim, doors, furniture, ceilings, or flooring. Preserve natural surface texture and realistic light/shadow variation on walls. Do not add or remove objects, crop, stylize, or redesign. The result should look like a real photograph after professional wall painting.`,
    });
    const b64 = result.data?.[0]?.b64_json;
    if (!b64) throw new Error("No image was returned.");
    return NextResponse.json({ image: `data:image/png;base64,${b64}` }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Paint preview generation failed:", error);
    return NextResponse.json({ error: "Could not generate the preview. Please try again." }, { status: 500 });
  }
}
