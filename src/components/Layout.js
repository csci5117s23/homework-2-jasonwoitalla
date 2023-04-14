import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Footer from "./Footer";
import * as styles from "./Layout.module.scss";
import Header from "./Header";

function Layout({ children }) {
    if (children.props.isPrivate) {
        return (
            <>
                <SignedIn>
                    <div className={styles.pageContainer}>
                        <div className={styles.contentWrap}>
                            <Header />
                            <main>{children}</main>
                        </div>
                        <Footer />
                    </div>
                </SignedIn>
                <SignedOut>
                    <p>Redirecting you to the sign in page...</p>
                    <RedirectToSignIn />
                </SignedOut>
            </>
        );
    }
    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.contentWrap}>
                    <main>{children}</main>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Layout;
