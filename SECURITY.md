# Security Documentation

## Overview
This document outlines the security measures implemented in the AZ Global Translations application.

## Security Features Implemented

### 1. HTTPS/SSL Encryption
- ✅ SSL certificates from Let's Encrypt
- ✅ Automatic HTTP to HTTPS redirect
- ✅ HSTS (HTTP Strict Transport Security) headers
- ✅ TLS 1.2+ enforced

### 2. Authentication & Authorization
- ✅ JWT-based authentication with HttpOnly cookies
- ✅ Bcrypt password hashing (10 rounds)
- ✅ Secure session management
- ✅ Role-based access control (ADMIN, CLIENT)
- ✅ 7-day token expiration
- ✅ Password minimum length: 8 characters

### 3. Rate Limiting
- ✅ Login: 5 attempts per minute per IP
- ✅ Signup: 3 attempts per hour per IP
- ✅ In-memory rate limiting with automatic cleanup

### 4. Security Headers
- ✅ Strict-Transport-Security (HSTS)
- ✅ X-Frame-Options: SAMEORIGIN (prevents clickjacking)
- ✅ X-Content-Type-Options: nosniff
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Permissions-Policy (camera, microphone, geolocation disabled)

### 5. Input Validation
- ✅ Zod schema validation on all API endpoints
- ✅ Email format validation
- ✅ Password strength requirements
- ✅ Type-safe TypeScript throughout

### 6. SQL Injection Protection
- ✅ Prisma ORM with parameterized queries
- ✅ No raw SQL queries exposed

### 7. XSS Protection
- ✅ React automatic escaping
- ✅ No `dangerouslySetInnerHTML` usage
- ✅ Content Security Policy considerations

### 8. Data Protection
- ✅ Environment variables secured in .env (file permissions: 600)
- ✅ .env in .gitignore
- ✅ Sensitive data never logged
- ✅ Passwords never stored in plain text
- ✅ API keys stored in environment variables only

### 9. File Upload Security
- ✅ Files stored as base64 in PostgreSQL
- ✅ No direct file system access
- ✅ Admin-only download endpoints
- ✅ User ownership validation
- ✅ File size limit: 10MB per file (client & server-side)
- ✅ Accepted file types: PDF, DOC, DOCX, TXT

### 10. API Security
- ✅ Authentication required for all sensitive endpoints
- ✅ Authorization checks (user ownership + admin privileges)
- ✅ CORS properly configured via Next.js
- ✅ Proper error handling without information leakage

### 11. Payment Security
- ✅ Stripe PCI-compliant payment processing
- ✅ No credit card data stored locally
- ✅ Stripe webhook signature verification
- ✅ Live API keys in production

## Security Best Practices

### For Administrators

1. **Keep credentials secure**
   - Never share admin passwords
   - Use strong, unique passwords
   - Change passwords regularly

2. **Monitor logs**
   - Check PM2 logs for suspicious activity: `pm2 logs azglobal`
   - Watch for failed login attempts
   - Monitor rate limit violations

3. **Database backups**
   - Perform regular PostgreSQL backups
   - Store backups securely
   - Test restoration procedures

4. **Updates**
   - Keep Node.js dependencies updated
   - Monitor security advisories
   - Apply security patches promptly

### For Developers

1. **Never commit secrets**
   - Keep .env file out of version control
   - Use environment variables for all secrets
   - Rotate API keys if accidentally exposed

2. **Validate all inputs**
   - Use Zod schemas for API validation
   - Sanitize user inputs
   - Validate file uploads

3. **Follow least privilege**
   - Users can only access their own data
   - Admins have explicit permission checks
   - Database permissions properly scoped

## Known Limitations

### Areas for Improvement (Future Enhancements)

1. **Content Security Policy (CSP)**
   - Consider implementing stricter CSP headers
   - May require testing with Stripe and other third-party scripts

2. **Two-Factor Authentication (2FA)**
   - Not currently implemented
   - Recommended for admin accounts

3. **Rate Limiting**
   - Current: In-memory (resets on server restart)
   - Recommended: Redis-based for persistence across restarts

4. **~~File Size Limits~~** ✅ IMPLEMENTED
   - ✅ 10MB maximum file size enforced
   - ✅ Client-side validation in upload forms
   - ✅ Server-side validation in API endpoints
   - ✅ Prevents DoS via large file uploads

5. **Audit Logging**
   - Implement comprehensive audit trails
   - Track admin actions on user accounts
   - Log order modifications

6. **Password Reset**
   - Implement secure password reset tokens with expiration
   - Add email verification for password changes

7. **Account Lockout**
   - Implement account lockout after repeated failed login attempts
   - Require admin unlock or time-based auto-unlock

8. **Session Management**
   - Consider implementing session invalidation on password change
   - Add "logout all devices" functionality

## Compliance

### GDPR Considerations
- Users can request account deletion (admin can delete users)
- Personal data is stored securely
- Consider adding data export functionality
- Review data retention policies

### PCI DSS
- Stripe handles all credit card processing
- No card data stored on servers
- PCI compliance handled by Stripe

## Incident Response

If you suspect a security breach:

1. Immediately change all passwords and API keys
2. Review server logs for suspicious activity
3. Notify affected users if data was compromised
4. Document the incident
5. Apply fixes to prevent recurrence

## Security Checklist

- [x] HTTPS enabled
- [x] Strong password hashing
- [x] Rate limiting on auth endpoints
- [x] Security headers configured
- [x] SQL injection protection
- [x] XSS protection
- [x] CSRF protection via SameSite cookies
- [x] Secrets in environment variables
- [x] Input validation
- [x] Authorization checks
- [ ] Two-factor authentication (recommended)
- [ ] Redis-based rate limiting (recommended)
- [ ] Comprehensive audit logging (recommended)
- [ ] Regular security audits (recommended)

## Contact

For security concerns or to report vulnerabilities, contact:
- Email: info@azglobaltranslations.com

## Last Updated
October 9, 2025
