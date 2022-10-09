import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Button from '../components/button';
import styles from '../styles/presentation.module.scss';

export default function Presentation() {
  const { t } = useTranslation('common');

  return (
    <section className={styles.presentation}>
        <div className={styles.description}>
            <div className={styles.title}>
                <Typography variant='h4'>Ignacio</Typography>
                <Typography variant='h4'>Tomás Floría</Typography>
            </div>
            <div className={styles.resume}>
                <Typography variant='h5'>{t('main.presentation.title')}</Typography>
                <Typography variant='body1'>{t('main.presentation.description')}</Typography>
            </div>
            <Button linkTo='/contact' 
                label='main.presentation.contact_btn'
            />
        </div>
        <div className={styles.image__wrapper}>
            <img src="/img/avatar_black.png" alt="Ignacio Tomas" />
        </div>
    </section>
  )
}