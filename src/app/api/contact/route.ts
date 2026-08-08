import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/config/site";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      company,
      services,
      budget,
      timeline,
      projectType,
      message,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, message)" },
        { status: 400 }
      );
    }

    // SMTP credentials from environment or defaults
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || siteConfig.contact.email;

    const servicesList = Array.isArray(services) ? services.join(", ") : services || "N/A";

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF7F2; padding: 24px; border-radius: 12px; border: 1px solid #E2D9CC;">
        <h2 style="color: #6C4E31; margin-top: 0;">🚀 New Project Inquiry from ${name}</h2>
        <hr style="border: 0; border-top: 1px solid #D1C4B2; margin: 16px 0;" />
        
        <table style="width: 100%; border-collapse: collapse; font-size: 15px; color: #2D251E;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td><td>${name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td><a href="tel:${phone}">${phone || "N/A"}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Company:</td><td>${company || "N/A"}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Project Type:</td><td>${projectType || "N/A"}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Services:</td><td>${servicesList}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Budget Range:</td><td>${budget || "N/A"}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Timeline:</td><td>${timeline || "N/A"}</td></tr>
        </table>

        <div style="margin-top: 20px; background: #FFFFFF; padding: 16px; border-radius: 8px; border: 1px solid #E5E0D8;">
          <h3 style="margin-top: 0; color: #4A3521; font-size: 14px; text-transform: uppercase;">Message Details:</h3>
          <p style="white-space: pre-wrap; font-size: 14px; color: #333; line-height: 1.6; margin: 0;">${message}</p>
        </div>

        <div style="margin-top: 24px; font-size: 12px; color: #888; text-align: center;">
          Sent from Zentrix Technology Contact Form (${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })})
        </div>
      </div>
    `;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${name} via Zentrix" <${smtpUser}>`,
        to: receiverEmail,
        replyTo: email,
        subject: `New Client Inquiry: ${name} (${servicesList})`,
        html: htmlContent,
      });
    } else {
      console.log("=== CONTACT FORM SUBMISSION (SMTP credentials not configured) ===");
      console.log({ name, email, phone, company, services: servicesList, budget, timeline, projectType, message });
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
