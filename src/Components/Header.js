import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { GrUser } from "react-icons/gr";
import { GrGrow } from "react-icons/gr";


function Header() {
  return (
    <div className="h-16 ">
     <div className="flex items-center justify-between align-items-center container mx-auto h-full">
         <div className="flex">
        <span className="text-darkPink bg-radial">
          <GrGrow size={20} />
        </span>
        <span >Petal & Thread</span>
      </div>
      <div>
        <Link to="/" className="btn bg-darkPink hover:bg-darkPinkHover text-white p-2 px-4 rounded-md mr-2">Home</Link>
        <Link to="/" className="btn bg-darkPink hover:bg-darkPinkHover text-white p-2 px-4 rounded-md">Bouquet Builder</Link>
      </div>
      <div className="flex">
        <Link to="/" className="btn bg-darkPink hover:bg-darkPinkHover text-white p-2 px-4 rounded-md mr-2">
          <FiShoppingCart size={20} />           
        </Link>
        <Link to="/" className="btn bg-darkPink hover:bg-darkPinkHover text-white p-2 px-4 rounded-md">
          <GrUser size={20} />
        </Link>
      </div>
     </div>
    </div>
  );
}

export default Header;
