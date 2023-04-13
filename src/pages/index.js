import PageDetails from "@/components/PageDetails";
import { SignIn, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

function HomePage() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    return (
        <>
            <PageDetails
                title="Homepage"
                description="This is the homepage for my todo tracker app."
            />
            <section className="hero is-info">
                <div className="hero-body has-text-centered">
                    <h1 className="title">
                        Welcome to Jason&apos;s Todo List App
                    </h1>
                    <p className="subtitle">
                        Please login or register to get started.
                    </p>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column"></div>
                        <div className="column has-text-centered">
                            {userId ? (
                                <UserButton></UserButton>
                            ) : (
                                <SignIn></SignIn>
                            )}
                        </div>
                        <div className="column"></div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HomePage;
