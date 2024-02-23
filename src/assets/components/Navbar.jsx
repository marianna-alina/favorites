import { RiHeartAddLine } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";

import axios from "axios";
import { API_URL } from "../utils/apiUrl";
import { useEffect, useState, useRef } from "react";

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
import { Tooltip } from "@mui/material";

export default function Navbar() {
  const [categories, setCategories] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);
  let menuRef = useRef();


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
  }, []);

  async function handleSignOut() {
    try {
      await signOut(auth);
      console.log("User Signed Out Successfully!");
      navigate("/");
    } catch (error) {
      console.log(error.code);
    }
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  return (
    <div>
      <div className="flex justify-between mb-16 pr-20">
        <div className="flex content-center justify-end text-3xl">
          <RiHeartAddLine />
          <Link to="/dashboard">
            <h1 className="uppercase font-semibold">myfaves</h1>
          </Link>
        </div>
        <div className="flex content-end items-start">
          <div ref={menuRef}>
            <div className="flex" >
              <FiMenu className="md:hidden flex-end justify-end absolute right-[70px]" size={30} onClick={() => {
                toggleMenu()
                console.log("menu open")
              }} />
              <Tooltip title="Logout">
                <button className="flex content-start absolute right-[30px] sm:right-10" onClick={handleSignOut}>
                  <IoLogOutOutline size={30} />
                </button>
              </Tooltip>

            </div>
            <div className={`md:flex ${showMenu ? '' : 'hidden'} gap-4 justify-end w-max`} >
              <div className="items-start mt-20 md:mt-0 font-boldsm:mt-0">
                <Searchbar />
              </div>
              {categories === null ? (
                <p>Loading...</p>
              ) : (
                categories.map((element) => (
                  <div key={element.id}>
                    <NavLink
                      to={`/categories/${element.id}`}
                      className="flex items-center flex-wrap justify-start w-max left-0 gap-2 py-2 text-lg"
                    >
                      {categoryIcons[element.name]
                        ? categoryIcons[element.name.toLowerCase()]
                        : categoryIcons["other"]}
                      {convertToUppercase(element.name)}
                    </NavLink>
                  </div>
                ))
              )
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
