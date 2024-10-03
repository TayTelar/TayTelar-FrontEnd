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
import MyProfile from "./customer/pages/myProfile/MyProfile";
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
import AdminLayout from "./admin/pages/layout/AdminLayout";
import AdminDashboard from "./admin/pages/dashboard/AdminDashboard";
import Management from "./admin/pages/items management/Management";
import ViewOrder from "./admin/pages/orders/ViewOrder";
import Settings from "./admin/pages/settings/Settings";
import AddProduct from "./admin/pages/items management/AddProduct";
import ShowProduct from "./admin/pages/items management/ShowProduct";
import { OrderProvider } from "./customer/pages/orders/OrderContext";
import Affiliation from "./admin/pages/affiliate/Affiliation";

const App = () => {
  const location = useLocation();
  const isAffiliated = location.pathname.startsWith("/affiliate");
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAffiliated && !isAdmin && <Header />}
      <Routes>
        {/* Main application routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<CartModal />} />
      <Route path="/myProfile" element={<MyProfile />} />
      
        <Route path="/checkout" element={<Checkout />} />
        
        <Route path="/order" element={<OrderProvider><Orders /></OrderProvider>} />
        
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
        <Route path="/login" element={<Login customerType="customer" />} />
        <Route
          path="/login/affiliate"
          element={<Login customerType="affiliate" />}
        />

        {/* Affiliated routes */}
        <Route path="/affiliate" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="payment" element={<Payment />} />
          <Route path="products" element={<Products />} />
          <Route path="profile" element={<Profile />} />
          <Route path="support" element={<Support />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="management" element={<Management />} />
          <Route path="view-orders" element={<ViewOrder />} />
          <Route path="settings" element={<Settings />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="show-products" element={<ShowProduct />} />
          <Route path="affiliate" element={<Affiliation />} />
        </Route>

        {/* Redirect non-matching routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAffiliated && !isAdmin && <Footer />}
    </>
  );
};

export default () => (
  <Router>
    <App />
  </Router>
);
