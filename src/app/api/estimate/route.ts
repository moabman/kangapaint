
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { name, phone, zip, projectType, message } = data;

    if (
      typeof name !== "string" ||
      typeof phone !== "string" ||
      typeof zip !== "string" ||
      typeof projectType !== "string" ||
      !name.trim() ||
      !phone.trim() ||
      !/^\d{5}$/.test(zip) ||
      !projectType.trim() ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.ESTIMATE_EMAIL;

    if (!apiKey || !recipient) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Kanga Paint <estimates@kangapaint.com>",
        to: [recipient],
        subject: "New Kanga Paint Estimate Request",
        text: [
          `Name: ${name}`,
          `Phone: ${phone}`,
          `ZIP Code: ${zip}`,
          `Project Type: ${projectType}`,
          "",
          "Project Details:",
          message,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      console.error("Resend error:", response.status);
      return NextResponse.json(
        { error: "Unable to send estimate request." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
