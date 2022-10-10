import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import About from '../components/about';
import Presentation from '../components/presentation';
import Experience from '../components/experience';
import styles from '../styles/home.module.scss';
import $ from 'jquery';

export default function Home() {
  const [scrollStyle, setScrollStyle] = useState(false);
  const { t } = useTranslation('common');

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
  });

  const scroll = scrollStyle === true ? `${styles.scroll__warpper} ${styles.scrolling}` : styles.scroll__warpper;

  return (
    <>
      <Head>
        <title>{t('pages.index')}</title>
      </Head>
      <Box className={styles.home__block}>
        <div className={scroll} id="scroll_warpper">
          <div className={styles.mouse}></div>
          <p>Scroll</p>
        </div>
        <div className={styles.content__wrapper}>
          <Presentation />
          <About />
          <Experience />
        </div>
      </Box>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})