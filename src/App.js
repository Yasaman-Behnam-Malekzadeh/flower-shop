import Header from "./Components/Header";
import './App.css';
import Hero from "./Components/Hero";
import CategorySection from "./Components/CategorySection";
import TopSellingProducts from "./Components/TopSellingProducts";


function App() {
  return (
    <div className="bg-lightRed ">
      <Header />
      <Hero />
      <CategorySection />
      <TopSellingProducts />
    </div>
  );
}

export default App;
