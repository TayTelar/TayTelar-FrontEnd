import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import ContactUs from "./pages/contactUs/ContactUs";
import ProductInfo from "./pages/productInfo/ProductInfo";
import Details from "./pages/productInfo/Details";
import Shipping from "./pages/productInfo/Shipping";
import Review from "./pages/productInfo/Review";
import Shop from "./pages/shop/Shop";
import CartModal from "./pages/cart/CartModal";
import Checkout from "./pages/checkout/Checkout";
import { ReviewProvider } from "./pages/productInfo/contexts/ReviewContext"; // Update path as needed

const App = () => (
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<CartModal />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/productinfo" element={
                <ReviewProvider> {/* Provide context only to ProductInfo and its nested routes */}
                    <ProductInfo />
                </ReviewProvider>
            }>
                {/* Nested Routes */}
                <Route index element={<Details />} /> {/* Default route */}
                <Route path="details" element={<Details />} />
                <Route path="shipping-returns" element={<Shipping />} />
                <Route path="review" element={<Review />} />
            </Route>
        </Routes>
        <Footer />
    </Router>
);

export default App;
