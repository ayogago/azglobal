import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    });

    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
}

// Email Template Wrapper - Works across all email clients
function getEmailTemplate(content: string) {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>AZ Global Translations</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4; padding: 20px 0;">
        <tr>
          <td align="center">
            <!-- Main Container -->
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">

              <!-- Logo Header -->
              <tr>
                <td style="background-color: #ffffff; padding: 40px 20px; text-align: center; border-bottom: 3px solid #0066cc;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center">
                        <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="display: inline-block; text-decoration: none;">
                          <img src="${process.env.NEXT_PUBLIC_APP_URL}/logo.png" alt="AZ Global Translations" style="width: 240px; height: auto; display: block; margin: 0 auto 15px;" />
                        </a>
                        <div style="color: #2c3e50; font-size: 14px; margin: 5px 0 0; font-weight: 500;">Precision in Every Word. Speed in Every Project.</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  ${content}
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 3px solid #0066cc;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center">
                        <div style="color: #666666; font-size: 14px; margin-bottom: 10px;">
                          <strong>AZ Global Translations</strong>
                        </div>
                        <div style="color: #999999; font-size: 12px; line-height: 1.6;">
                          Professional Translation Services<br/>
                          Email: info@azglobaltranslations.com<br/>
                          <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color: #0066cc; text-decoration: none;">${process.env.NEXT_PUBLIC_APP_URL}</a>
                        </div>
                        <div style="margin-top: 15px;">
                          <a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/dashboard" style="display: inline-block; color: #0066cc; text-decoration: none; font-size: 12px; margin: 0 10px;">Dashboard</a>
                          <span style="color: #cccccc;">|</span>
                          <a href="${process.env.NEXT_PUBLIC_APP_URL}/contact" style="display: inline-block; color: #0066cc; text-decoration: none; font-size: 12px; margin: 0 10px;">Contact Us</a>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// Email Templates

export async function sendWelcomeEmail(to: string, name: string) {
  const subject = 'Welcome to AZ Global Translations!';
  const content = `
    <h2 style="color: #0066cc; margin: 0 0 20px; font-size: 26px;">Hello ${name}!</h2>
    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 15px;">Thank you for creating an account with us. We're excited to help you with all your translation needs.</p>

    <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #0066cc; margin: 25px 0;">
      <p style="color: #333333; font-size: 16px; margin: 0 0 10px;"><strong>What you can do:</strong></p>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding: 5px 0;">
            <span style="color: #0066cc; margin-right: 10px;">✓</span>
            <span style="color: #666666;">Request professional translation services</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 5px 0;">
            <span style="color: #0066cc; margin-right: 10px;">✓</span>
            <span style="color: #666666;">Track your orders in real-time</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 5px 0;">
            <span style="color: #0066cc; margin-right: 10px;">✓</span>
            <span style="color: #666666;">Manage all your documents in one place</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 5px 0;">
            <span style="color: #0066cc; margin-right: 10px;">✓</span>
            <span style="color: #666666;">Get certified translations when needed</span>
          </td>
        </tr>
      </table>
    </div>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
      <tr>
        <td align="center" style="border-radius: 5px; background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/dashboard" style="display: inline-block; padding: 15px 40px; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px;">Go to Dashboard</a>
        </td>
      </tr>
    </table>

    <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 20px 0 0;">If you have any questions, feel free to reach out to us at <a href="mailto:info@azglobaltranslations.com" style="color: #0066cc; text-decoration: none;">info@azglobaltranslations.com</a></p>
  `;
  const html = getEmailTemplate(content);
  return sendEmail({ to, subject, html });
}

export async function sendPasswordResetEmail(to: string, name: string, resetToken: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/portal/reset-password?token=${resetToken}`;
  const subject = 'Password Reset Request';
  const content = `
    <h2 style="color: #0066cc; margin: 0 0 20px; font-size: 26px;">Password Reset Request</h2>
    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 15px;">Hello ${name},</p>
    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 15px;">We received a request to reset your password for your AZ Global Translations account.</p>
    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">Click the button below to reset your password:</p>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
      <tr>
        <td align="center" style="border-radius: 5px; background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);">
          <a href="${resetUrl}" style="display: inline-block; padding: 15px 40px; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px;">Reset Password</a>
        </td>
      </tr>
    </table>

    <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 25px 0;">
      <p style="color: #856404; font-size: 14px; font-weight: bold; margin: 0 0 10px;">⚠️ Security Notice:</p>
      <p style="color: #856404; font-size: 14px; line-height: 1.6; margin: 0 0 8px;">• This link will expire in 1 hour for security reasons.</p>
      <p style="color: #856404; font-size: 14px; line-height: 1.6; margin: 0;">• If you didn't request this password reset, please ignore this email or contact us if you have concerns.</p>
    </div>

    <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 20px 0 0;">If the button doesn't work, copy and paste this link into your browser:</p>
    <p style="color: #0066cc; font-size: 12px; word-break: break-all; margin: 10px 0;">${resetUrl}</p>
  `;
  const html = getEmailTemplate(content);
  return sendEmail({ to, subject, html });
}

export async function sendOrderConfirmationEmail(to: string, name: string, orderDetails: any) {
  const subject = `Order Confirmation - ${orderDetails.orderNumber || 'New Order'}`;
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="background-color: #d4edda; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 20px; display: inline-block; line-height: 80px;">
        <span style="color: #155724; font-size: 40px;">✓</span>
      </div>
      <h2 style="color: #28a745; margin: 0 0 10px; font-size: 28px;">Order Confirmed!</h2>
    </div>

    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 15px;">Thank you, <strong>${name}</strong>!</p>
    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">Your translation order has been received and is being processed by our team.</p>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8f9fa; border-radius: 8px; overflow: hidden; margin: 25px 0;">
      <tr>
        <td style="padding: 20px;">
          <h3 style="color: #0066cc; margin: 0 0 15px; font-size: 18px;">Order Details</h3>
          ${orderDetails.orderNumber ? `
            <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%" style="border-bottom: 1px solid #dee2e6;">
              <tr>
                <td style="color: #666666; font-size: 14px;"><strong>Order Number:</strong></td>
                <td style="color: #333333; font-size: 14px; text-align: right;"><strong>${orderDetails.orderNumber}</strong></td>
              </tr>
            </table>
          ` : ''}
          <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%" style="border-bottom: 1px solid #dee2e6;">
            <tr>
              <td style="color: #666666; font-size: 14px;">From Language:</td>
              <td style="color: #333333; font-size: 14px; text-align: right;">${orderDetails.fromLanguage}</td>
            </tr>
          </table>
          <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%" style="border-bottom: 1px solid #dee2e6;">
            <tr>
              <td style="color: #666666; font-size: 14px;">To Language:</td>
              <td style="color: #333333; font-size: 14px; text-align: right;">${orderDetails.toLanguage}</td>
            </tr>
          </table>
          <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%" style="border-bottom: 1px solid #dee2e6;">
            <tr>
              <td style="color: #666666; font-size: 14px;">Document Type:</td>
              <td style="color: #333333; font-size: 14px; text-align: right;">${orderDetails.documentType}</td>
            </tr>
          </table>
          <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%" style="border-bottom: 1px solid #dee2e6;">
            <tr>
              <td style="color: #666666; font-size: 14px;">Service:</td>
              <td style="color: #333333; font-size: 14px; text-align: right;">${orderDetails.serviceType}</td>
            </tr>
          </table>
          ${orderDetails.wordCount ? `
            <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%" style="border-bottom: 1px solid #dee2e6;">
              <tr>
                <td style="color: #666666; font-size: 14px;">Word Count:</td>
                <td style="color: #333333; font-size: 14px; text-align: right;">${orderDetails.wordCount}</td>
              </tr>
            </table>
          ` : ''}
          <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%">
            <tr>
              <td style="color: #666666; font-size: 16px;"><strong>Total:</strong></td>
              <td style="color: ${orderDetails.totalPrice > 0 ? '#0066cc' : '#ff8c00'}; font-size: 20px; font-weight: bold; text-align: right;">${orderDetails.totalPrice > 0 ? '$' + orderDetails.totalPrice.toFixed(2) : 'TBD'}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 25px 0;">We'll notify you once your translation is ready!</p>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
      <tr>
        <td align="center" style="border-radius: 5px; background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/orders" style="display: inline-block; padding: 15px 40px; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px;">View Order Status</a>
        </td>
      </tr>
    </table>
  `;
  const html = getEmailTemplate(content);
  return sendEmail({ to, subject, html });
}

export async function sendOrderCompletionEmail(to: string, name: string, orderDetails: any) {
  const downloadUrl = `${process.env.NEXT_PUBLIC_APP_URL}/portal/dashboard`;
  const subject = `✓ Translation Complete - ${orderDetails.orderNumber || 'Your Order'}`;
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="background-color: #d4edda; border-radius: 50%; width: 100px; height: 100px; margin: 0 auto 20px; display: inline-block; line-height: 100px;">
        <span style="color: #28a745; font-size: 50px;">🎉</span>
      </div>
      <h2 style="color: #28a745; margin: 0 0 10px; font-size: 28px;">Your Translation is Ready!</h2>
    </div>

    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 15px;">Hello <strong>${name}</strong>,</p>
    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">Great news! Your translation has been completed and is ready for download.</p>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #e7f3ff; border-radius: 8px; overflow: hidden; margin: 25px 0;">
      <tr>
        <td style="padding: 25px; text-align: center;">
          <h3 style="color: #0066cc; margin: 0 0 10px; font-size: 20px;">${orderDetails.orderNumber || 'Your Order'}</h3>
          <p style="color: #666666; font-size: 14px; margin: 0;">${orderDetails.fromLanguage} → ${orderDetails.toLanguage}</p>
        </td>
      </tr>
    </table>

    <div style="background-color: #d1ecf1; border-left: 4px solid #0c5460; padding: 20px; margin: 25px 0;">
      <p style="color: #0c5460; font-size: 14px; font-weight: bold; margin: 0 0 10px;">🔒 Secure Download</p>
      <p style="color: #0c5460; font-size: 14px; line-height: 1.6; margin: 0;">For your security, you need to be logged in to your account to download your translated files. Click the button below to access your dashboard.</p>
    </div>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
      <tr>
        <td align="center" style="border-radius: 5px; background: linear-gradient(135deg, #28a745 0%, #218838 100%);">
          <a href="${downloadUrl}" style="display: inline-block; padding: 18px 45px; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 18px;">Download Your Files</a>
        </td>
      </tr>
    </table>

    <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 20px 0 0; text-align: center;">You can also access your files anytime from your <a href="${downloadUrl}" style="color: #0066cc; text-decoration: none;">dashboard</a>.</p>

    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 0;">Thank you for choosing AZ Global Translations!</p>
    <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 10px 0 0;">If you have any questions or concerns about your translation, please don't hesitate to contact us.</p>
  `;
  const html = getEmailTemplate(content);
  return sendEmail({ to, subject, html });
}

export async function sendFolderCreatedEmail(to: string, name: string, folderName: string) {
  const subject = `New Folder Created - ${folderName}`;
  const content = `
    <h2 style="color: #0066cc; margin: 0 0 20px; font-size: 26px;">Hello ${name},</h2>
    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">A new folder has been created for your translation project.</p>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8f9fa; border-radius: 8px; overflow: hidden; margin: 25px 0;">
      <tr>
        <td style="padding: 30px; text-align: center;">
          <div style="font-size: 50px; margin-bottom: 15px;">📁</div>
          <h3 style="color: #0066cc; margin: 0; font-size: 22px;">${folderName}</h3>
        </td>
      </tr>
    </table>

    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 25px 0;">You can now upload your documents to this folder and track the translation progress.</p>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
      <tr>
        <td align="center" style="border-radius: 5px; background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/folders" style="display: inline-block; padding: 15px 40px; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px;">View Folder</a>
        </td>
      </tr>
    </table>
  `;
  const html = getEmailTemplate(content);
  return sendEmail({ to, subject, html });
}

export async function sendPricingReadyEmail(to: string, name: string, orderDetails: any) {
  const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL}/portal/login`;
  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/portal/dashboard`;
  const subject = `💰 Pricing Ready for Order - ${orderDetails.orderNumber || 'Your Order'}`;
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="background-color: #d1ecf1; border-radius: 50%; width: 100px; height: 100px; margin: 0 auto 20px; display: inline-block; line-height: 100px;">
        <span style="color: #0c5460; font-size: 50px;">💰</span>
      </div>
      <h2 style="color: #0066cc; margin: 0 0 10px; font-size: 28px;">Your Quote is Ready!</h2>
    </div>

    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 15px;">Hello <strong>${name}</strong>,</p>
    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">Our Team has reviewed your document and set the pricing for your translation order. You can now proceed with payment to start the translation process.</p>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8f9fa; border-radius: 8px; overflow: hidden; margin: 25px 0;">
      <tr>
        <td style="padding: 20px;">
          <h3 style="color: #0066cc; margin: 0 0 15px; font-size: 18px;">Order Details</h3>
          ${orderDetails.orderNumber ? `
            <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%" style="border-bottom: 1px solid #dee2e6;">
              <tr>
                <td style="color: #666666; font-size: 14px;"><strong>Order Number:</strong></td>
                <td style="color: #333333; font-size: 14px; text-align: right;"><strong>${orderDetails.orderNumber}</strong></td>
              </tr>
            </table>
          ` : ''}
          <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%" style="border-bottom: 1px solid #dee2e6;">
            <tr>
              <td style="color: #666666; font-size: 14px;">From Language:</td>
              <td style="color: #333333; font-size: 14px; text-align: right;">${orderDetails.fromLanguage}</td>
            </tr>
          </table>
          <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%" style="border-bottom: 1px solid #dee2e6;">
            <tr>
              <td style="color: #666666; font-size: 14px;">To Language:</td>
              <td style="color: #333333; font-size: 14px; text-align: right;">${orderDetails.toLanguage}</td>
            </tr>
          </table>
          <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%">
            <tr>
              <td style="color: #666666; font-size: 16px;"><strong>Total Price:</strong></td>
              <td style="color: #28a745; font-size: 24px; font-weight: bold; text-align: right;">$${orderDetails.totalPrice?.toFixed(2)}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 25px 0;">
      <p style="color: #856404; font-size: 14px; font-weight: bold; margin: 0 0 10px;">⚡ Action Required</p>
      <p style="color: #856404; font-size: 14px; line-height: 1.6; margin: 0;">Please log in to your account to review the pricing and complete the payment. Once paid, our team will start working on your translation immediately.</p>
    </div>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
      <tr>
        <td align="center" style="border-radius: 5px; background: linear-gradient(135deg, #28a745 0%, #218838 100%);">
          <a href="${dashboardUrl}" style="display: inline-block; padding: 18px 45px; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 18px;">View Order & Pay</a>
        </td>
      </tr>
    </table>

    <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 20px 0 0; text-align: center;">
      Don't have your password? <a href="${loginUrl}" style="color: #0066cc; text-decoration: none;">Reset it here</a>
    </p>

    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 0;">Thank you for choosing AZ Global Translations!</p>
    <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 10px 0 0;">If you have any questions about the pricing, please don't hesitate to contact us.</p>
  `;
  const html = getEmailTemplate(content);
  return sendEmail({ to, subject, html });
}

export async function sendGuestOrderPricingReadyEmail(to: string, orderDetails: any, token: string) {
  const completeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/complete-order?id=${orderDetails.id}&token=${token}`;
  const subject = `💰 Your Quote is Ready - Complete Your Order`;
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="background-color: #d1ecf1; border-radius: 50%; width: 100px; height: 100px; margin: 0 auto 20px; display: inline-block; line-height: 100px;">
        <span style="color: #0c5460; font-size: 50px;">💰</span>
      </div>
      <h2 style="color: #0066cc; margin: 0 0 10px; font-size: 28px;">Your Quote is Ready!</h2>
    </div>

    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 15px;">Hello,</p>
    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">Our Team has reviewed your document and set the pricing for your translation order. You can now complete your order by providing payment and creating your account.</p>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8f9fa; border-radius: 8px; overflow: hidden; margin: 25px 0;">
      <tr>
        <td style="padding: 20px;">
          <h3 style="color: #0066cc; margin: 0 0 15px; font-size: 18px;">Order Details</h3>
          ${orderDetails.orderNumber ? `
            <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%" style="border-bottom: 1px solid #dee2e6;">
              <tr>
                <td style="color: #666666; font-size: 14px;"><strong>Order Number:</strong></td>
                <td style="color: #333333; font-size: 14px; text-align: right;"><strong>${orderDetails.orderNumber}</strong></td>
              </tr>
            </table>
          ` : ''}
          <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%" style="border-bottom: 1px solid #dee2e6;">
            <tr>
              <td style="color: #666666; font-size: 14px;">From Language:</td>
              <td style="color: #333333; font-size: 14px; text-align: right;">${orderDetails.fromLanguage}</td>
            </tr>
          </table>
          <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%" style="border-bottom: 1px solid #dee2e6;">
            <tr>
              <td style="color: #666666; font-size: 14px;">To Language:</td>
              <td style="color: #333333; font-size: 14px; text-align: right;">${orderDetails.toLanguage}</td>
            </tr>
          </table>
          <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%">
            <tr>
              <td style="color: #666666; font-size: 16px;"><strong>Total Price:</strong></td>
              <td style="color: #28a745; font-size: 24px; font-weight: bold; text-align: right;">$${orderDetails.totalPrice?.toFixed(2)}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 25px 0;">
      <p style="color: #856404; font-size: 14px; font-weight: bold; margin: 0 0 10px;">⚡ Complete Your Order</p>
      <p style="color: #856404; font-size: 14px; line-height: 1.6; margin: 0;">Click the button below to complete payment and set up your account. You'll be able to track your translation progress and download your completed files.</p>
    </div>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
      <tr>
        <td align="center" style="border-radius: 5px; background: linear-gradient(135deg, #28a745 0%, #218838 100%);">
          <a href="${completeUrl}" style="display: inline-block; padding: 18px 45px; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 18px;">Complete Order & Pay</a>
        </td>
      </tr>
    </table>

    <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 20px 0 0; text-align: center;">This link is secure and unique to your order.</p>

    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 0;">Thank you for choosing AZ Global Translations!</p>
    <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 10px 0 0;">If you have any questions about the pricing, please don't hesitate to contact us.</p>
  `;
  const html = getEmailTemplate(content);
  return sendEmail({ to, subject, html });
}

export async function sendAdminOrderNotification(orderDetails: any, customerEmail: string) {
  const adminEmail = process.env.SMTP_FROM || 'info@azglobaltranslations.com';
  const subject = `🔔 New Order Received - ${orderDetails.orderNumber || 'Order #' + orderDetails.id?.slice(-6)}`;
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="background-color: #d4edda; border-radius: 50%; width: 100px; height: 100px; margin: 0 auto 20px; display: inline-block; line-height: 100px;">
        <span style="color: #28a745; font-size: 50px;">🔔</span>
      </div>
      <h2 style="color: #28a745; margin: 0 0 10px; font-size: 28px;">New Order Received!</h2>
    </div>

    <div style="background-color: #e7f3ff; border-left: 4px solid #0066cc; padding: 20px; margin: 25px 0;">
      <p style="color: #0066cc; font-size: 14px; font-weight: bold; margin: 0 0 10px;">👤 Customer Information</p>
      <p style="color: #333333; font-size: 16px; margin: 0;"><strong>Email:</strong> ${customerEmail}</p>
    </div>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8f9fa; border-radius: 8px; overflow: hidden; margin: 25px 0;">
      <tr>
        <td style="padding: 20px;">
          <h3 style="color: #0066cc; margin: 0 0 15px; font-size: 18px;">Order Details</h3>
          ${orderDetails.orderNumber ? `
            <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%" style="border-bottom: 1px solid #dee2e6;">
              <tr>
                <td style="color: #666666; font-size: 14px;"><strong>Order Number:</strong></td>
                <td style="color: #333333; font-size: 14px; text-align: right;"><strong>${orderDetails.orderNumber}</strong></td>
              </tr>
            </table>
          ` : ''}
          <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%" style="border-bottom: 1px solid #dee2e6;">
            <tr>
              <td style="color: #666666; font-size: 14px;">From Language:</td>
              <td style="color: #333333; font-size: 14px; text-align: right;">${orderDetails.fromLanguage}</td>
            </tr>
          </table>
          <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%" style="border-bottom: 1px solid #dee2e6;">
            <tr>
              <td style="color: #666666; font-size: 14px;">To Language:</td>
              <td style="color: #333333; font-size: 14px; text-align: right;">${orderDetails.toLanguage}</td>
            </tr>
          </table>
          <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%" style="border-bottom: 1px solid #dee2e6;">
            <tr>
              <td style="color: #666666; font-size: 14px;">Document Type:</td>
              <td style="color: #333333; font-size: 14px; text-align: right;">${orderDetails.documentType}</td>
            </tr>
          </table>
          <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%" style="border-bottom: 1px solid #dee2e6;">
            <tr>
              <td style="color: #666666; font-size: 14px;">Service:</td>
              <td style="color: #333333; font-size: 14px; text-align: right;">${orderDetails.serviceType}</td>
            </tr>
          </table>
          ${orderDetails.wordCount ? `
            <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%" style="border-bottom: 1px solid #dee2e6;">
              <tr>
                <td style="color: #666666; font-size: 14px;">Word Count:</td>
                <td style="color: #333333; font-size: 14px; text-align: right;">${orderDetails.wordCount}</td>
              </tr>
            </table>
          ` : ''}
          <table role="presentation" border="0" cellpadding="8" cellspacing="0" width="100%">
            <tr>
              <td style="color: #666666; font-size: 16px;"><strong>Total:</strong></td>
              <td style="color: ${orderDetails.totalPrice > 0 ? '#28a745' : '#ff8c00'}; font-size: 20px; font-weight: bold; text-align: right;">${orderDetails.totalPrice > 0 ? '$' + orderDetails.totalPrice.toFixed(2) : 'TBD'}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 25px 0;">
      <p style="color: #856404; font-size: 14px; font-weight: bold; margin: 0 0 10px;">⚡ Action Required</p>
      <p style="color: #856404; font-size: 14px; line-height: 1.6; margin: 0;">Please process this order and contact the customer if needed.</p>
    </div>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
      <tr>
        <td align="center" style="border-radius: 5px; background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/dashboard" style="display: inline-block; padding: 18px 45px; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 18px;">View in Dashboard</a>
        </td>
      </tr>
    </table>
  `;
  const html = getEmailTemplate(content);
  return sendEmail({ to: adminEmail, subject, html });
}
