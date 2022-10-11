import Navbar from './navbar';
import Footer from './footer';
import Consent from './consent';
import styles from '../styles/home.module.scss';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
      <Consent />
    </>
  )
}