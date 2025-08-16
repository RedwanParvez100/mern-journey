import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById, updateNews, deleteNews } from "../services/api";

export default function EditNews() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        imageUrl: "",
        isFeatured: false,
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true);
            try {
                const res = await getNewsById(id);
                setFormData({
                    title: res.data.title,
                    content: res.data.content,
                    category: res.data.category,
                    imageUrl: res.data.imageUrl || "",
                    isFeatured: res.data.isFeatured || false,
                });
            } catch (err) {
                setError("Failed to load news article");
                console.error("Failed to fetch news:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updateNews(id, formData);
            navigate("/dashboard");
        } catch (err) {
            setError("Failed to update news");
            console.error("Failed to update news:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (
            !window.confirm(
                "Are you sure you want to delete this news article?"
            )
        )
            return;

        setIsLoading(true);
        try {
            await deleteNews(id);
            navigate("/dashboard");
        } catch (err) {
            setError("Failed to delete news");
            console.error("Failed to delete news:", err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading)
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    if (error)
        return (
            <div className="container mx-auto px-4 py-8 text-red-500">
                {error}
            </div>
        );

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Edit News Article</h1>
            {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full p-2 border rounded min-h-[200px]"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="Technology">Technology</option>
                        <option value="Business">Business</option>
                        <option value="Sports">Sports</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2 font-medium">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleChange}
                        className="mr-2"
                        id="isFeatured"
                    />
                    <label htmlFor="isFeatured">Featured Article</label>
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        disabled={isLoading}
                    >
                        Delete Article
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}
