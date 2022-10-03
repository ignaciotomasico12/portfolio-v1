import nodemailer from 'nodemailer';
import  Email from 'email-templates';

const MAIL_PASSWORD = process.env.NEXT_PUBLIC_GMAIL_PASS;

export class EmailService {

    constructor() { 
        this.smtpTransport = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: 'contactoitomas@gmail.com',
                pass: MAIL_PASSWORD,
            },
            secure: true,
        });
    } 

    async sendMail(replyTo, from, to, bcc, template, locals = {}) { 
        const emailMsg = new Email({
            transport: this.smtpTransport,
            send: true,
            preview: false,
        });
        const message = {from, to, bcc, replyTo}; 

        await emailMsg.send({
            template,
            message,
            locals
        });
    }
} 