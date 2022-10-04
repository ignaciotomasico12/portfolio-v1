
let nodemailer = require('nodemailer');
let Email = require('email-templates');

const MAIL_PASSWORD = process.env.NEXT_PUBLIC_GMAIL_PASS;

export default async function (req, res) {

    const { email, name, subject, message} = req.body;

    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: 'contactoitomas@gmail.com',
            pass: MAIL_PASSWORD,
        },
        secure: true,
    });

    await new Promise((resolve, reject) => {

        async function sendMail(replyTo, from, to, bcc, template, locals = {}) { 
            const emailMsg = new Email({
                transport: transporter,
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

        if (!email || !name) {
            reject(res)
            return res.status(400).send();
        }else{
            const locals = {
                pEmail: email,
                pEmailLink: `mailto:${email}`,
                pName: name,
                pSubject: subject || 'Consulta desde la web',
                pMessage: message || 'No se ha especificado un mensaje',
            };
        
            sendMail(email, {name: 'Contacto Portfolio', address: 'contactoitomas@gmail.com'}, 'ignaciotomasico12@gmail.com', '', 'owner', locals);
            sendMail('ignaciotomasico12@gmail.com', {name: 'Ignacio Tomás', address: 'contactoitomas@gmail.com'}, email, '', 'client', locals);
            resolve(res)
            return res.status(200).send({ message: 'Email enviado con éxito' });
        }

    });
}