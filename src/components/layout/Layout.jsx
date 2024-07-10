import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div>
        { children }
      </div>
      <Footer />
    </>
  )
}
