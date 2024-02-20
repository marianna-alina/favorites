import { useParams } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import { MdOutlineModeEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/apiUrl";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function ItemDetailsPage({ deleteItem }) {
    const [item, setItem] = useState(null);
    const { categoryID, itemId } = useParams();
    const navigate = useNavigate();


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

    return (
        <div>
            {item === null ? <h1>Loading...</h1> : <ItemCard item={item} deleteItem={deleteItem} />}

        </div>
    );
}
