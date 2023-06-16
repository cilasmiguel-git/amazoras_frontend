import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../actions/userActions';
import { savePayment, saveShipping } from '../actions/cartActions';
import { useSearchParams } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
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
        dispatch(savePayment({paymentMethod}));
        navigate('/placeorder')
    };

    return (
        <div>
            <div>
                <CheckoutSteps step1 step2 step3></CheckoutSteps>
            </div>
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>Payment</h2>
                        </li>
                        <li>
                            {loading && <div>Loading...</div>}
                            {error && <div>{error}</div>}
                        </li>
                        <li>
                            <div>
                                <input
                                    type="radio"
                                    id="paymentMethod"
                                    name="paymentMethod"
                                    value="paypal"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label htmlFor="paymentMethod">paypal</label>
                            </div>
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

export default PaymentScreen;
