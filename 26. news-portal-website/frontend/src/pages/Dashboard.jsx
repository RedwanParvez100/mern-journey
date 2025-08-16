import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserNews, deleteNews } from "../services/api";

export default function Dashboard() {
    const [userNews, setUserNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserNews = async () => {
            setLoading(true);
            try {
                const res = await getUserNews();
                setUserNews(res.data);
            } catch (err) {
                setError("Failed to fetch news articles");
                console.error("Failed to fetch user news:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUserNews();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this article?")) {
            return;
        }

        try {
            setLoading(true);
            await deleteNews(id);
            // Refresh the news list after deletion
            const res = await getUserNews();
            setUserNews(res.data);
        } catch (err) {
            setError("Failed to delete article");
            console.error("Failed to delete news:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

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
                {userNews.length === 0 ? (
                    <p>No articles found. Create your first article!</p>
                ) : (
                    userNews.map((news) => (
                        <div
                            key={news._id}
                            className="bg-white p-6 rounded-lg shadow"
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                {news.title}
                            </h2>
                            <p className="text-gray-600 mb-2">
                                {news.category}
                            </p>
                            <p className="text-gray-500 text-sm">
                                {new Date(news.createdAt).toLocaleDateString()}
                            </p>
                            <div className="flex space-x-4 mt-4">
                                <Link
                                    to={`/edit-news/${news._id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(news._id)}
                                    className="text-red-600 hover:underline"
                                    disabled={loading}
                                >
                                    {loading ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
