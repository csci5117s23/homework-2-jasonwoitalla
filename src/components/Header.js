import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";

function Header() {
    const route = useRouter();

    return (
        <header>
            <nav
                className="navbar is-info has-background-info-dark"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand"></div>
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link
                            href="/todos"
                            className={`navbar-item ${
                                route.pathname.includes("todo")
                                    ? "is-active"
                                    : ""
                            }`}
                        >
                            Todos
                        </Link>
                        <Link
                            href="/done"
                            className={`navbar-item ${
                                route.pathname.includes("done")
                                    ? "is-active"
                                    : ""
                            }`}
                        >
                            Done
                        </Link>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <SignedIn>
                                    <UserButton />
                                </SignedIn>
                                <SignedOut>
                                    <Link
                                        href="/"
                                        className="button is-primary"
                                    >
                                        Sign In
                                    </Link>
                                </SignedOut>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
