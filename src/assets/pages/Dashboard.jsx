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
    <div className="backdrop-blur-sm bg-white/30 rounded-lg lg:w-5/6 sm:w-max flex flex-wrap justify-around gap-3 p-4">
      {category === null ? (
        <p>Loading...</p>
      ) : (
        category.map((element) => {
          return (
            <Link
              to={`/categories/${element.id}`}
              key={element.id}
              className="w-9/12 md:w-1/4 h-40 lg:h-96 md:h-60 sm:h-40"
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
      <Link to="/new-category">
        <button>Add Category</button>
      </Link>
    </div>
  );
}
