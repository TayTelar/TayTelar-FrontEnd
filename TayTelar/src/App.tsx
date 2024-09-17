import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./customer/components/header/Header";
import Footer from "./customer/components/footer/Footer";
import Home from "./customer/pages/home/Home";
import ContactUs from "./customer/pages/contactUs/ContactUs";
import ProductInfo from "./customer/pages/productInfo/ProductInfo";
import Details from "./customer/pages/productInfo/Details";
import Shipping from "./customer/pages/productInfo/Shipping";
import Review from "./customer/pages/productInfo/Review";
import Shop from "./customer/pages/shop/Shop";
import CartModal from "./customer/pages/cart/CartModal";
import Checkout from "./customer/pages/checkout/Checkout";
import Orders from "./customer/pages/orders/Orders";
import Login from "./customer/pages/login/Login";
import { ReviewProvider } from "./customer/pages/productInfo/contexts/ReviewContext";
import Layout from "./affiliated/page/Layout";
import Dashboard from "./affiliated/page/Dashboard";
import Payment from "./affiliated/page/Payment";
import Products from "./affiliated/page/Products";
import Profile from "./affiliated/page/Profile";
import Support from "./affiliated/page/Support";

const App = () => {
  const location = useLocation();
  const isAffiliated = location.pathname.startsWith("/Affiliate");

  const getCustomerType = () => {
    if (location.pathname.startsWith("/login/Affiliate")) {
      return "affiliate";
    }
    return "customer";
  };

  return (
    <>
      {!isAffiliated && <Header />}
      <Routes>
        {/* Main application routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<CartModal />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order" element={<Orders />} />
        <Route
          path="/productinfo"
          element={
            <ReviewProvider>
              <ProductInfo />
            </ReviewProvider>
          }
        >
          <Route index element={<Details />} />
          <Route path="details" element={<Details />} />
          <Route path="shipping-returns" element={<Shipping />} />
          <Route path="review" element={<Review />} />
        </Route>

        {/* Login routes */}
        <Route
          path="/login"
          element={<Login customerType={getCustomerType()} />}
        />
        <Route
          path="/login/affiliated"
          element={<Login customerType={getCustomerType()} />}
        />

        {/* Affiliated routes */}
        <Route path="/affiliated" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="payment" element={<Payment />} />
          <Route path="products" element={<Products />} />
          <Route path="profile" element={<Profile />} />
          <Route path="support" element={<Support />} />
        </Route>

        {/* Redirect non-matching routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAffiliated && <Footer />}
    </>
  );
};

export default () => (
  <Router>
    <App />
  </Router>
);
