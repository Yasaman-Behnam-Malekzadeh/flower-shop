import React from "react";
import { Link } from "react-router-dom";


function CategorySection(props) {
  return (
    <div className="category-section py-12">
      <Link
          to="/"
          className="relative rounded-xl overflow-hidden w-80 h-90"
        >
          <img
            src={props.image}
            alt="Category"
            className="w-80 h-90 rounded-xl object-cover"
          />
          <div className="absolute rounded-xl inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          <div className="absolute rounded-xl bottom-0 left-3 text-darkPink text-2xl font-bold p-4">
            {props.name}
          </div>
        </Link>
    </div>
  );
}

export default CategorySection;
