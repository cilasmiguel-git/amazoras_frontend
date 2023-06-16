import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';

const CartScreen = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const qty = new URLSearchParams(useLocation().search).get('qty') || 0;
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems); // Obtém os itens do carrinho do estado
    const userInfo = useSelector(state => state.user.userInfo);

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty));
        }
    }, [dispatch, id, qty]);

    const checkoutHandler = () => {
        if (userInfo) {
            navigate('/shipping');
        } else {
            navigate('/signin?redirect=shipping');
        }
    };

    const removeFromCartHandle = (productId) => {
        dispatch(removeFromCart(productId))
    }

    return (
        <div className='cart'>
            <div className='cart-list'>
                <div className='m-0'>
                    <h3>Shopping Cart</h3>
                    {cartItems.length === 0 ? (
                        <div>Cart is Empty</div>
                    ) : (
                        <ul className='cart-list-container'>
                            <div className='price'>price</div>
                            {cartItems.map(item => (
                                <li key={item.product._id}>
                                    <div className='cart-image'>
                                        <img src={item.product.image} alt='product' />
                                    </div>
                                    <div className='cart-name'>
                                        <div>
                                            <Link to={'/product/' + item.product}>{item.product.name}</Link>
                                        </div>
                                        <div>
                                            <select className='select-qty' value={item.quantity} onChange={(e) => dispatch(addToCart(item.product._id, e.target.value))}>
                                                {
                                                    [...Array(item.product.countInStock).keys()].map(x =>
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    )
                                                }
                                            </select>
                                            <button type='button' className='button-delete' onClick={() => removeFromCartHandle(item.product._id)}>Delete</button>
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
            <div className='cart-action'>
                <h3>Subtotal: {cartItems.reduce((a, c) => a + +c.quantity, 0)} items</h3>
                <h3>Total: {cartItems.reduce((a, c) => a + c.quantity * c.product.price, 0)}$</h3>
                <button className='button primary full-width' disabled={cartItems.length === 0} onClick={checkoutHandler} >Checkout</button>
            </div>
        </div>
    );
};

export default CartScreen;