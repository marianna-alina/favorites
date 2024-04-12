import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

import CategoryCard from "../components/CategoryCard";
import { convertToUppercase } from "../utils/stringFunctions";
import { API_URL } from "../utils/apiUrl";

export default function Dashboard({ items }) {
  const [category, setCategory] = useState(null);

  const { categoryID } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/categories`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((e) => console.log(e));
  }, [categoryID]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between md:mt-4">
        <Link to="/new-category">
          <button className="bg-white p-2 rounded-md font-bold">
            Add Category
          </button>
        </Link>
      </div>

      <div className="rounded-lg w-full gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category === null ? (
          <p>Loading...</p>
        ) : (
          category.map((element) => {
            return (
              <Link
                to={`/categories/${element.id}`}
                className="h-72 w-full"
                key={element.id}
              >
                <CategoryCard
                  name={convertToUppercase(element.name)}
                  items={items}
                  id={element.id}
                />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
