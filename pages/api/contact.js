import { EmailService } from '../services/email.service';

const eService = new EmailService();

export default async function (req, res) {
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
        
            await eService.sendMail(email, {name: 'Contacto Portfolio', address: 'contactoitomas@gmail.com'}, 'ignaciotomasico12@gmail.com', '', 'owner', locals);
            await eService.sendMail('ignaciotomasico12@gmail.com', {name: 'Ignacio Tomás', address: 'contactoitomas@gmail.com'}, email, '', 'client', locals);

            return res.status(200).send({ message: 'Email enviado con éxito' });
        }
    } catch (err) {
        console.log(err);
    }
}