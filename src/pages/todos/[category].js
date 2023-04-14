import CategorySideBar from "@/components/CategorySidebar";
import NewItem from "@/components/NewItem";
import PageDetails from "@/components/PageDetails";
import TodoList from "@/components/TodoList";
import withAuth from "@/components/withAuth";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function TodoCategories() {
    const router = useRouter();
    const { category } = router.query;
    const [defaultCategory, setDefaultCategory] = useState("");

    const [token, setToken] = useState(null);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    useEffect(() => {
        async function process() {
            const myToken = await getToken({ template: "codehooks" });
            setToken(myToken);
        }
        process();
    }, [getToken, isLoaded]);

    useEffect(() => {
        if (category) {
            setDefaultCategory(category);
        }
    }, [category]);

    if (!token) return <div>Loading...</div>;

    return (
        <>
            <PageDetails title="Todo List" description="A todo list app." />
            <section className="hero is-info">
                <div className="hero-body">
                    <h1 className="title">Todo List</h1>
                </div>
            </section>
            <section className="section">
                <div className="columns">
                    <div className="column is-four-fifths">
                        <NewItem
                            startOpen={false}
                            token={token}
                            defaultCategory={defaultCategory}
                        />
                        <TodoList
                            completed={false}
                            token={token}
                            category={defaultCategory}
                        />
                    </div>
                    <div className="column">
                        <CategorySideBar parentLink="todos" token={token} />
                    </div>
                </div>
            </section>
        </>
    );
}

export default withAuth(TodoCategories);
