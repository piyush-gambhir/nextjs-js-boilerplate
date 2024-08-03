"use client";
import React from "react";
import ImageUpload from "@/components/common/upload/ImageUpload";
import TestEmail from "@/emails/test";
import { sendEmail } from "@/lib/email/resend/sendEmail";

export default function Home({ searchParams }) {
  const handleSendEmail = async () => {
    await sendEmail(
      "developer.piyushgambhir@gmail.com",
      "Test Email",
      <TestEmail />,
    );
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-y-12">
      {/* <span className="text-4xl font-medium">Next.js JS Boilerplate</span> */}
      <ImageUpload />
      <button
        onClick={handleSendEmail}
        className="rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        Send Email
      </button>
    </div>
  );
}
