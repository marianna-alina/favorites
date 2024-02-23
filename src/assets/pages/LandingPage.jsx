import { RiHeartAddLine } from "react-icons/ri";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function LandingPage({ handleSignUp, user }) {
  // if (user) {
  //   return <Navigate to="/dashboard" replace />;
  // }
  return (
    <div className="flex-flex-col h-full">
      <div className="flex items-center justify-between">
        <div className="flex justify-start text-3xl w-full ">
          <RiHeartAddLine />
          <Link to="/">
            <h1 className="uppercase font-semibold">Myfaves</h1>
          </Link>
        </div>
        <button className="shrink-0">Sign Up</button>
      </div>

      <div className="items-start h-full flex flex-col justify-center">
        <h1>Keep what you love, organized.</h1>

        <p>Custom categories for all your favorites, in one place</p>
        <button onClick={handleSignUp}>Sign up with Google</button>
      </div>
    </div>
  );
}
