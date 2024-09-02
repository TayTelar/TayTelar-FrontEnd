import { NavLink } from "react-router-dom";
import "../../assets/sass/components/_breadcrumbs.scss"; // Adjust path as necessary

const Breadcrumbs = ({ crumbs }) => {
  return (
    <nav className="breadcrumbs">
      <ul>
        {crumbs.map((crumb, index) => (
          <li key={index}>
            {index > 0 && <span> &gt; </span>}
            {crumb.path ? (
              <NavLink to={crumb.path} className="breadcrumb-link">
                {crumb.label}
              </NavLink>
            ) : (
              <span>{crumb.label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
