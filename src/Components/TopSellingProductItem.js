import React from "react";
import { FiShoppingCart } from "react-icons/fi";

function TopSellingProductItem(props) {
  return (
    <div className="top-selling-product-item border w-[23%] rounded-2xl shadow-md border-gray-300">
      <img src={props.image} alt="product" className="w-full h-80 object-cover" />
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold mt-4">{props.name}</h3>
          <div className="text-darkPink mt-2">{props.prise}</div>
        </div>
        <div className="w-[100%] overflow-hidden whitespace-nowrap text-ellipsis text-gray-600">{props.explaination}</div>
        <button className="bg-darkPink text-white px-4 py-2 mt-4 rounded hover:bg-darkPinkHover transition duration-300">
            <FiShoppingCart size={16} className="inline-block mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default TopSellingProductItem;
