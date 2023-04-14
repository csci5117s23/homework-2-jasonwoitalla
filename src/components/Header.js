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
                <div className="navbar-brand">
                    <p>Jason&apos;s Todo App</p>
                </div>
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
                                <button className="button is-primary">
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
