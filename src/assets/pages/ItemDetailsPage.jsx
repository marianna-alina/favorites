import { useParams } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ItemDetailsPage() {
  const [item, setItem] = useState(null);

  const API_URL = "https://json-server-backend-app.adaptable.app";
  const { itemId } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/items/${itemId}`)
      .then((response) => {
        setItem(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [itemId]);
  return <>{item === null ? <h1>Loading...</h1> : <ItemCard item={item} />}</>;
}
