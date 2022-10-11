import React, { useEffect, useState } from 'react';
import { setCookie, hasCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';
import Button from '/components/button';
import styles from '../styles/cookies.module.scss';

function Consent() {
  const [consent, setConsent] = useState(true);
  const { t } = useTranslation('common');

  useEffect(() => {
    setConsent(hasCookie('localConsent'));
  }, []);

  const acceptCookie = () => {
    setConsent(true);
    setCookie('localConsent', 'true', { maxAge: 60 * 60 * 24 * 365 });
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
    });
    console.log('accepting cookies');
  };
  const closeP = () => {
    setConsent(true);
    console.log('closing');
  };
  const denyCookie = () => {
    setConsent(true);
    setCookie('localConsent', 'false', { maxAge: 60 * 60 * 24 * 365 });
    console.log('denying cookie');
  };
  if (consent === true) {
    return null;
  }

  const cookieStyles = consent ? `${styles.cookies} ${styles.hidden}` : `${styles.cookies}`;

  return (
    <div className={cookieStyles}>
        <div className={styles.cookie__wrapper}>
            <div className={styles.cookie__header}>
                <h4>{t('cookies.title')} <i class="fa-light fa-cookie"></i><i class="fa-light fa-cookie-bite"></i></h4>
                <button onClick={(e) => {closeP()}} ><i class="fa-light fa-xmark"></i></button>
            </div>
            <img src="/img/cookie_monster.png" alt="Cookie's Monster"/>
            <p>{t('cookies.description')}</p>
            <div className={styles.cookie_buttons}>
                <Button linkTo={false}
                    label='cookies.accept'
                    clickFn={() => {acceptCookie()}}
                />
                <Button linkTo={false}
                    label='cookies.deny'
                    clickFn={() => {denyCookie()}}
                    className={styles.denyCookie}
                />
            </div>
        </div>
    </div>
  );
}

export default Consent;