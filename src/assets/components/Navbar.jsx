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
import { convertToUppercase } from "../utils/stringFunctions";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  const [categories, setCategories] = useState(null);

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
        setCategories(response.data);
      })
      .catch((e) => console.log(e));
  }, [categories]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center">
        <div className="flex content-center justify-start text-3xl w-full">
          <RiHeartAddLine />
          <Link to="/">
            <h1 className="uppercase font-semibold">Favorites</h1>
          </Link>
        </div>
        <FiMenu size={30} className="lg:hidden" />
        <div className="hidden lg:flex gap-4 justify-between">
          {categories === null ? (
            <p>Loading...</p>
          ) : (
            categories.map((element) => (
              <div key={element.id}>
                <NavLink
                  to={`/categories/${element.id}`}
                  className="flex items-center gap-2 text-lg "
                >
                  {categoryIcons[element.name]
                    ? categoryIcons[element.name.toLowerCase()]
                    : categoryIcons["other"]}
                  {convertToUppercase(element.name)}
                </NavLink>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <Searchbar />
      </div>
    </div>
  );
}
