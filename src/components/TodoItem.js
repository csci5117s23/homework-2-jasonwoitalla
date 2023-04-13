import { useEffect, useState } from "react";
import Link from "next/link";

import * as styles from "./TodoItem.module.scss";

function TodoItem({ checked, id, title, description, dueDate, priority }) {
    const [isChecked, setIsChecked] = useState(checked);
    const [getPriority, setPriority] = useState(priority);
    const [getDueDate, setDueDate] = useState(dueDate);

    useEffect(() => {
        const date = new Date(dueDate);
        setDueDate(date.toDateString());
    }, [dueDate]);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);

        if (!isChecked) {
            setPriority("None");
        } else {
            setPriority(priority);
        }
    };

    return (
        <div className="box">
            <div className="level">
                <div className="level-left">
                    <div className="level-item">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className={styles.clickable}
                        />
                    </div>
                    <div className="level-item">
                        <div>
                            <Link href={`/todo/${id}`}>
                                <div className="title is-4">
                                    <p
                                        className={
                                            isChecked ? styles.strike : null
                                        }
                                    >
                                        {title}
                                    </p>
                                </div>
                                <p>{description}</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="level-right">
                    <div className="level-item has-text-right">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoItem;
