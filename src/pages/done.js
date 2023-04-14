import PageDetails from "@/components/PageDetails";
import TodoList from "@/components/TodoList";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

function DonePage() {
    const [token, setToken] = useState(null);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    useEffect(() => {
        async function process() {
            const myToken = await getToken({ template: "codehooks" });
            setToken(myToken);
        }
        process();
    }, [getToken, isLoaded]);

    if (!token) return <div>Loading...</div>;

    return (
        <>
            <PageDetails
                title="Done Items"
                description="Your list of completed todo items"
            />
            <section className="hero is-info">
                <div className="hero-body">
                    <h1 className="title">Completed List</h1>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <TodoList completed={true} token={token} />
                </div>
            </section>
        </>
    );
}

export async function getStaticProps() {
    return { props: { isPrivate: true } };
}

export default DonePage;
