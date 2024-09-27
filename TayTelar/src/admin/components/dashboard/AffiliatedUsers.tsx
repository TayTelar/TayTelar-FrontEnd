import "../../assets/scss/__topfive.scss";
import myntra from "../../assets/images/myntra.png";
import amazon from "../../assets/images/amazon.png";
import flipkart from "../../assets/images/flipkart.png";
import shein from "../../assets/images/shein.png";
import soul from "../../assets/images/soul.png";
import { IoMdTrendingUp } from "react-icons/io";

interface User {
  name: string;
  logo: string;
}

const affiliatedUsers: User[] = [
  { logo: myntra, name: "Myntra" },
  { logo: amazon, name: "Amazon" },
  { logo: flipkart, name: "Flipkart" },
  { logo: shein, name: "Shein" },
  { logo: soul, name: "Soul" },
];

const AffiliatedUsers = () => {
  return (
    <div className="cards">
      <p>Top Affiliated Users</p>
      <ul>
        {affiliatedUsers.map((user, index) => (
          <li key={index} className="user-item">
            <div className="img_container">
              <img src={user.logo} alt={user.name} />
            </div>
            <div className="name__container">
              <span className="name">{user.name}</span>
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

export default AffiliatedUsers;
