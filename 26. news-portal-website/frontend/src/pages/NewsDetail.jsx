import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsById } from "../services/api";
import useStore from "../store/store";

export default function NewsDetail() {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useStore();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await getNewsById(id);
                setNews(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [id]);

    if (loading) return <div className="text-center py-8">Loading news...</div>;
    if (error)
        return (
            <div className="text-center py-8 text-red-500">Error: {error}</div>
        );
    if (!news) return <div className="text-center py-8">News not found</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
                {news.imageUrl && (
                    <img
                        src={news.imageUrl}
                        alt={news.title}
                        className="w-full h-64 md:h-96 object-cover"
                    />
                )}

                <div className="p-6 md:p-8">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">
                        {news.title}
                    </h1>

                    <div className="flex items-center mb-6 text-gray-600">
                        <span className="mr-4">
                            By {news.author?.username || "Unknown"}
                        </span>
                        <span>
                            {new Date(news.createdAt).toLocaleDateString()}
                        </span>
                        <span className="ml-auto">{news.views} views</span>
                    </div>

                    <div className="prose max-w-none">
                        <p className="whitespace-pre-line">{news.content}</p>
                    </div>

                    {user && user._id === news.author?._id && (
                        <div className="mt-8 pt-6 border-t border-gray-200 flex space-x-4">
                            <a
                                href={`/edit-news/${news._id}`}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                Edit
                            </a>
                            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
}
