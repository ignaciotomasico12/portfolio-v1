import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import styles from '../styles/button.module.scss';

export default function Button({linkTo, label, icon, hoverTo, animation, clickFn, target, spin}) {
  const { t } = useTranslation('common');
  const iconStyle = spin ? (animation === 'top' ? `${styles.top} ${styles.icon} ${styles.no__spin}` : `${styles.right} ${styles.icon} ${styles.no__spin}`) : 
    (animation === 'top' ? `${styles.top} ${styles.icon}` : `${styles.right} ${styles.icon}`)
  return (
    <div className={styles.anim_button}>
      {linkTo !== false &&
        <Link href={linkTo} passHref>
            <a className={styles.button} target={target === 'blank' ? '_blank' : ''} rel="noreferrer">
                <span>{t(`${label}`)}</span>
                <div className={iconStyle}>
                  <i className={`${icon} ${hoverTo !== false ? styles.primary: ""}`}></i>
                  {hoverTo !== false && 
                    <i className={`${hoverTo} ${styles.secondary}`}></i>
                  }
                </div>
            </a>
        </Link>
      }{clickFn &&
          <div onClick={clickFn} className={styles.button}>
              <span>{t(`${label}`)}</span>
              <div className={iconStyle}>
                <i className={`${icon} ${hoverTo !== false ? styles.primary: ""}`}></i>
                {hoverTo !== false &&
                  <i className={`${hoverTo} ${styles.secondary}`}></i>
                }
              </div>
          </div>
      }
    </div>
  )
}