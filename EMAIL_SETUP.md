# Email Setup Guide for FixUphone

## Option 1: EmailJS (Recommended - No Backend Required)

### Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Set Up Email Service

1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**service_79rn7rj

### Step 3: Create Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template content:

```html
Subject: Booking Confirmation - {{booking_id}} Dear {{customer_name}}, Thank you for booking your device repair with FixUphone! Booking
Details: - Booking ID: {{booking_id}} - Device: {{device_type}} - {{device_brand}} {{device_model}} - Service: {{service}} - Preferred Date:
{{preferred_date}} - Preferred Time: {{preferred_time}} {{#issue}} Probleem beschrijving: {{issue}} {{/issue}} We will contact you within 24
hours to confirm your appointment. Contact Information: - Phone: {{business_phone}} - Email: {{business_email}} - Address:
{{business_address}} Best regards, The FixUphone Team
```

4. Note down your **Template ID**

### Step 4: Get Public Key

1. Go to "Account" → "General"
2. Copy your **Public Key**

### Step 5: Update Configuration

1. Open `src/lib/email-service.ts`
2. Replace the placeholder values:
   ```typescript
   const EMAILJS_SERVICE_ID = "your_service_id"; // Replace with your Service ID
   const EMAILJS_TEMPLATE_ID = "your_template_id"; // Replace with your Template ID
   const EMAILJS_PUBLIC_KEY = "your_public_key"; // Replace with your Public Key
   ```

### Step 6: Test

1. Submit a test booking
2. Check if the confirmation email is received
3. Check browser console for any errors

---

## Option 2: Backend API (More Advanced)

If you prefer a backend solution, you can:

1. **Create a Next.js API route** (`/api/send-booking-email`)
2. **Use a service like**:
   - SendGrid
   - Mailgun
   - AWS SES
   - Nodemailer with SMTP

### Example API Route Structure:

```typescript
// pages/api/send-booking-email.ts
import { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Send email using your preferred service
    // Return success/error response
  } catch (error) {
    res.status(500).json({ message: "Failed to send email" });
  }
}
```

---

## Option 3: Third-Party Form Services

You can also use services like:

- **Formspree**: Simple form handling with email notifications
- **Netlify Forms**: If hosting on Netlify
- **Typeform**: Advanced form builder with email integrations

---

## Testing Your Setup

1. **Submit a test booking** with your own email
2. **Check spam folder** if email doesn't arrive
3. **Verify all template variables** are populated correctly
4. **Test with different device types** (phone, tablet, other)

## Troubleshooting

- **Email not sending**: Check EmailJS dashboard for error logs
- **Template variables not working**: Ensure variable names match exactly
- **Rate limits**: Free EmailJS accounts have limits (200 emails/month)
- **Spam issues**: Add proper SPF/DKIM records to your domain

## Security Notes

- **Never expose API keys** in client-side code for production
- **Use environment variables** for sensitive configuration
- **Validate email addresses** before sending
- **Implement rate limiting** to prevent abuse
