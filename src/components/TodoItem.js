import { useEffect, useState } from "react";
import Link from "next/link";

import * as styles from "./TodoItem.module.scss";

function TodoItem({ item, authToken }) {
    const [isChecked, setIsChecked] = useState(item.completed);
    const [getPriority, setPriority] = useState(
        item.completed ? "None" : item.priority
    );
    const [getDueDate, setDueDate] = useState(item.dueDate);
    const [changing, setChanging] = useState(false);

    useEffect(() => {
        const date = new Date(item.dueDate);
        setDueDate(date.toDateString());
    }, [item.dueDate]);

    const handleCheckboxChange = async () => {
        if (changing) return;

        setChanging(true);
        setIsChecked(!isChecked);

        if (!isChecked) {
            setPriority("None");
        } else {
            setPriority(item.priority);
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/todos/${item._id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: item.title,
                    description: item.description,
                    dueDate: item.dueDate,
                    priority: item.priority,
                    category: item.category,
                    completed: !isChecked,
                    createdOn: item.createdOn,
                }),
            }
        );
        const data = await res.json();
        console.log("Finished checking the item off: " + JSON.stringify(data));
        setChanging(false);
    };

    return (
        <div className="box">
            <div className="columns">
                <div className="column is-narrow">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className={styles.clickable}
                    />
                </div>
                <div className="column">
                    <Link href={`/todo/${item._id}`}>
                        <div className="title is-4">
                            <div className={isChecked ? styles.strike : ""}>
                                <p className={styles.todoTitle}>{item.title}</p>
                            </div>
                        </div>
                        <div>
                            <div className={styles.description}>
                                {item.description}
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="column is-3 has-text-right">
                    <div>
                        <p>
                            Priority:{" "}
                            <span
                                className={styles.priority}
                                data-priority={getPriority.toLowerCase()}
                            >
                                {getPriority}
                            </span>
                        </p>
                        <p>Due Date: {getDueDate}</p>
                        {item.category ? (
                            <p className={styles.category}>
                                Category: {item.category}
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoItem;
