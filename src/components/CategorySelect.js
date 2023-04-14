import { useEffect, useState } from "react";
import { tokenFetcher } from "@/modules/fetchers";
import { useAuth } from "@clerk/nextjs";
import useSWR from "swr";

function CategorySelect({ categorySelect, setCategorySelect, token }) {
    const [categoryInput, setCategoryInput] = useState("");
    const [categories, setCategories] = useState([]);
    const [addMode, setAddMode] = useState(false);

    const { data, error } = useSWR(
        token ? [`${process.env.NEXT_PUBLIC_API_URL}/category`, token] : null,
        tokenFetcher
    );

    useEffect(() => {
        if (data) {
            setCategories(data);
        } else {
            console.log("No category data");
        }
    }, [data]);

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
                        maxLength={45}
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
                        <option value={""}></option>
                        {categories.map((category) => (
                            <option key={category._id} value={category.title}>
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
