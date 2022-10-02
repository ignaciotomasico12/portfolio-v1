export default async function (req, res) {
    return new Promise(resolve => {
        const password = process.env.NEXT_PUBLIC_GMAIL_PASS;
        let nodemailer = require('nodemailer');

        const transporter = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: 'contactoitomas@gmail.com',
                pass: password,
            },
            secure: true,
        });

        const mailData = {
            from: 'contactoitomas@gmail.com',
            to: 'ignaciotomasico12@gmail.com',
            subject: `Mensaje de ${req.body.name} - ${req.body.subject}`,
            text: req.body.message,
            html: `<div>${req.body.message}</div>`
        }

        transporter.sendMail(mailData, function (err, info) {
            if(err)
            console.log(err)
            else
            console.log(info)
        })
        res.status(200).end();
        return resolve()
    })
}