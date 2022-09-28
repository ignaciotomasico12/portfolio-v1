import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Tooltip } from '@mui/material';
import Logo from '../components/logo';
import styles from '../styles/navbar.module.scss';

function Navbar() {
    const Mode = process.env.NEXT_PUBLIC_NODE_ENV;
    const [menuStyle, setMenuStyle] = useState('');
    const [menuLang, setMenuLang] = useState('');
    const menuList = [
        {title: 'home', icon: 'fa-light fa-house-blank', href: '#home'},
        {title: 'about', icon: 'fa-light fa-circle-info', href: '#about'},
        {title: 'experience', icon: 'fa-light fa-briefcase-blank', href: '#experience'},
        {title: 'studies', icon: 'fa-light fa-graduation-cap', href: '#studies'},
        {title: 'certificates', icon: 'fa-light fa-file-certificate', href: '#certificates'},
        {title: 'contact', icon: 'fa-light fa-envelope', href: '#contact'},
    ]

    const router = useRouter()
    const { t } = useTranslation('common')
    let onToggleLanguageClick, openMenu, openLangMenu;

    useEffect(() => {
        onToggleLanguageClick = (newLocale) => {
            const { pathname, asPath, query } = router;
            router.push({ pathname, query }, asPath, { locale: newLocale });
        }
        openMenu = () => {
            menuStyle === 'active' ? setMenuStyle('') : setMenuStyle('active');
        }
        openLangMenu = () => {
            menuLang === 'open' ? setMenuLang('') : setMenuLang('open');
        }
    });

    const langStyles = router.locale === 'en' ? styles.en : styles.es;
    const menuMode = menuStyle === '' ? styles.active : ''
    const menuLangMode = menuLang === '' ? styles.open : ''

    return (
        <header className={styles.header}>
            <Logo hasAnimation={true}/>
            <div className={styles.mobile__menu}>
                <svg className={`${styles.ham} ${styles.ham6} ${menuMode}`} viewBox="0 0 100 100" width="80" 
                    id="hamburger__menu" onClick={() => openMenu()}>
                    <path className={`${styles.line} ${styles.top}`}
                        d="m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272" />
                    <path className={`${styles.line} ${styles.middle}`}
                        d="m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272" />
                    <path className={`${styles.line} ${styles.bottom}`}
                        d="m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272" />
                </svg>
            </div>
            <nav className={`${styles.navbar} ${menuMode}`} id="app__menu">
                <ul className={styles.navbar__list}>
                    {menuList.map((item, i) => (
                        <li className={styles.navbar__li} key={i}>
                            <i className={item.icon}></i><a href={item.href}>{t('menu.' + item.title)}</a>
                        </li>
                    ))}
                    <div className={`${styles.navbar__li} ${styles.translate} ${langStyles} ${menuLangMode}`} id="lang__menu">
                        <Tooltip title={t('menu.language.es')} arrow placement="right">
                            <li id="es" className={`${router.locale === 'es' ? styles.current : ''} ${styles.navbar__li}`}>
                                <div onClick={() => onToggleLanguageClick('es')} className="flag flag-icon-background flag-icon-es"></div>
                                <button onClick={() => openLangMenu()}>
                                    <i class="fa-solid fa-caret-down"></i>
                                </button>
                            </li>
                        </Tooltip>
                        <Tooltip title={t('menu.language.en')} arrow placement="right">
                            <li id="en" className={`${router.locale === 'en' ? styles.current : ''} ${styles.navbar__li}`}>
                                <div onClick={() => onToggleLanguageClick('en')} className="flag flag-icon-background flag-icon-gb"></div>
                                <button onClick={() => openLangMenu()}>
                                    <i class="fa-solid fa-caret-down"></i>
                                </button>
                            </li>
                        </Tooltip>
                    </div>
                </ul>
            </nav>
            {Mode === 'dev' &&
                <Tooltip title={t('env.mode.dev')} arrow placement="bottom">
                    <div className={styles.dev_mode}>
                        <i className="fa-brands fa-connectdevelop"></i>
                    </div>
                </Tooltip>
            }
        </header>
    );
}
      
export default Navbar;