export default async (req, res) => { 
    let nodemailer = require('nodemailer');
    let pug = require('pug');
    const MAIL_PASSWORD = process.env.NEXT_PUBLIC_GMAIL_PASS;

    const { email, name, subject, message, client, owner} = req.body;
    const locals = {
        pEmail: email,
        pName: name,
        pSubject: subject,
        pMessage: message,
    }

    const transporter = nodemailer.createTransport({
        port: 465,
        service: 'gmail',
        host: "smtp.gmail.com",
        auth: {
            user: 'contactoitomas@gmail.com',
            pass: MAIL_PASSWORD,
        },
        secure: true,
    });

    
    await new Promise((resolve, reject) => {
        transporter.verify(function (error, success) {
            if (error) {
                console.log("Server Error: ", error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });

    const ownerMail = {
        from: {
            name: `${name}`,
            address: "contactoitomas@gmail.com",
        },
        to: "ignaciotomasico12@gmail.com",
        replyTo: email,
        subject: subject,
        text: message,
        html: pug.renderFile(owner, locals),
    };
    const clientMail = {
        from: {
            name: 'Ignacio Tomás',
            address: "contactoitomas@gmail.com",
        },
        to: email,
        replyTo: "ignaciotomasico12@gmail.com",
        subject: subject,
        text: message,
        html: pug.renderFile(client, locals),
    };

    await new Promise((resolve, reject) => {
        transporter.sendMail(ownerMail, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });
    
    await new Promise((resolve, reject) => {
        transporter.sendMail(clientMail, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });

    res.status(200).json({ status: "Message Sent" });
    return;
};