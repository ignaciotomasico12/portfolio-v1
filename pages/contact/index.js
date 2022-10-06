import { useEffect, useState, forwardRef } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
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
    const [openError, setOpenError] = useState(false);
    const [openErrorForm, setOpenErrorForm] = useState(false);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [sendIcon, setSendIcon] = useState('fa-light fa-paper-plane-top');
    const [spin, setSpin] = useState(false);
    const router = useRouter()
    const vertical = 'bottom';
    const horizontal = 'center';
    let handleSubmit; 

    useEffect(() => {
        var form = document.getElementById('contact_form')
        handleSubmit = () => {
            setSendIcon('fa-light fa-spinner-third fa-spin');
            setSpin(true);
            let data = {
                name,
                company,
                email,
                subject,
                message,
                lang: router.locale,
            };
            if(name !== '' && email !== '' && company !== '') {
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
                        setSendIcon('fa-light fa-paper-plane-top');
                        setSpin(false);
                        console.log('Response succeeded!');
                        setSubmitted(true);
                        setName('');
                        setCompany('');
                        setEmail('');
                        setSubject('');
                        setMessage('');
                        form.reset();
                        handleClick();
                    }
                    if(res.status === 400 || res.status === 500) {
                        setSendIcon('fa-light fa-paper-plane-top');
                        setSpin(false);
                        console.log('Response failed!');
                        setSubmitted(false);
                        setOpenError(true);
                    }
                })
            } else {
                setSendIcon('fa-light fa-paper-plane-top');
                setSpin(false);
                setSubmitted(false);
                setOpenErrorForm(true);
            }
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
    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenError(false);
    };
    const handleCloseErrorForm = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenErrorForm(false);
    };
    
    return (
        <>
            <Head>
                <title>{t('pages.contact')}</title>
            </Head>
            <section className={styles.contact__section}>
                <div className={styles.form__wrapper}>
                    <form className={styles.contact__form} id="contact_form"> 
                        <div className={styles.double__input}> 
                            <div className={styles.textInput}>
                                <input placeholder="" type='text' name='name' className={styles.inputField} onChange={(e)=>{setName(e.target.value)}}/>
                                <label htmlFor='name'>{t('contact.form.name')}</label>
                            </div>
                            <div className={styles.textInput}>
                                <input placeholder="" type='text' name='company' className={styles.inputField} onChange={(e)=>{setCompany(e.target.value)}}/>
                                <label htmlFor='company'>{t('contact.form.company')}</label>
                            </div>
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
                            icon={sendIcon}
                            hoverTo={false}
                            animation='left'
                            clickFn={(e)=>{handleSubmit()}}
                            spin={spin}
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
                            <a href='https://www.google.es/maps/place/C.+de+Balbino+Orensanz,+50014+Zaragoza' target="_blank" rel='noreferrer'>
                                <i className="fa-light fa-location-dot"></i>
                                <span>C/ Balbino Orensánz, Zaragoza, Zaragoza 50014</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                    TransitionComponent={TransitionUp} anchorOrigin={{ vertical, horizontal }} className={styles.alert}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        <i className="fa-light fa-circle-check"></i>
                        {t('contact.form.success')}
                    </Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}
                    TransitionComponent={TransitionUp} anchorOrigin={{ vertical, horizontal }} className={styles.alert}>
                    <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                        <i className="fa-light fa-circle-exclamation"></i>
                        {t('contact.form.error-server')}
                    </Alert>
                </Snackbar>
                <Snackbar open={openErrorForm} autoHideDuration={6000} onClose={handleCloseErrorForm}
                    TransitionComponent={TransitionUp} anchorOrigin={{ vertical, horizontal }} className={styles.alert}>
                    <Alert onClose={handleCloseErrorForm} severity="error" sx={{ width: '100%' }}>
                        <i className="fa-light fa-circle-exclamation"></i>
                        {t('contact.form.error.empty')}
                    </Alert>
                </Snackbar>
            </section>
        </>
    )
};

export const getStaticProps = async ({ locale }) => ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
})