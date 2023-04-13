import Head from "next/head";
import { useRouter } from "next/router";

import useSWR from "swr";
import { createContext, useEffect, useState } from "react";
import PageDetails from "@/components/PageDetails";
import { tokenFetcher } from "@/modules/fetchers";

import * as styles from "./todo.module.scss";
import { useAuth } from "@clerk/nextjs";
import TodoView from "@/components/TodoView";
import TodoForm from "@/components/TodoForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPen } from "@fortawesome/free-solid-svg-icons";

function Todo() {
    const router = useRouter();
    const { id } = router.query;

    const [editMode, setEditMode] = useState(false);
    const [todoItem, setTodoItem] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [token, setToken] = useState("");

    const { data, error, isLoading } = useSWR(
        token
            ? [`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`, token]
            : null,
        tokenFetcher
    );

    useEffect(() => {
        async function process() {
            const myToken = await getToken({ template: "codehooks" });
            setToken(myToken);
        }
        process();
    }, [getToken, isLoaded]);

    useEffect(() => {
        if (data) {
            setTodoItem(data);
        }
    }, [data]);

    if (error) return <div>Failed to load</div>;

    if (isLoading || !data) return <div>Loading...</div>;

    function enableEditMode() {
        setEditMode(true);
    }

    function disableEditMode() {
        setEditMode(false);
    }

    return (
        <>
            <PageDetails
                title={`Todo Item: ${todoItem?.title}`}
                description="A page that has the details of a todo item."
            />
            <div className="section">
                <div className="container">
                    <div>
                        <h1 className="title is-1">{todoItem?.title}</h1>
                    </div>
                    <div className="tabs is-right">
                        <ul>
                            <li
                                className={`${editMode ? "" : "is-active"}`}
                                onClick={disableEditMode}
                            >
                                <a>
                                    <span className="icon is-small">
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                    </span>
                                    View
                                </a>
                            </li>
                            <li
                                className={`${editMode ? "is-active" : ""}`}
                                onClick={enableEditMode}
                            >
                                <a>
                                    <span className="icon is-small">
                                        <FontAwesomeIcon icon={faPen} />
                                    </span>
                                    Edit
                                </a>
                            </li>
                        </ul>
                    </div>
                    {editMode ? (
                        <>
                            <div
                                className={`notification is-success ${
                                    updateSuccess ? "is-block" : "is-hidden"
                                }`}
                            >
                                <button
                                    className="delete"
                                    onClick={(e) => setUpdateSuccess(false)}
                                ></button>
                                <strong>Success!</strong> Your todo item was
                                updated successfully.
                            </div>
                            <TodoForm
                                method="PUT"
                                todoItem={todoItem}
                                setTodoItem={setTodoItem}
                                setSuccess={setUpdateSuccess}
                            />
                        </>
                    ) : (
                        <TodoView item={todoItem} setTodoItem={setTodoItem} />
                    )}
                </div>
            </div>
        </>
    );
}

export default Todo;
export const TitleContext = createContext("");
export const DescriptionContext = createContext("");
export const DueDateContext = createContext("");
export const PriorityContext = createContext("");
export const CategoryContext = createContext("");
