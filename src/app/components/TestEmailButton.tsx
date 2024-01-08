"use client";
import React from 'react'
import { sendEmail } from '../actions/emails/sendEmail';
import { EmailTemplate } from '../email-templates/test-email';
import { Button } from '@/components/ui/button';

const TestEmailButton = () => {

    const handleSubmit = async () => {
        sendEmail({
            from: 'Acme <onboarding@resend.dev>',
            to: ["arsalan1664@gmail.com"],
            subject: 'Test Email',
            // text: 'This is a test email',
            // html: '<h1>This is a test email</h1>'
            react: EmailTemplate({firstName: "arsalan"}) as React.ReactElement
        });
    }

  return (
    <Button onClick={handleSubmit}>
        Send Test Email
    </Button>
  )
}

export default TestEmailButton