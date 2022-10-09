import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import styles from '../styles/button.module.scss';

export default function Button({linkTo, label, clickFn, target}) {
  const { t } = useTranslation('common');
  return (
    <div className={styles.anim_button}>
      {linkTo !== false &&
        <Link href={linkTo} passHref>
            <a className={styles.button} target={target === 'blank' ? '_blank' : ''} rel="noreferrer">
                <span>{t(`${label}`)}</span>
            </a>
        </Link>
      }{clickFn &&
          <div onClick={clickFn} className={styles.button}>
              <span>{t(`${label}`)}</span>
          </div>
      }
    </div>
  )
}