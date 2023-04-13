import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function TodoView({ item, setTodoItem }) {
    const [getDueDate, setDueDate] = useState("");

    useEffect(() => {
        if (item) {
            const date = new Date(item.dueDate);
            setDueDate(date.toDateString());
        }
    }, [item]);

    function getPriorityTag(myPriority) {
        switch (myPriority) {
            case "High":
                return "is-danger";
            case "Medium":
                return "is-warning";
            case "Low":
                return "is-success";
            default:
                return "is-info";
        }
    }

    function onCompletedChange(e) {
        setTodoItem({ ...item, completed: !item.completed });
    }

    return (
        <div>
            <div className="is-flex is-flex-direction-row is-align-content-center">
                <p
                    className="title is-4 mr-4 mb-0"
                    style={{ verticalAlign: "center" }}
                >
                    Completed:{" "}
                </p>
                <button
                    className="button is-success"
                    onClick={onCompletedChange}
                >
                    {item?.completed ? "Mark Not Completed" : "Mark Completed"}
                </button>
            </div>
            <div className="mt-4">
                <p className="title is-4 has-text-weight-bold">
                    Task Description:
                </p>
                <p>{item?.description}</p>
            </div>
            <div className="box mt-4">
                <div>
                    <p>
                        <span className="has-text-weight-bold">Category: </span>
                        {item?.category}
                    </p>
                </div>
                <div className="level mt-4">
                    <div className="level-left">
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="has-text-weight-bold">
                                    Due Date:
                                </p>
                                <p>{getDueDate}</p>
                            </div>
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="has-text-weight-bold">Priority</p>
                                <p>
                                    <span
                                        className={`tag is-large ${getPriorityTag(
                                            !item?.completed
                                                ? item?.priority
                                                : "None"
                                        )}`}
                                    >
                                        {!item?.completed
                                            ? item?.priority
                                            : "None"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoView;
