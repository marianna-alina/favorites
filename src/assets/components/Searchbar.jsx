import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/apiUrl";

export default function Searchbar() {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (query.trim() !== "") {
            axios
                .get(`${API_URL}/items/`)
                .then((response) => {
                    const filteredResults = response.data.filter((item) =>
                        item.name && item.name.toLowerCase().includes(query.toLowerCase())
                    );
                    setSearchResults(filteredResults);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setSearchResults([]);
        }
    }, [query]);


    const handleChange = (e) => {
        e.preventDefault()
        setQuery(e.target.value);
    };

    const clearSearch = () => {
        setQuery("");
        setSearchResults([]);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search favorite..."
                onChange={handleChange}
                value={query}
                className="rounded-md p-1"
            />
            <ul>
                {searchResults.map((item) => (
                    <li key={item.id} onClick={() => { clearSearch() }}>
                        <Link to={`/categories/${item.category_id}/items/${item.id}`}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
