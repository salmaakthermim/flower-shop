import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AllFlowers() {
    const [flowers, setFlowers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    // ================= LOAD FLOWERS =================
    useEffect(() => {
        fetch("http://localhost:5000/flowers")
            .then(res => res.json())
            .then(data => {
                setFlowers(data);
                setFiltered(data);
                setLoading(false);
            });
    }, []);

    // ================= SEARCH + SORT =================
    // ================= SEARCH + SORT =================
    useEffect(() => {
        let updated = [...flowers];

        // 🔍 SEARCH FILTER (Name + Description + Price)
        if (search.trim() !== "") {
            updated = updated.filter((f) =>
                f.name.toLowerCase().includes(search.toLowerCase()) ||
                f.description?.toLowerCase().includes(search.toLowerCase()) ||
                f.price.toString().includes(search)
            );
        }

        // 💰 PRICE SORT
        if (sort === "low") {
            updated.sort((a, b) => a.price - b.price);
        } else if (sort === "high") {
            updated.sort((a, b) => b.price - a.price);
        }

        setFiltered(updated);
    }, [search, sort, flowers]);


    if (loading) {
        return <div className="text-center py-20 text-xl">Loading flowers...</div>;
    }

    return (
        <section className="min-h-screen bg-[#f4efe9] py-16 px-6">

            {/* HEADER */}
            <div className="max-w-6xl mx-auto mb-12 text-center">
                <h1 className="text-5xl font-serif mb-4">
                    🌸 All Flowers Collection
                </h1>

                <p className="text-gray-600">
                    Discover {filtered.length} beautiful blooms
                </p>
            </div>

            {/* FILTER SECTION */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-4 mb-10">

                <div className="relative w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Search by name, price or description..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border px-4 py-2 w-full rounded pr-10"
                    />

                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-2 text-gray-500"
                        >
                            ✕
                        </button>
                    )}
                </div>


                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border px-4 py-2 w-full md:w-1/4 rounded"
                >
                    <option value="">Sort By Price</option>
                    <option value="low">Low → High</option>
                    <option value="high">High → Low</option>
                </select>
            </div>

            {/* FLOWER GRID */}
            <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-10">

                {filtered.map(flower => (
                    <motion.div
                        key={flower._id}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                    >
                        <Link to={`/flower/${flower._id}`}>
                            <img
                                src={flower.image}
                                alt={flower.name}
                                className="w-full h-64 object-cover"
                            />
                        </Link>

                        <div className="p-5">
                            <h2 className="text-xl font-semibold mb-2">
                                {flower.name}
                            </h2>

                            <p className="text-[#7a745e] font-medium mb-3">
                                ${flower.price}
                            </p>

                            <Link
                                to={`/flower/${flower._id}`}
                                className="inline-block bg-[#7a745e] text-white px-5 py-2 rounded hover:bg-black transition"
                            >
                                View Details
                            </Link>
                        </div>
                    </motion.div>
                ))}

            </div>
        </section>
    );
}
