import HeroSection from "../../components/heroSection/HeroSection";
import Layout from "../../components/layout/Layout";
import ProductsSection from "../../components/productsSection/ProductsSection";

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
