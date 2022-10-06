import Layout from '../components/layout.js';
import { appWithTranslation } from 'next-i18next';
import '../styles/globals.scss';
import '../styles/fontawesome/all.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default appWithTranslation(MyApp);
