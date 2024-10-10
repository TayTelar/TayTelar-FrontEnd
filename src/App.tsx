import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/customer/header/Header";
import Footer from "./components/customer/footer/Footer";
import Home from "./pages/customer/home/Home";
import ContactUs from "./pages/customer/contactUs/ContactUs";
import ProductInfo from "./pages/customer/productInfo/ProductInfo";
import Details from "./pages/customer/productInfo/Details";
import Shipping from "./pages/customer/productInfo/Shipping";
import Review from "./pages/customer/productInfo/Review";
import Shop from "./pages/customer/shop/Shop";
import CartModal from "./pages/customer/cart/CartModal";
import MyProfile from "./pages/customer/myProfile/MyProfile";
import Checkout from "./pages/customer/checkout/Checkout";
import Orders from "./pages/customer/orders/Orders";
import Login from "./pages/customer/login/Login";
import { ReviewProvider } from "./pages/customer/productInfo/contexts/ReviewContext";
import Layout from "./pages/affiliated/Layout";
import Dashboard from "./pages/affiliated/Dashboard";
import Payment from "./pages/affiliated/Payment";
import Products from "./pages/affiliated/Products";
import Profile from "./pages/affiliated/Profile";
import Support from "./pages/affiliated/Support";
import AdminLayout from "./pages/admin/layout/AdminLayout";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import Management from "./pages/admin/items management/Management";
import ViewOrder from "./pages/admin/orders/ViewOrder";
import Settings from "./pages/admin/settings/Settings";
import AddProduct from "./pages/admin/items management/AddProduct";
import ShowProduct from "./pages/admin/items management/ShowProduct";
import { OrderProvider } from "./pages/customer/orders/OrderContext";
import Affiliation from "./pages/admin/affiliate/Affiliation";
import { Toaster } from "react-hot-toast";
import DoorStepFit from "./pages/customer/doorstep/DoorStepFit";
import Alteration from "./pages/customer/alteration/Alteration";

const App = () => {
  const location = useLocation();
  const isAffiliated = location.pathname.startsWith("/affiliate");
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      <Toaster position="top-right" />
      {!isAffiliated && !isAdmin && <Header />}
      <Routes>
        {/* Main application routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/fit" element={<DoorStepFit />} />
        <Route path="/cart" element={<CartModal />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/alteration" element={<Alteration />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route
          path="/order"
          element={
            <OrderProvider>
              <Orders />
            </OrderProvider>
          }
        />

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
