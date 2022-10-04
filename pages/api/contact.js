export default async function (req, res) {

    let nodemailer = require('nodemailer');
    let Email = require('email-templates');

    const MAIL_PASSWORD = process.env.NEXT_PUBLIC_GMAIL_PASS;

    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: 'contactoitomas@gmail.com',
            pass: MAIL_PASSWORD,
        },
        secure: true,
    });

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

    try {
        const { email, name, subject, message} = req.body;

        if (!email, !name, !subject) {
            return res.status(400).send();
        }else{
            const locals = {
                pEmail: email,
                pEmailLink: `mailto:${email}`,
                pName: name,
                pSubject: subject || 'Consulta desde la web',
                pMessage: message || 'No se ha especificado un mensaje',
            };
        
            await sendMail(email, {name: 'Contacto Portfolio', address: 'contactoitomas@gmail.com'}, 'ignaciotomasico12@gmail.com', '', 'owner', locals);
            await sendMail('ignaciotomasico12@gmail.com', {name: 'Ignacio Tomás', address: 'contactoitomas@gmail.com'}, email, '', 'client', locals);

            return res.status(200).send({ message: 'Email enviado con éxito' });
        }
    } catch (err) {
        console.log(err);
    }
}