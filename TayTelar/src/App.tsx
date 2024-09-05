import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import ContactUs from "./pages/contactUs/ContactUs";
import Shop from "./pages/shop/Shop";
import CartModal from "./pages/cart/CartModal";
import Checkout from "./pages/checkout/Checkout";
import Login from "./pages/login/Login";

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contactUs" element={<ContactUs />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<CartModal />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
