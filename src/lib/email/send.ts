import { Resend } from "resend";

type SendEmailInput = Readonly<{
  subject: string;
  html: string;
  replyTo?: string;
}>;

export async function sendNotificationEmail({
  subject,
  html,
  replyTo,
}: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();

  if (!apiKey || !from || !to) {
    return {
      sent: false as const,
      skipped: true as const,
      id: null,
      error: null,
    };
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    html,
    replyTo,
  });

  if (error) {
    return {
      sent: false as const,
      skipped: false as const,
      id: null,
      error: error.message,
    };
  }

  return {
    sent: true as const,
    skipped: false as const,
    id: data?.id ?? null,
    error: null,
  };
}
