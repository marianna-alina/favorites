import { useParams } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/apiUrl";
import { Link } from "react-router-dom";

export default function ItemDetailsPage() {
    const [item, setItem] = useState(null);

    const API_URL = "https://json-server-backend-app.adaptable.app";
    const { categoryID, itemId } = useParams();

    useEffect(() => {
        axios
            .get(`${API_URL}/items/${itemId}`)
            .then((response) => {
                setItem(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [categoryID, itemId]);

    const deleteItem = (itemIdToDelete) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this item?"
        );
        if (confirmed) {
            axios
                .delete(`${API_URL}/items/${itemIdToDelete}`)
                .then(() => {
                    setItem(null);
                })
                .catch((error) => {
                    console.error("Error deleting item:", error);
                });
        }
    };

    return (
        <div>
            {item === null ? <h1>Loading...</h1> : <ItemCard item={item} deleteItem={deleteItem} />}
            <Link to={`/categories/${categoryID}/items/${itemId}/edit`} state={{ item: item }}>
                <button>Edit</button>
            </Link>
        </div>
    );
}
