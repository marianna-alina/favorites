import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ItemCard from "../components/ItemCard";
import { convertToUppercase } from "../utils/stringFunctions";
import { CiCirclePlus } from "react-icons/ci";
import { API_URL } from "../utils/apiUrl";

export default function CategoryPage() {
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState(null);

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
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        {category === null ? (
          <p>Nothing here</p>
        ) : (
          <h1 className="text-3xl font-bold">
            {convertToUppercase(category.name)}
          </h1>
        )}
        {category !== null && (
          <Link
            to={`/categories/${categoryID}/new-item`}
            state={{ fields: category?.fields, categoryName: category?.name }}
          >
            <CiCirclePlus size={40} className="hover:opacity-70 font-bold" />
          </Link>
        )}
      </div>

      <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {items === null ? (
          <p>Loading...</p>
        ) : (
          filterItems(items).map((filteredItem) => (
            <Link key={filteredItem.id} to={`items/${filteredItem.id}`}>
              <ItemCard item={filteredItem} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
