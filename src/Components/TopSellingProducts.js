import React from "react";
import TopSellingProductItem from "./TopSellingProductItem";

function TopSellingProducts() {
  const products = [
    {
      name: "Dusty Rose",
      image:
        "https://m.media-amazon.com/images/I/91KEGNiHRdL._AC_UF894,1000_QL80_.jpg",
      prise: "$29.99",
      explaination:"A delicate hand-knitted rose in soft dusty pink tones"
    },
    {
      name: "Cream Dahlia",
      image:
        "https://m.media-amazon.com/images/I/91KEGNiHRdL._AC_UF894,1000_QL80_.jpg",
      prise: "$14.00",
      explaination:"Intricate dahlia with creamy white petals"
    },
    {
      name: "Terracotta Tulip",
      image:
        "https://m.media-amazon.com/images/I/91KEGNiHRdL._AC_UF894,1000_QL80_.jpg",
      prise: "$10.00",
      explaination:"Warm terracotta tulip with a rustic charm"
    },
    {
      name: "Blush Carnation",
      image:
        "https://m.media-amazon.com/images/I/91KEGNiHRdL._AC_UF894,1000_QL80_.jpg",
      prise: "$8.00",
      explaination:"Soft blush pink carnation with ruffled petals"
    },
  ];
  return (
    <div className="top-selling-products py-32">
      <div className="top-selling-products">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Best Sellers</h2>
          <div>Our most loved creations, handpicked by our customers.</div>
        </div>
        <div className="flex justify-between items-center w-[80%] mx-auto">
          {products.map((product, index) => (
            <TopSellingProductItem
              key={index}
              name={product.name}
              image={product.image}
              prise={product.prise}
              explaination={product.explaination}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopSellingProducts;
