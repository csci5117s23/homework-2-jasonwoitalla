import { tokenFetcher } from "@/modules/fetchers";
import Link from "next/link";
import useSWR from "swr";
import CategorySidebarItem from "./CategorySidebarItem";

function CategorySideBar({ selected = "", parentLink, token }) {
    const { data, error, mutate } = useSWR(
        token ? [`${process.env.NEXT_PUBLIC_API_URL}/category`, token] : null,
        tokenFetcher
    );

    const deleteCategory = async (id) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/category/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const resData = await response.json();
        console.log("Deleted category: " + JSON.stringify(resData));

        const newData = data.filter((item) => item._id !== id);
        mutate(newData, false);
    };

    if (error) return <div>Failed to load categories</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className="box">
            <h3 className="title is-5">Categories</h3>
            <ul>
                {data.map((category) => (
                    <li key={category._id} className="mt-4">
                        <CategorySidebarItem
                            category={category.title}
                            href={`/${parentLink}/${category.title}`}
                            id={category._id}
                            deleteCategory={deleteCategory}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategorySideBar;
