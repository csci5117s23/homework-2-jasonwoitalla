import Layout from "@/components/Layout";
import "@/styles/global.scss";
import { ClerkProvider } from "@clerk/nextjs";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useRouter } from "next/router";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const requireAuth = router?.route?.meta?.requireAuth;
    console.log("Loading a page, does it need auth? " + requireAuth);

    return (
        <ClerkProvider {...pageProps}>
            <Layout requireAuth={requireAuth}>
                <Component {...pageProps} />
            </Layout>
        </ClerkProvider>
    );
}
