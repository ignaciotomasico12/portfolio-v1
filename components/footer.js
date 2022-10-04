import { useTranslation } from "next-i18next";
import styles from '../styles/footer.module.scss';

function Footer() {
    const { t } = useTranslation('common');
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.copywrite}>
                    {/*<p>Copyright &copy; {new Date().getFullYear()} Ignacio Tomás</p>*/}
                </div>
            </div>
        </footer>
    )
}; export default Footer