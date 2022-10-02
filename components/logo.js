import Link from 'next/link'
import styles from '../styles/logo.module.scss';

function Logo(){
    return (
        <Link href="/">
            <a className={styles.logo__block}><img src="/img/logo.svg" alt="Ignacio Tomas Logo" /></a>
        </Link>
    );
}; export default Logo