import "../../assets/scss/__topfive.scss";
import img from "../../assets/images/Ellipse 2.png";
import { IoMdTrendingUp } from "react-icons/io";

interface User {
  name: string;
  logo: string;
}

const topProducts: User[] = [
  { logo: img, name: "Raymond" },
  { logo: img, name: "Royal" },
  { logo: img, name: "Dapper" },
  { logo: img, name: "Sleek" },
  { logo: img, name: "Chinos" },
];

const TopProducts = () => {
  return (
    <div className="cards">
      <p>Top Selling Products</p>
      <ul>
        {topProducts.map((top, index) => (
          <li key={index} className="provider-item">
            <div className="img_container">
              <img src={top.logo} alt={top.name} />
            </div>
            <div className="name__container">
              <span className="name">{top.name}</span>
              <span className="percentage">
                20% <IoMdTrendingUp />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopProducts;
