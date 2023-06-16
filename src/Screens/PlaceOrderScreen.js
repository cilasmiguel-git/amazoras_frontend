import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {

    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const { cartItems, shippingInfo, payment } = cart;
    const itemsPrice = cartItems.reduce((a, c) => a + c.product.price * parseInt(c.quantity), 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;
    console.log(cartItems)
    console.log(shippingInfo)
    console.log(payment.paymentMethod)
    if (!shippingInfo.address) {
        navigate('/shipping');
    } else if (!payment.paymentMethod) {
        navigate('/payment');
    }

    const placeOrderHandler = () => {
        //Create a Order

    }

    useEffect(() => {

    }, []);

    return (
        <div>
            <div>
                <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            </div>
            <div className='placeorder'>
                <div className='placeorder-info'>
                    <div>
                        <h3>Shipping</h3>
                    </div>
                    <div>
                        {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.country}
                    </div>
                    <div>
                        <h3>Payment</h3>
                        <div>
                            Payment Method: {payment.paymentMethod}
                        </div>
                    </div>
                    <div className='m-0'>
                        <h3>Shopping Cart</h3>
                        {cartItems.length === 0 ? (
                            <div>Cart is Empty</div>
                        ) : (
                            <ul className='cart-list-container'>
                                <div className='price'>Price</div>
                                {cartItems.map(item => (
                                    <li key={item.product._id}>
                                        <div className='cart-image'>
                                            <img src={item.product.image} alt='product' />
                                        </div>
                                        <div className='cart-name'>
                                            <div>
                                                <Link to={'/product/' + item.product._id}>{item.product.name}</Link>
                                            </div>
                                            <div>
                                                Qty: {item.quantity}
                                            </div>
                                        </div>
                                        <div className='cart-price'>
                                            ${item.product.price}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className='placeorder-action'>
                    <ul>
                        <li><button className='button primary full-width' onClick={placeOrderHandler}> Place Order</button></li>
                        <li><h3>Order Summary</h3></li>
                        <li>
                            <div>Items</div>
                            <div>{itemsPrice}</div>
                        </li>
                        <li>
                            <div>Shipping</div>
                            <div>{shippingPrice}</div>
                        </li>
                        <li>
                            <div>tax</div>
                            <div>{taxPrice}</div>
                        </li>
                        <li>
                            <div>Order Total</div>
                            <div>{totalPrice}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;
