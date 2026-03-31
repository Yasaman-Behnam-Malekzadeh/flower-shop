import React from "react";
import { Link } from "react-router-dom";


function CategorySection(props) {
  return (
    <div className="category-section py-12">
      <Link
          to="/"
          className="relative rounded-lg overflow-hidden w-70 h-80"
        >
          <img
            src={props.image}
            alt="Category"
            className="w-80 h-80 object-cover hover:scale-105 transition-transform duration-300"
            style={{
              maskImage: "linear-gradient(to top, transparent, black 60%)",
              WebkitMaskImage:
                "linear-gradient(to top, transparent, black 60%)",
            }}
          />
          <div className="absolute bottom-0 left-3 text-darkPink text-2xl font-bold p-4">
            {props.name}
          </div>
        </Link>
    </div>
  );
}

export default CategorySection;
