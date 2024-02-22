import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

import CategoryCard from "../components/CategoryCard";
import { convertToUppercase } from "../utils/stringFunctions";
import { API_URL } from "../utils/apiUrl";

export default function Dashboard({ items, user }) {
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

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
      <h1 className="text-3xl">
        Hello {user?.displayName.slice(0, user.displayName.indexOf(" "))}
      </h1>
      <div className="backdrop-blur-sm bg-white/30 rounded-lg w-full gap-3 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category === null ? (
          <p>Loading...</p>
        ) : (
          category.map((element) => {
            return (
              <Link
                to={`/categories/${element.id}`}
                key={element.id}
                className="h-72 w-full"
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
    </div>
  );
}
