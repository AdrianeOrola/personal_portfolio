import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-cfcb1d94/health", (c) => {
  return c.json({ status: "ok" });
});

// Contact form → Resend email
app.post("/make-server-cfcb1d94/contact", async (c) => {
  try {
    const { name, email, subject, message } = await c.req.json();

    if (!name || !email || !message) {
      return c.json({ error: "Missing required fields: name, email, message." }, 400);
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.log("RESEND_API_KEY environment variable is not set.");
      return c.json({ error: "Server misconfiguration: missing Resend API key." }, 500);
    }

    const emailSubject = subject?.trim()
      ? `[Portfolio Contact] ${subject}`
      : `[Portfolio Contact] New message from ${name}`;

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111;">
        <h2 style="margin-bottom:4px;">New contact form submission</h2>
        <p style="color:#6b7280;margin-top:0;font-size:14px;">From your portfolio at adrianeorola.dev</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
        <table style="width:100%;font-size:15px;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#6b7280;width:90px;vertical-align:top;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#6366f1;">${email}</a></td></tr>
          ${subject ? `<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Subject</td><td style="padding:8px 0;">${subject}</td></tr>` : ""}
        </table>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
        <p style="font-size:14px;color:#6b7280;margin-bottom:6px;">Message</p>
        <div style="background:#f9fafb;border-radius:8px;padding:16px;font-size:15px;white-space:pre-wrap;line-height:1.6;">${message}</div>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
        <p style="font-size:12px;color:#9ca3af;">Reply directly to this email to respond to ${name}.</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["adrianeorola10@gmail.com"],
        reply_to: email,
        subject: emailSubject,
        html,
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.log(`Resend API error (${res.status}): ${errorBody}`);
      return c.json({ error: `Failed to send email via Resend: ${errorBody}` }, 502);
    }

    const data = await res.json();
    console.log(`Email sent successfully via Resend. ID: ${data.id}`);
    return c.json({ success: true, id: data.id });
  } catch (err) {
    console.log(`Unexpected error in /contact route: ${err}`);
    return c.json({ error: `Internal server error: ${err}` }, 500);
  }
});

Deno.serve(app.fetch);