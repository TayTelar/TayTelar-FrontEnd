import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import ContactUs from "./pages/contactUs/ContactUs";


const App = () => (
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contactUs" element={<ContactUs />} />
        </Routes>
        <Footer />
    </Router>
);

export default App;
