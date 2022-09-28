import Logo from '../components/Logo';
import { Typography } from '@mui/material';
import { useTranslation } from "next-i18next";
import styles from '../styles/footer.module.scss';

function Footer() {
    const { t } = useTranslation('common');
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.logo__column}>
                    <Logo hasAnimation={false}/>
                    <div className={styles.contact__info}>
                        <Typography variant='h4'>{t('footer.contact-title')}</Typography>
                        <div className={styles.social__icons}>
                            <a href="https://github.com/ignaciotomasico12" target="_blank" rel="noreferrer"><i class="fa-brands fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/ignacio-tom%C3%A1s-flor%C3%ADa-b0232b1b1/" target="_blank" rel="noreferrer"><i class="fa-brands fa-linkedin"></i></a>
                            <a href="https://www.instagram.com/ignaciotomasico/" target="_blank" rel="noreferrer"><i class="fa-brands fa-instagram"></i></a>
                        </div>
                    </div>
                    <div className={styles.copywrite}>
                        <p>Copyright &copy; {new Date().getFullYear()} Ignacio Tomás</p>
                    </div>
                </div>
                <div className={styles.menu__column}></div>
            </div>
        </footer>
    )
}; export default Footer