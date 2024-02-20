import { RiHeartAddLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import Searchbar from "./Searchbar";

import axios from "axios";
import { API_URL } from "../utils/apiUrl";
import { useEffect, useState } from "react";

import { GiBookCover } from "react-icons/gi";
import { BiSolidCameraMovie } from "react-icons/bi";
import { PiCoffeeFill } from "react-icons/pi";
import { PiWineFill } from "react-icons/pi";
import { PiBowlFoodFill } from "react-icons/pi";
import { RiMovieFill } from "react-icons/ri";
import { BsBookmarkHeartFill } from "react-icons/bs";

export default function Navbar() {
  const [category, setCategory] = useState(null);

  const categoryIcons = {
    books: <GiBookCover />,
    movies: <BiSolidCameraMovie />,
    coffee: <PiCoffeeFill />,
    wine: <PiWineFill />,
    recipes: <PiBowlFoodFill />,
    "tv shows": <RiMovieFill />,
    other: <BsBookmarkHeartFill />,
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/categories/`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((e) => console.log(e));
  }, [category]);

  return (
    <div className="flex w-full">
      <div className="flex flex-row content-center justify-start text-3xl w-full">
        <RiHeartAddLine />
        <Link to="/">
          <h1 className="uppercase font-semibold">Favorites</h1>
        </Link>
      </div>
      <div className="flex">
        <Searchbar />
        <div className="flex gap-15 justify-between  border">
          {category === null ? (
            <p>Loading...</p>
          ) : (
            category.map((element) => (
              <div key={element.id}>
                <NavLink
                  to={`/categories/${element.id}`}
                  className="flex content-center gap-2 text-lg "
                >
                  {categoryIcons[element.name]
                    ? categoryIcons[element.name.toLowerCase()]
                    : categoryIcons["other"]}
                  {element.name.toUpperCase()}
                </NavLink>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
