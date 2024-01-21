import { NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { email, message, name, phone } = body;

  try {
    const data = await resend.emails.send({
      from: "Auto Drop <onboarding@resend.dev>",
      to: "support@autodrop.me",
      reply_to: email,
      subject: "New Message From Auto Drop Contact Form",
      text: "",
      react: EmailTemplate({ name, phone, message, email }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
