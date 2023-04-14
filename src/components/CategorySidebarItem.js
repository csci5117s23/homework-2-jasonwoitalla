import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function CategorySidebarItem({ category, href, id, deleteCategory }) {
    const [loading, setLoading] = useState(false);

    async function onClickDelete() {
        console.log("Delete category with id: " + id);
        setLoading(true);
        await deleteCategory(id);
        setLoading(false);
    }

    return (
        <div className="columns">
            <div className="column">
                <Link href={href} style={{ overflowWrap: "anywhere" }}>
                    {category}
                </Link>
            </div>
            <div className="column is-narrow">
                <button
                    className={`button is-danger ${
                        loading ? "is-loading" : ""
                    }`}
                    onClick={onClickDelete}
                    aria-label="delete category"
                >
                    <span className="icon">
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                </button>
            </div>
        </div>
    );
}

export default CategorySidebarItem;
