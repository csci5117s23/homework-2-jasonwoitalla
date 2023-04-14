import { tokenFetcher } from "@/modules/fetchers";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import useSWR from "swr";

function TodoList({ completed = false, token, category = "" }) {
    const [todos, setTodos] = useState([]);

    // Fetch Data
    const { data, error, isLoading } = useSWR(
        token
            ? [`${process.env.NEXT_PUBLIC_API_URL}/todos`, token, category]
            : null,
        tokenFetcher
    );

    useEffect(() => {
        if (data) {
            let sortedArray = [...data];
            sortedArray = sortedArray.filter(
                (todo) =>
                    todo._id &&
                    todo.createdOn &&
                    todo.completed == completed &&
                    (category.length == 0 || todo.category == category)
            );
            sortedArray.sort((a, b) => {
                return new Date(b.createdOn) - new Date(a.createdOn);
            });
            setTodos(sortedArray);
        }
    }, [completed, data, category]);

    if (isLoading || !token) {
        return <div>Loading...</div>;
    }

    if (error || !data)
        return <div className="has-text-danger">Failed to todo list</div>;

    return (
        <div className="mt-4">
            {todos.length > 0 ? (
                todos.map((todo) => (
                    <TodoItem item={todo} authToken={token} key={todo._id} />
                ))
            ) : (
                <div>No todos found</div>
            )}
        </div>
    );
}

export default TodoList;
