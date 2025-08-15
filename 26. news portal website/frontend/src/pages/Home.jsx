import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedNews } from "../services/api";

export default function Home() {
    const [featuredNews, setFeaturedNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedNews = async () => {
            try {
                const res = await getFeaturedNews();
                setFeaturedNews(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedNews();
    }, []);

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error)
        return (
            <div className="text-center py-8 text-red-500">Error: {error}</div>
        );

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-blue-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Welcome to NewsPortal
                    </h1>
                    <p className="text-xl mb-8">
                        Your trusted source for the latest news and updates
                    </p>
                    <Link
                        to="/news"
                        className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Browse All News
                    </Link>
                </div>
            </section>

            {/* Featured News Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Featured News
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredNews.map((news) => (
                            <div
                                key={news._id}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                {news.imageUrl && (
                                    <img
                                        src={news.imageUrl}
                                        alt={news.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">
                                        {news.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {news.content}
                                    </p>
                                    <Link
                                        to={`/news/${news._id}`}
                                        className="text-blue-600 font-medium hover:underline"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Other sections can be added here */}
            <section className="py-12 bg-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                        Subscribe to our newsletter to receive the latest news
                        directly in your inbox.
                    </p>
                    <div className="max-w-md mx-auto flex">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-grow px-4 py-2 rounded-l-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
