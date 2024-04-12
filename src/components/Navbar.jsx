import { RiHeartAddLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import Searchbar from "./Searchbar";

import axios from "axios";
import { API_URL } from "../utils/apiUrl";
import { useEffect, useState } from "react";

import { convertToUppercase } from "../utils/stringFunctions";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  const [categories, setCategories] = useState(null);

  // const categoryIcons = {
  //   books: <GiBookCover />,
  //   movies: <BiSolidCameraMovie />,
  //   coffee: <PiCoffeeFill />,
  //   wine: <PiWineFill />,
  //   recipes: <PiBowlFoodFill />,
  //   "tv shows": <RiMovieFill />,
  //   other: <BsBookmarkHeartFill />,
  // };

  useEffect(() => {
    axios
      .get(`${API_URL}/categories/`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="flex justify-between items-center mb-16 ">
      <div className="flex justify-end text-3xl">
        <RiHeartAddLine size={25} />
        <Link to="/">
          <h1 className=" text-[30px] font-secondary">myfaves</h1>
        </Link>
      </div>
      <Searchbar />
      <div className="dropdown dropdown-end md:hidden">
        <div
          tabIndex={0}
          role="button"
          className=" btn bg-transparent border-none shadow-none hover:bg-transparent"
        >
          <FiMenu className=" hover:opacity-70" size={30} />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {categories === null ? (
            <p>Loading...</p>
          ) : (
            categories?.map((category) => (
              <li key={category.id}>
                <NavLink to={`/categories/${category.id}`}>
                  {convertToUppercase(category.name)}
                </NavLink>
              </li>
            ))
          )}
        </ul>
      </div>
      <ul className="hidden md:flex gap-4 font-bold text-gray-700">
        {categories?.map((category) => (
          <li key={category.id}>
            <NavLink
              to={`/categories/${category.id}`}
              className="hover:opacity-85"
            >
              {convertToUppercase(category.name)}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
