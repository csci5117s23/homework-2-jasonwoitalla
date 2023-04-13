import Head from "next/head";

import NewItem from "@/components/NewItem";
import TodoItem from "@/components/TodoItem";
import PageDetails from "@/components/PageDetails";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import useSWR from "swr";
import { tokenFetcher } from "@/modules/fetchers";

function TodoPage() {
    const [token, setToken] = useState(null);
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const {
        data,
        error,
        isLoading: isData,
    } = useSWR(
        token ? [`${process.env.NEXT_PUBLIC_API_URL}/todos`, token] : null,
        tokenFetcher
    );

    useEffect(() => {
        async function process() {
            const myToken = await getToken({ template: "codehooks" });
            setToken(myToken);
        }
        process();
    }, [getToken, isLoaded]);

    if (error) return <div>Failed to load</div>;

    if (isData || !isLoaded || !token) {
        return (
            <>
                <PageDetails title="Todo List" description="A todo list app." />
                <div>Loading...</div>
            </>
        );
    }

    return (
        <>
            <PageDetails title="Todo List" description="A todo list app." />
            <section className="hero is-info">
                <div className="hero-body">
                    <h1 className="title">Todo List</h1>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <NewItem startOpen={data.length == 0} />
                    {data.length > 0 ? (
                        data.map((todo) => {
                            return (
                                <TodoItem
                                    checked={todo.completed}
                                    title={todo.title}
                                    description={todo.description}
                                    dueDate={todo.dueDate}
                                    priority={todo.priority}
                                    id={todo._id}
                                    key={todo._id}
                                />
                            );
                        })
                    ) : (
                        <div className="mt-4">No todo items.</div>
                    )}
                </div>
            </section>
        </>
    );
}

export async function getStaticProps() {
    return { props: { isPrivate: true } };
}

export default TodoPage;
