import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ItemCard from "../components/ItemCard";

export default function CategoryPage() {
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState(null);
  const API_URL = "https://json-server-backend-app.adaptable.app";

  const { categoryID } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/categories/${categoryID}`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((e) => console.log(e));
  }, [categoryID]);

  useEffect(() => {
    axios
      .get(`${API_URL}/items`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((e) => console.log(e));
  }, [categoryID]);

  const filterItems = (array) => {
    if (array) {
      return array.filter((item) => {
        return item.category_id == categoryID;
      });
    }
  };

  return (
    <>
      {category === null ? <p>Loading</p> : <h1>{category.name}</h1>}

      {items === null ? (
        <p>Loading...</p>
      ) : (
        filterItems(items).map((filteredItem) => (
          <Link key={filteredItem.id} to={`items/${filteredItem.id}`}>
            <ItemCard item={filteredItem} />
          </Link>
        ))
      )}
    </>
  );
}
