import { RiHeartAddLine } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
import { IoLogOutOutline } from "react-icons/io5";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { app } from "../../firebaseConfig";

export default function Navbar() {
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth(app);

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

  async function handleSignOut() {
    try {
      await signOut(auth);
      console.log("User Signed Out Successfully!");
      navigate("/");
    } catch (error) {
      console.log(error.code);
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-3">
        <div className="flex content-center justify-start text-3xl w-full">
          <RiHeartAddLine />
          <Link to="/dashboard">
            <h1 className="uppercase font-semibold">Favorites</h1>
          </Link>
        </div>
        <FiMenu size={30} className="lg:hidden" />
        <div className="hidden lg:flex gap-4 justify-between ">
          {categories === null ? (
            <p>Loading...</p>
          ) : (
            categories.map((element) => (
              <div key={element.id}>
                <NavLink
                  to={`/categories/${element.id}`}
                  className="flex items-center gap-2 text-lg   whitespace-nowrap "
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
        <button onClick={handleSignOut}>
          <IoLogOutOutline size={30} />
        </button>
      </div>

      <div className="flex flex-col">
        <Searchbar size={50} />
      </div>
    </div>
  );
}
