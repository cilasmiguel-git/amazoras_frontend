import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../actions/userActions';
import { saveShipping } from '../actions/cartActions';
import { useSearchParams } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const user = useSelector(state => state.user);
  const { loading, userInfo, error } = user;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (userInfo) {

    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch action to handle shipping information
    dispatch(saveShipping({address, city, postalCode, country}));
    navigate('/payment')
  };

  return (
    <div>
      <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
      </div>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>
            <li>
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
            </li>
            <li>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                onChange={(e) => setCity(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </li>
            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;
