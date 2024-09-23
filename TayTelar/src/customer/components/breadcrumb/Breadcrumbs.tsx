import React from 'react';
import { NavLink } from 'react-router-dom';
import "../../assets/sass/components/_breadcrumbs.scss"; 

interface Breadcrumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  crumbs: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
  return (
    <nav className="breadcrumbs">
      <ul>
        {crumbs.map((crumb, index) => (
          <li key={index}>
            {index > 0 &&  <span> / </span>} 
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
