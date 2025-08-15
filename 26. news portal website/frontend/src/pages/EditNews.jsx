import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById, updateNews } from "../services/api";

export default function EditNews() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        imageUrl: "",
    });

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await getNewsById(id);
                setFormData({
                    title: res.data.title,
                    content: res.data.content,
                    category: res.data.category,
                    imageUrl: res.data.imageUrl || "",
                });
            } catch (err) {
                console.error("Failed to fetch news:", err);
            }
        };
        fetchNews();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateNews(id, formData);
            navigate("/dashboard");
        } catch (err) {
            console.error("Failed to update news:", err);
        }
    };

    // const handleChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Edit News Article</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Same form fields as CreateNews.jsx */}
                {/* ... */}
            </form>
        </div>
    );
}
