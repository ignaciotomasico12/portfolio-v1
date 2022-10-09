import { useTranslation } from 'next-i18next';
import styles from '../styles/about.module.scss';

export default function About() {
  const { t } = useTranslation('common');

  return (
    <section className={styles.about__section}>
      <div className={styles.wrapper}>
        <div className={styles.picture_warpper}>
          <img src="/img/avatar_right.png" alt="Ignacio Tomás" />
        </div>
        <div className={styles.text_warpper}>
          <h2>{t('about.title')}</h2>
          <p>{t('about.paragraph1')}</p>
          <p>{t('about.paragraph2')}</p>
          <ul className={styles.languages__list}>
            <li>React</li>
            <li>JavaScript (ES6+)</li>
            <li>Next.js</li>
            <li>HTML 5</li>
            <li>Node.js</li>
            <li>CSS 3</li>
            <li>PHP</li>
            <li>SASS</li>
          </ul>        
        </div>
      </div>
    </section>
  )
}