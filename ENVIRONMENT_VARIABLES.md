# Environment Variables for Plesk Deployment

## Required Environment Variables

### 1. EmailJS Configuration

These are the **ONLY** environment variables you need to set in Plesk:

```bash
NODE_ENV=production
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## How to Get EmailJS Credentials

### Step 1: Login to EmailJS

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Login to your account

### Step 2: Get Service ID

1. Go to **"Email Services"**
2. Find your service (Gmail, Outlook, etc.)
3. Copy the **Service ID** (format: `service_xxxxxxx`)

### Step 3: Get Template ID

1. Go to **"Email Templates"**
2. Find your template
3. Copy the **Template ID** (format: `template_xxxxxxx`)

### Step 4: Get Public Key

1. Go to **"Account"** → **"General"**
2. Find **"Public Key"**
3. Copy the key (format: `xxxxxxxxxxxxxxxx`)

## Setting Environment Variables in Plesk

### Method 1: Node.js Environment Variables (Recommended)

1. **Login to Plesk Panel**
2. **Go to "Websites & Domains"**
3. **Click on your domain**
4. **Go to "Node.js" section**
5. **Click on your application**
6. **Go to "Environment Variables"**
7. **Add each variable:**

| Variable Name                     | Value            | Example             |
| --------------------------------- | ---------------- | ------------------- |
| `NODE_ENV`                        | `production`     | `production`        |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID`  | Your Service ID  | `service_79rn7rj`   |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Your Template ID | `template_dkfas1d`  |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`  | Your Public Key  | `drVkntw7ORJJp63Zk` |

### Method 2: .env File (Alternative)

1. **Create `.env.local` file in your app root**
2. **Add the variables:**

```env
NODE_ENV=production
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Security Best Practices

### ✅ DO:

- Use **different credentials** for production
- Store credentials in **Plesk's environment variables**
- **Never commit** `.env` files to Git
- **Rotate keys** regularly
- Use **strong, unique** public keys

### ❌ DON'T:

- Use development credentials in production
- Share credentials in plain text
- Commit `.env` files to version control
- Use weak or default passwords
- Share API keys in chat/email

## Testing Your Configuration

### 1. Check Environment Variables

Add this to your application to verify variables are loaded:

```javascript
console.log("EmailJS Service ID:", process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
console.log("EmailJS Template ID:", process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
console.log("EmailJS Public Key:", process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
```

### 2. Test Email Functionality

1. Submit a test booking
2. Check if confirmation email is sent
3. Verify email content and formatting

### 3. Check Plesk Logs

1. Go to **"Logs"** in Plesk
2. Check **"Error Logs"** for any issues
3. Monitor **"Access Logs"** for requests

## Troubleshooting

### Common Issues:

**1. "EmailJS not configured" error:**

- Check if environment variables are set correctly
- Verify variable names (case-sensitive)
- Restart your Node.js application

**2. "Service not found" error:**

- Verify Service ID is correct
- Check if service is active in EmailJS dashboard
- Ensure service is properly configured

**3. "Template not found" error:**

- Verify Template ID is correct
- Check if template is published
- Ensure template has correct variables

**4. "Invalid public key" error:**

- Verify Public Key is correct
- Check if key is active
- Ensure key has proper permissions

## Quick Checklist

- [ ] EmailJS account created
- [ ] Email service configured
- [ ] Email template created
- [ ] Public key obtained
- [ ] Environment variables set in Plesk
- [ ] Node.js application restarted
- [ ] Email functionality tested
- [ ] Error logs checked
- [ ] SSL certificate installed
- [ ] Application accessible via HTTPS

## Support

- **EmailJS Documentation**: https://www.emailjs.com/docs/
- **Plesk Documentation**: https://docs.plesk.com/
- **Next.js Environment Variables**: https://nextjs.org/docs/basic-features/environment-variables
