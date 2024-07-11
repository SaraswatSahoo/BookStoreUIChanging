import { useContext } from "react";
import HeroSection from "../../components/heroSection/HeroSection";
import Layout from "../../components/layout/Layout";
import ProductsSection from "../../components/productsSection/ProductsSection";
import MyContext from "../../context/MyContext";

export default function Home() {
  
  return (
    <>
      <Layout>
        <HeroSection/>
        <ProductsSection/>
      </Layout>
    </>
  )
}
