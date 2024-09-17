import "../assets/sass/support/_support.scss";
import { FaPuzzlePiece } from "react-icons/fa6";
import { RiAccountCircleLine } from "react-icons/ri";
import { FaRegCreditCard } from "react-icons/fa";

interface HelpCard {
  icon: JSX.Element;
  title: string;
  description: string;
}

const helpCards: HelpCard[] = [
  {
    icon: <FaPuzzlePiece className="icon" />,
    title: "Getting Started",
    description: "Start off on the right foot! Not the left one!",
  },
  {
    icon: <RiAccountCircleLine className="icon" />,
    title: "Account Settings",
    description: "You're a special snowflake and so is your account",
  },
  {
    icon: <FaRegCreditCard className="icon" />,
    title: "Billing",
    description: "That feel when you look at your bank account",
  },
];

const Support: React.FC = () => {
  return (
    <div className="support-page">
      <div className="support-header">
        <p>Welcome to Taytelar Help and Support</p>
        <div className="search-bar">
          <input type="text" placeholder="How can we help you?" />
          <button>GET HELP</button>
        </div>
      </div>
      <div className="help-section">
        <h2>Need help? We have got your back</h2>
        <p>Perhaps you can find the answers in our collections</p>
        <div className="help-cards">
          {helpCards.map((card, index) => (
            <div className="card" key={index}>
              {card.icon}
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
