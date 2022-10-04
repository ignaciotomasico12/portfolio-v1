import Layout from '../components/layout.js';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import '../styles/globals.scss';
import '../styles/fontawesome/all.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Ignacio Tomás | Portfolio</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default appWithTranslation(MyApp);
