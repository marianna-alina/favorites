import { RiHeartAddLine } from "react-icons/ri";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="flex justify-between text-4xl">
            <Link to="/">
                <RiHeartAddLine />
                <h1 className="uppercase font-semibold">Favorites</h1>
            </Link>
            <HiOutlineMenuAlt4 />
        </div >)
}