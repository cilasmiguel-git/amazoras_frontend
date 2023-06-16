import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer';
import thunk from 'redux-thunk';
import cartReducer from './reducers/cartReducers';
import userReducer from './reducers/UserReducer';
import Cookies from 'js-cookie';
import { addToCart } from './actions/cartActions';

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
  },
  middleware: [thunk],
});

// Carregar o estado inicial do carrinho a partir do cookie
const cartItemsFromCookie = Cookies.get('cartItems');
if (cartItemsFromCookie) {
  store.dispatch(addToCart(JSON.parse(cartItemsFromCookie)));
}

// Carregar o estado inicial do usuário a partir do cookie
const userInfoFromCookie = Cookies.get('userInfo');
if (userInfoFromCookie) {
  console.log('User info from cookie:', JSON.parse(userInfoFromCookie));
  store.dispatch({ type: 'USER_SIGNIN_SUCCESS', payload: JSON.parse(userInfoFromCookie) });
}


// Atualizar o cookie sempre que o estado do carrinho for modificado
store.subscribe(() => {
  const cartItems = store.getState().cart.cartItems;
  Cookies.set('cartItems', JSON.stringify(cartItems));
});

export default store;
