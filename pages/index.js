import { Box, Avatar } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <Box className={styles.home__block}>
        <Box className={styles.avatar__block}>
            <svg>
                <circle cx="155" cy="155" r="145"></circle>
                <circle cx="155" cy="155" r="145"></circle>
            </svg>
            <Avatar
              className={styles.avatar}
              alt="Ignacio Tomás"
              src={'/img/avatar.png'}
              sx={{ width: 300, height: 300 }}
            />
        </Box>
    </Box>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})