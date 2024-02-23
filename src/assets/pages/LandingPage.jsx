import { RiHeartAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function LandingPage({ handleSignUp }) {
  return (
    <div className="flex-flex-col h-full ">
      <div className="flex items-center justify-between">
        <div className="flex justify-start text-3xl w-full">
          <RiHeartAddLine />
          <Link to="/">
            <h1 className="uppercase font-semibold">Myfaves</h1>
          </Link>
        </div>
        {/* <button className="shrink-0 bg-white rounded-md p-2 font-bold">
          Sign Up
        </button> */}
      </div>

      <div className="items-start h-full flex flex-col justify-center gap-6 ">
        <h1 className="text-4xl md:text-5xl lg:text-6xl  font-secondary">
          Keep what you love, organized.
        </h1>

        <i className="text-lg lg:text-xl">
          Custom categories for all your favorites, in one place.
        </i>
        <button
          onClick={handleSignUp}
          className="bg-white p-2 rounded-md flex items-center gap-2 font-bold"
        >
          <FcGoogle />
          Sign up with Google
        </button>
      </div>
    </div>
  );
}
