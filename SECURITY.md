# Security Guidelines

## 🔒 Important Security Information

This document outlines security best practices for the FixUphone application.

## Environment Variables

### Setup

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in your actual values** in `.env.local`

3. **NEVER commit `.env.local`** to version control

### Required Variables

| Variable | Description | How to Get |
|----------|-------------|------------|
| `MONGODB_URI` | MongoDB connection string | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) |
| `JWT_SECRET` | Secret for JWT tokens | Generate: `openssl rand -base64 32` |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID | [EmailJS Dashboard](https://www.emailjs.com/) |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID | [EmailJS Dashboard](https://www.emailjs.com/) |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key | [EmailJS Dashboard](https://www.emailjs.com/) |

### Optional Variables (Admin Setup)

| Variable | Description | Default |
|----------|-------------|---------|
| `ADMIN_USERNAME` | Initial admin username | `admin` |
| `ADMIN_INITIAL_PASSWORD` | Initial admin password | `ChangeMe123!` |
| `ADMIN_EMAIL` | Admin email address | `admin@fixuphone.nl` |

## Database Security

### MongoDB Atlas

1. **Use IP Whitelist**: Only allow connections from trusted IPs
2. **Strong Passwords**: Use long, random passwords (20+ characters)
3. **Rotate Credentials**: Change database passwords regularly
4. **Database User Roles**: Use least-privilege principle
5. **Enable Audit Logs**: Monitor database access

### Connection String Security

- ✅ Store in environment variables
- ✅ Use different credentials for dev/staging/production
- ❌ Never hardcode in source code
- ❌ Never commit to Git
- ❌ Never share in plain text

## JWT Authentication

### Generating a Strong Secret

```bash
# Generate a secure random string
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Best Practices

1. **Use a strong, random secret** (minimum 32 characters)
2. **Different secrets** for each environment
3. **Rotate regularly** (every 90 days recommended)
4. **Never expose** the secret in logs or error messages

## Admin Credentials

### Initial Setup

1. Run the admin creation script:
   ```bash
   node scripts/create-admin.js
   ```

2. **Immediately change the default password** after first login

3. Use a strong password:
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, symbols
   - Not a dictionary word
   - Unique to this application

### Password Management

- ✅ Use a password manager
- ✅ Enable 2FA (when available)
- ✅ Change password every 90 days
- ❌ Don't reuse passwords
- ❌ Don't share credentials
- ❌ Don't write passwords down

## EmailJS Security

### API Keys

- **Public Key**: Safe to expose in client-side code
- **Private Key**: Never include in your repository

### Rate Limiting

Configure rate limits in EmailJS dashboard to prevent abuse.

## Git Security

### .gitignore Configuration

The `.gitignore` file already includes:

```gitignore
.env*           # All environment files
*.pem           # Private keys
*.key           # Key files
```

### Pre-Commit Checks

Before committing, verify:

```bash
# Check for exposed secrets
git diff --cached

# Scan for common secrets patterns
grep -r "MONGODB_URI=mongodb+srv://" .
grep -r "password.*:" . --include="*.ts" --include="*.js"
```

## Deployment Security

### Production Checklist

- [ ] All secrets in environment variables
- [ ] Strong, unique passwords for all services
- [ ] JWT_SECRET is production-grade
- [ ] Admin password changed from default
- [ ] MongoDB IP whitelist configured
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Error messages don't expose sensitive info
- [ ] Logs don't contain secrets

### Environment-Specific Secrets

| Environment | Secret Strength | Rotation Frequency |
|-------------|----------------|-------------------|
| Development | Medium | Rarely |
| Staging | High | Monthly |
| Production | Maximum | Weekly/Monthly |

## Incident Response

### If Credentials Are Exposed

1. **Immediately rotate** all exposed credentials
2. **Revoke** any exposed API keys
3. **Monitor** for unauthorized access
4. **Review** git history and remove secrets
5. **Notify** team members
6. **Update** documentation

### Removing Secrets from Git History

```bash
# Use git-filter-repo (recommended)
git filter-repo --path-glob '**/.env*' --invert-paths

# Or use BFG Repo-Cleaner
bfg --delete-files .env.local
```

## Security Contacts

For security vulnerabilities or concerns:

- **Email**: security@fixuphone.nl
- **Response Time**: Within 24 hours

## Regular Security Tasks

### Weekly
- [ ] Review access logs
- [ ] Check for suspicious activity

### Monthly
- [ ] Update dependencies (`npm audit`)
- [ ] Review security advisories
- [ ] Test backup/recovery procedures

### Quarterly
- [ ] Rotate JWT secrets
- [ ] Rotate database credentials
- [ ] Security audit
- [ ] Update security documentation

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-10-11 | Initial security documentation |

---

**Remember**: Security is an ongoing process, not a one-time setup. Stay vigilant! 🔒

