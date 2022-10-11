import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Tooltip } from '@mui/material';
import Button from '../components/button';
import Logo from '../components/logo';
import styles from '../styles/navbar.module.scss';
import $ from 'jquery';

function Navbar() {
    const [scrollStyle, setScrollStyle] = useState(false);
    const menuList = [
        {icon: 'fa-brands fa-github', href: 'https://github.com/ignaciotomasico12', title: 'github'},
        {icon: 'fa-brands fa-linkedin-in', href: 'https://www.linkedin.com/in/ignacio-tom%C3%A1s-flor%C3%ADa-b0232b1b1/', title: 'linkedin'},
        {icon: 'fa-light fa-envelope', href: 'mailto:ignaciotomasico12@gmail.com', title: 'mail'},
    ]

    const router = useRouter()
    const { t } = useTranslation('common')
    let onToggleLanguageClick, openLangMenu, openSocialMenu;

    useEffect(() => {
        $(window).scroll(function(){
            var scrollTop = $(window).scrollTop();
            if(scrollTop === 0){
              setScrollStyle(false)
            } 
            if(scrollTop > 0){
              setScrollStyle(true)
            }
        })
        onToggleLanguageClick = (newLocale) => {
            const { pathname, asPath, query } = router;
            router.push({ pathname, query }, asPath, { locale: newLocale });
        }
        openLangMenu = () => {
            document.getElementById('lang_menu').classList.toggle(`${styles.opened_lang}`)
        }
        openSocialMenu = () => {
            document.getElementById('social_menu').classList.toggle(`${styles.opened_menu}`)
        }
        document.addEventListener('click', (e) => {
            var target = e.target;
            var langBtn = document.getElementById('lang_btn');
            var socialBtn = document.getElementById('social_btn');
            if(target !== langBtn) {
                document.getElementById('lang_menu').classList.remove(`${styles.opened_lang}`);
            }
            if(target !== socialBtn) {
                document.getElementById('social_menu').classList.remove(`${styles.opened_menu}`);
            }
        });
    });
    const scroll = scrollStyle === true ? styles.scrolling : '';
    const lang = router.locale === 'es' ? styles.es : styles.en;
    const nextLang = router.locale === 'es' ? styles.en : styles.es;
    const translation = router.locale === 'es' ? 'menu.language.en' : 'menu.language.es';

    return (
        <header className={`${styles.header} ${scroll}`}>
            <div className={styles.header__wrapper}>
                <Logo hasAnimation={true}/>
                <div className={styles.nav__wrapper} id="navbar_wrapper">
                    <div className={styles.cv__button}>
                        <Button linkTo='/files/Curriculum_Vitae_Ignacio_Tomás.pdf' 
                            label='menu.download'
                            target='blank'
                        />
                    </div>
                    <div className={styles.open__menu} >
                        <span><i className="fa-light fa-share-nodes" id="social_btn" onClick={() => openSocialMenu()}></i></span>
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
                    <div className={styles.open__lang}>
                        <span><div id="lang_btn" className={lang} onClick={() => openLangMenu()}></div></span>
                    </div>
                    <div className={styles.language} id="lang_menu">
                        <ul className={`${styles.lang__menu} ${styles.navbar__li}`} onClick={() => openLangMenu()}>
                            <Tooltip title={t(translation)} arrow placement="right">
                                <li className={styles.languaje__li}>
                                    <div onClick={() => onToggleLanguageClick(router.locale === 'es' ? 'en' : 'es')} className={nextLang}></div>
                                </li>
                            </Tooltip>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}
      
export default Navbar;