import { tokenFetcher } from "@/modules/fetchers";
import Link from "next/link";
import useSWR from "swr";

function CategorySideBar({ selected = "", token }) {
    const { data, error } = useSWR(
        token ? [`${process.env.NEXT_PUBLIC_API_URL}/category`, token] : null,
        tokenFetcher
    );

    if (error) return <div>Failed to load categories</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className="box">
            <h3 className="title is-5">Categories</h3>
            <ul>
                {data.map((category) => (
                    <li
                        key={category._id}
                        className={
                            selected == category.title
                                ? "has-text-weight-bold"
                                : ""
                        }
                    >
                        <Link href={`/todos/${category.title}`}>
                            {category.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategorySideBar;
