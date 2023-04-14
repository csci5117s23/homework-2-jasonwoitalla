import { useEffect, useState } from "react";
import { tokenFetcher } from "@/modules/fetchers";
import { useAuth } from "@clerk/nextjs";
import useSWR from "swr";

function CategorySelect({ categorySelect, setCategorySelect }) {
    const [token, setToken] = useState(null);
    const [categoryInput, setCategoryInput] = useState("");
    const [categories, setCategories] = useState([]);
    const [addMode, setAddMode] = useState(false);
    const [defaultCategory, setDefaultCategory] = useState("");

    const { isLoaded, userId, sessionId, getToken } = useAuth();

    const { data, error } = useSWR(
        token ? [`${process.env.NEXT_PUBLIC_API_URL}/category`, token] : null,
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
            data.unshift({ id: "none", title: "" });
            setCategories(data);
        } else {
            console.log("No category data");
        }
    }, [data]);

    useEffect(() => {
        setDefaultCategory(categorySelect);
    }, [categorySelect]);

    async function addCategory(e) {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: categoryInput,
            }),
        });
        const resData = await res.json();

        setCategoryInput("");

        if (resData) {
            setCategories((categories) => [...categories, resData]);
        }
    }

    if (error) return <div>Failed to load categories</div>;

    const addCategoryDisplay = (
        <div className="field is-horizontal mt-4">
            <div className="field">
                <p className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Your Category"
                        value={categoryInput}
                        onChange={(e) => setCategoryInput(e.target.value)}
                    />
                </p>
            </div>
            <div className="field">
                <p className="control">
                    <button
                        className="button is-primary ml-2"
                        onClick={addCategory}
                    >
                        Add Category
                    </button>
                </p>
            </div>
        </div>
    );

    return (
        <div className="field">
            <label className="label">Category</label>
            {categories.length > 0 ? (
                <div className="select">
                    <select
                        name="category"
                        value={categorySelect}
                        onChange={setCategorySelect}
                    >
                        {categories.map((category) => (
                            <option
                                key={category._id}
                                selected={category.title == defaultCategory}
                            >
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>
            ) : null}
            {addMode ? (
                addCategoryDisplay
            ) : (
                <button
                    className="button is-primary ml-2"
                    onClick={() => setAddMode(true)}
                >
                    New Category
                </button>
            )}
        </div>
    );
}

export default CategorySelect;
