const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Generate OTP
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

// Send OTP via email
const sendOTPEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"PTU Study Zone" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your OTP Code - Civic Plus++',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
                <div style="text-align: center; padding: 10px;">
                    <img src="https://ptustudyzone.vercel.app/assets/mainlogo-CvKJyAPs.png" alt="civic plus" style="max-width: 150px;"/>
                </div>
                <h2 style="color: #0275d8;">Hello from PTU Study Zone!</h2>
                <p>We have received a request to verify your identity. Please use the following OTP (One-Time Password) to proceed:</p>
                <div style="font-size: 24px; font-weight: bold; color: #d9534f; padding: 10px; background-color: #f7f7f7; text-align: center;">
                    ${otp}
                </div>
                <p style="color: #555;">The OTP code is valid for 10 minutes.</p>
                <p>If you didn't request this, please ignore this email or contact our support team.</p>
                <p style="color: #555;">Thank you for being part of the Civic plus community!</p>
                <hr style="border: none; border-top: 1px solid #ddd;">
                <p style="font-size: 12px; color: #777; text-align: center;">
                    PTU Study Zone | <a href="https://ptustudyzone.vercel.app" style="color: #0275d8; text-decoration: none;">Visit Our Website</a><br>
                    Punjab Technical University
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully');
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};

module.exports = { generateOTP, sendOTPEmail };
