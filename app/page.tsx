import Image from "next/image";
// import NavBar from "./components/navbar/page";
import Hero from "./components/hero/hero";
import ProductCatalogPage from "./products/page";


export default function Home() {
  return (
   <div>
    <Hero/>
  <ProductCatalogPage/>
    
   </div>
  );
}
