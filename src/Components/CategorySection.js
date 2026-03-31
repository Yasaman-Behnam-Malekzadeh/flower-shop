import React from "react";
import CategorySectionItem from "./CategorySectionItem";

function CategorySection() {
  const categories = [
    {
      name: "Bouquets",
      image:
        "https://www.artsty.com/cdn/shop/files/rn-image_picker_lib_temp_8e481e6d-23cd-4e96-8d2d-930809c76a46.jpg?v=1694774090",
    },
    {
      name: "Single Stems",
      image:
        "https://m.media-amazon.com/images/I/91KEGNiHRdL._AC_UF894,1000_QL80_.jpg",
    },
    {
      name: "Wreaths",
      image:
        "https://m.media-amazon.com/images/I/91KEGNiHRdL._AC_UF894,1000_QL80_.jpg",
    },
    {
      name: "Wreaths",
      image:
        "https://m.media-amazon.com/images/I/91KEGNiHRdL._AC_UF894,1000_QL80_.jpg",
    },
  ];

  return (
    <div className="category-section py-32">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
        <div>Find the perfect handcrafted piece for any occasion.</div>
      </div>
      <div className="flex justify-between items-center w-[80%] mx-auto">
        {categories.map((category, index) => (
          <CategorySectionItem
            key={index}
            name={category.name}
            image={category.image}
          />
        ))}
      </div>
    </div>
  );
}

export default CategorySection;
