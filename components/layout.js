import Navbar from './navbar.js';
import Footer from './footer.js';
import styles from '../styles/home.module.scss';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  )
}