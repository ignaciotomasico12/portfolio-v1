import { useEffect, useState, forwardRef } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Button from '../../components/button';
import styles from '../../styles/contact.module.scss';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function About() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const vertical = 'bottom';
    const horizontal = 'center';
    let handleSubmit; 

    useEffect(() => {
        var form = document.getElementById('contact_form')
        handleSubmit = (e) => {
            e.preventDefault()
            let data = {
            name,
            email,
            subject,
            message
            };
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    console.log('Response succeeded!');
                    setSubmitted(true);
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                    form.reset();
                    handleClick();
                }
            })
        }
    });
    const { t } = useTranslation('common');

    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };
    
    return (
        <section className={styles.contact__section}>
            <div className={styles.form__wrapper}>
                <form className={styles.contact__form} id="contact_form"> 
                    <div className={styles.textInput}>
                        <input placeholder="" type='text' name='name' className={styles.inputField} onChange={(e)=>{setName(e.target.value)}}/>
                        <label htmlFor='name'>{t('contact.form.name')}</label>
                    </div>  
                    <div className={styles.textInput}>
                        <input placeholder="" type='email' name='email' className={styles.inputField} onChange={(e)=>{setEmail(e.target.value)}}/>
                        <label htmlFor='email'>{t('contact.form.mail')}</label>
                    </div>
                    <div className={styles.textInput}>
                        <input placeholder="" type='text' name='subject' className={styles.inputField} onChange={(e)=>{setSubject(e.target.value)}}/>
                        <label htmlFor='subject'>{t('contact.form.subject')}</label>
                    </div>
                    <div className={styles.textareaInput} >
                        <textarea placeholder="" name='message' className={styles.inputField} onChange={(e)=>{setMessage(e.target.value)}} maxLength="250"/>
                        <label htmlFor='message'>{t('contact.form.message')}</label>
                    </div>
                    <Button linkTo={false}
                        label='contact.form.submit' 
                        icon='fa-light fa-paper-plane-top' 
                        hoverTo={false}
                        animation='left'
                        clickFn={(e)=>{handleSubmit()}}
                    />
                </form>
            </div>
            <div className={styles.contact__text}>
                <h1>{t('contact.title')}</h1>
                <span>
                    <p>{t('contact.description')}</p>
                </span>
                <ul className={styles.contact__list}>
                    <li>
                        <a href="https://www.linkedin.com/in/ignacio-tom%C3%A1s-flor%C3%ADa-b0232b1b1/" target="_blank" rel='noreferrer'>
                            <i className="fa-brands fa-linkedin"></i>
                            <span>Linkedin</span>
                        </a>
                    </li>
                    <li>
                        <a href="tel:628085095" rel='noreferrer'>
                            <i className="fa-light fa-phone"></i>
                            <span>+34 628 085 095</span>
                        </a>
                    </li>
                    <li>
                        <div>
                            <i className="fa-light fa-location-dot"></i>
                            <span>C/ Balbino Orensanz, Zaragoza, Zaragoza 50014</span>
                        </div>
                    </li>
                </ul>
            </div>
            <Snackbar open={open} autoHideDuration={60000} onClose={handleClose} T
                ransitionComponent={TransitionUp} anchorOrigin={{ vertical, horizontal }} className={styles.alert}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    <i class="fa-light fa-circle-check"></i>
                    {t('contact.form.success')}
                </Alert>
            </Snackbar>
        </section>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
})