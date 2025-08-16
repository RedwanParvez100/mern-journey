import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllNews } from "../services/api";

export default function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await getAllNews();
                setNews(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading) return <div className="text-center py-8">Loading news...</div>;
    if (error)
        return (
            <div className="text-center py-8 text-red-500">Error: {error}</div>
        );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Latest News</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                    >
                        {item.imageUrl && (
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2">
                                {item.title}
                            </h2>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                                {item.content}
                            </p>
                            <div className="flex justify-between items-center">
                                <Link
                                    to={`/news/${item._id}`}
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    Read More
                                </Link>
                                <span className="text-sm text-gray-500">
                                    {new Date(
                                        item.createdAt
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
