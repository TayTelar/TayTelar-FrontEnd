import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../../../assets/customer/sass/pages/_product.scss';

const Product = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>('details');

  useEffect(() => {
    // Set the active tab based on the current route
    if (location.pathname.includes('details')) {
      setActiveTab('details');
    } else if (location.pathname.includes('shipping-returns')) {
      setActiveTab('shipping');
    } else if (location.pathname.includes('review')) {
      setActiveTab('reviews');
    }
  }, [location.pathname]);

  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className='product'>
      <div className='productlist-heading'>
        <ul>
          <li>
            <Link
              to="details"
              className={`details ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => handleClick('details')}
            >
              Details
            </Link>
          </li>
          <li>
            <Link
              to="shipping-returns"
              className={`shipping ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => handleClick('shipping')}
            >
              Shipping & Return
            </Link>
          </li>
          <li>
            <Link
              to="review"
              className={`reviews ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => handleClick('reviews')}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <div className='outlet'>
      <Outlet />
      </div>
    </div>
  );
}

export default Product;
