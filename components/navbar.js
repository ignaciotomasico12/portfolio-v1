import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Tooltip } from '@mui/material';
import Button from '../components/button';
import Logo from '../components/logo';
import styles from '../styles/navbar.module.scss';

function Navbar() {
    const menuList = [
        {icon: 'fa-brands fa-github', href: 'https://github.com/ignaciotomasico12', title: 'github'},
        {icon: 'fa-brands fa-linkedin', href: 'https://www.linkedin.com/in/ignacio-tom%C3%A1s-flor%C3%ADa-b0232b1b1/', title: 'linkedin'},
        {icon: 'fa-brands fa-whatsapp', href: 'tel:628085095', title: 'phone'},
        {icon: 'fa-light fa-envelope', href: 'mailto:ignaciotomasico12@gmail.com', title: 'mail'},
    ]

    const router = useRouter()
    const { t } = useTranslation('common')
    let onToggleLanguageClick, openLangMenu, openSocialMenu;

    useEffect(() => {
        onToggleLanguageClick = (newLocale) => {
            const { pathname, asPath, query } = router;
            router.push({ pathname, query }, asPath, { locale: newLocale });
        }
        openLangMenu = () => {
            document.getElementById('lang-menu').classList.toggle(`${styles.open}`)
        }
        openSocialMenu = () => {
            document.getElementById('social_menu').classList.toggle(`${styles.open}`)
        }
    });

    return (
        <header className={styles.header}>
            <Logo hasAnimation={true}/>
            <div className={styles.nav__wrapper}>
                <div className={styles.cv__button}>
                    <Button linkTo='/files/Curriculum_Vitae_Ignacio_Tomás.pdf' 
                        label='menu.download' 
                        icon='fa-light fa-arrow-down' 
                        hoverTo={false}
                        animation='top'
                        target='blank'
                    />
                </div>
                <div className={styles.open__menu} onClick={() => openSocialMenu()}>
                    <span><i class="fa-light fa-share-nodes"></i></span>
                </div>
                <nav className={styles.navbar} id="social_menu">
                    <ul className={styles.navbar__list}>
                        {menuList.map((item, i) => (
                            <li className={styles.navbar__li} key={i}>
                                <Tooltip title={t(`menu.${item.title}`)} arrow placement="bottom">
                                    <a href={item.href} target="_blank" rel="noreferrer"><i className={item.icon}></i></a>
                                </Tooltip>
                            </li>
                        ))}
                    </ul>
                </nav>
                <ul id="lang-menu" className={`${styles.lang__menu} ${styles.navbar__li}`} onClick={() => openLangMenu()}>
                    <Tooltip title={t('menu.language.es')} arrow placement="right">
                        <li className={`${router.locale === 'es' ? styles.current : ''} ${styles.languaje__li}`}>
                            <div onClick={() => onToggleLanguageClick('es')} className={`${styles.es} flag flag-icon-background flag-icon-es`}></div>
                        </li>
                    </Tooltip>
                    <Tooltip title={t('menu.language.en')} arrow placement="right">
                        <li className={`${router.locale === 'en' ? styles.current : ''} ${styles.languaje__li}`}>
                            <div onClick={() => onToggleLanguageClick('en')} className={`${styles.gb} flag flag-icon-background flag-icon-gb`}></div>
                        </li>
                    </Tooltip>
                </ul>
            </div>
        </header>
    );
}
      
export default Navbar;