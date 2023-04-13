import * as styles from "./Footer.module.scss";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                Developed in Spring 2023 for CSCI 5117 by Jason Woitalla
            </div>
        </footer>
    );
}

export default Footer;
