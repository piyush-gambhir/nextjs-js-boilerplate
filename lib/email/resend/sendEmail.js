import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ email, subject, body }) {
  const { error } = await resend.emails.send({
    from: "Next.js JavaScript Boilerplate<noreply@test.com>",
    to: email,
    subject,
    react: <>{body}</>,
  });

  if (error) {
    throw error;
  }
}
