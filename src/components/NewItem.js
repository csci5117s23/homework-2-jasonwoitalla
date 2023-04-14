import { useState } from "react";
import TodoForm from "./TodoForm";

import * as styles from "./NewItem.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function NewItem({ startOpen = false, defaultCategory = "", token }) {
    const [isOpen, setIsOpen] = useState(startOpen);
    const [newItem, setNewItem] = useState({
        title: "",
        description: "",
        dueDate: new Date().toISOString(),
        priority: "High",
        category: defaultCategory,
    });

    function handleToggle() {
        setIsOpen(!isOpen);
    }

    return (
        <div className="card">
            <div className="card-header title is-3 mb-0" onClick={handleToggle}>
                <p className="card-header-title">New Todo Item</p>
                <button
                    className="card-header-icon"
                    aria-label="new todo item"
                    onClick={handleToggle}
                >
                    <span
                        className={`icon ${
                            styles.icon +
                            " " +
                            (isOpen ? styles.rotated : styles.notRotated)
                        }`}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                </button>
            </div>
            <div className="card-content">
                <div
                    className={
                        styles.formWrapper +
                        " " +
                        (isOpen ? styles.open : styles.closed)
                    }
                >
                    <TodoForm
                        todoItem={newItem}
                        setTodoItem={setNewItem}
                        defaultCategory={defaultCategory}
                        token={token}
                    />
                </div>
            </div>
        </div>
    );
}

export default NewItem;
