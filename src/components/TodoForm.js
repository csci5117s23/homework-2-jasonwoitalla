import { useEffect, useState } from "react";
import CategorySelect from "./CategorySelect";
import * as styles from "./TodoForm.module.scss";
import { useAuth } from "@clerk/nextjs";
import useSWR, { useSWRConfig } from "swr";

function TodoForm({
    method = "POST",
    todoItem,
    setTodoItem,
    setSuccess,
    defaultCategory = "",
    token,
}) {
    const { mutate } = useSWRConfig();

    function clearForm(e) {
        e.preventDefault();

        setTodoItem({
            title: "",
            description: "",
            dueDate: new Date().toISOString(),
            priority: "",
            category: defaultCategory,
        });
    }

    function setTodoTitle(e) {
        setTodoItem({ ...todoItem, title: e.target.value });
    }

    function setTodoDescription(e) {
        setTodoItem({ ...todoItem, description: e.target.value });
    }

    function setTodoDueDate(e) {
        setTodoItem({ ...todoItem, dueDate: e.target.value });
    }

    function setTodoPriority(e) {
        setTodoItem({ ...todoItem, priority: e.target.value });
    }

    function setTodoCategory(e) {
        setTodoItem({ ...todoItem, category: e.target.value });
    }

    async function onSubmit(e) {
        e.preventDefault();
        let myDueDate = new Date(todoItem.dueDate);

        let url = `${process.env.NEXT_PUBLIC_API_URL}/todos`;
        if (method === "PUT") {
            url = `${process.env.NEXT_PUBLIC_API_URL}/todos/${todoItem._id}`;
        }

        if (token) {
            const response = await fetch(url, {
                method: method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: todoItem.title,
                    description: todoItem.description,
                    dueDate: myDueDate,
                    priority: todoItem.priority,
                    category: todoItem.category,
                    completed: todoItem.completed,
                    createdOn: todoItem.createdOn
                        ? todoItem.createdOn
                        : new Date().toISOString(),
                }),
            });
            const data = await response.json();
            console.log(
                "Attempted to post/put a todo item, response: " +
                    JSON.stringify(data)
            );

            if (response.status === 200 && method === "PUT") {
                setSuccess(true);
            }

            if (response.status === 200 && method === "POST") {
                clearForm(e);
                mutate(`${process.env.NEXT_PUBLIC_API_URL}/todos`);
            }
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="field">
                    <label className={`label ${styles.required}`}>Item</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="The todo item"
                            name="title"
                            value={todoItem.title}
                            onChange={setTodoTitle}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className={`label ${styles.required}`}>
                        Description
                    </label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            placeholder="Describe the task, ex: For CSCI 3081 complete lab 3"
                            name="description"
                            value={todoItem.description}
                            onChange={setTodoDescription}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className={`label ${styles.required}`}>
                        Due Date
                    </label>
                    <div className="control">
                        <input
                            className="input"
                            type="date"
                            name="dueData"
                            value={new Date(todoItem.dueDate)
                                .toISOString()
                                .substring(0, 10)}
                            onChange={setTodoDueDate}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Priority</label>
                    <div className={`control ${styles.prioritySelect}`}>
                        <div className="select">
                            <select
                                name="priority"
                                value={todoItem.priority}
                                onChange={setTodoPriority}
                            >
                                <option className={styles.highPriority}>
                                    High
                                </option>
                                <option className={styles.mediumPriority}>
                                    Medium
                                </option>
                                <option className={styles.lowPriority}>
                                    Low
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <CategorySelect
                    categorySelect={todoItem.category}
                    setCategorySelect={setTodoCategory}
                />
                <div className="field is-grouped">
                    <div className="control">
                        <button
                            className={`button is-link ${
                                token ? "is-block" : "is-hidden"
                            }`}
                        >
                            {method === "POST" ? "Submit" : "Update"}
                        </button>
                    </div>
                    <div className="control">
                        <button
                            className="button is-link is-light"
                            onClick={clearForm}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default TodoForm;
