import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Footer from "./Footer";
import * as styles from "./Layout.module.scss";
import Header from "./Header";

function Layout({ children }) {
    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.contentWrap}>
                    <Header />
                    <main>{children}</main>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Layout;
