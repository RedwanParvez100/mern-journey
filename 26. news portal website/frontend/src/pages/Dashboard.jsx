import { useState, useEffect } from "react"; // Added useState import
import { Link } from "react-router-dom";
import { getUserNews } from "../services/api";

export default function Dashboard() {
    const [userNews, setUserNews] = useState([]);

    useEffect(() => {
        const fetchUserNews = async () => {
            try {
                const res = await getUserNews();
                setUserNews(res.data);
            } catch (err) {
                console.error("Failed to fetch user news:", err);
            }
        };
        fetchUserNews();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="mb-6">
                <Link
                    to="/create-news"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Create New Article
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {userNews.map((news) => (
                    <div
                        key={news._id}
                        className="bg-white p-6 rounded-lg shadow"
                    >
                        <h2 className="text-xl font-semibold mb-2">
                            {news.title}
                        </h2>
                        <div className="flex space-x-4 mt-4">
                            <Link
                                to={`/edit-news/${news._id}`}
                                className="text-blue-600 hover:underline"
                            >
                                Edit
                            </Link>
                            <button className="text-red-600 hover:underline">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
