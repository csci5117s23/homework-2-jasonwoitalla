import Link from "next/link";

function Page404() {
    return (
        <div className="section">
            <div className="container">
                <h1 className="title is-1">Error 404 - Not Found</h1>
                <div>
                    <p>Here is a link to page that we know has content :)</p>
                    <Link href="/todos" className="button mt-4">
                        Todos Page
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Page404;
