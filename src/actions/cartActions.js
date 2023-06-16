import axios from 'axios';
import Cookie from "js-cookie"

export const addToCart = (productId, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        product: data,
        quantity,
      },
    });
    // Atualizar os cookies
    Cookie.set('cartItems', JSON.stringify(getState().cart.cartItems))
  } catch (error) {
    dispatch({
      type: 'CART_ADD_ITEM_FAILURE',
      payload: error,
    });
  }
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: 'CART_REMOVE_ITEM',
    payload: productId,
  });

  // Atualizar o localStorage
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShipping = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_SAVE_SHIPPING_REQUEST' });

    // Aqui você pode fazer a chamada para a API ou executar qualquer outra lógica necessária

    dispatch({ type: 'USER_SAVE_SHIPPING_SUCCESS',payload:data});

    // Após o salvamento bem-sucedido, você pode despachar outras ações se necessário

  } catch (error) {
    dispatch({
      type: 'USER_SAVE_SHIPPING_FAIL',
      payload: error.message,
    });
  }
};

export const savePayment = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_SAVE_PAYMENT_REQUEST' });

    // Aqui você pode fazer a chamada para a API ou executar qualquer outra lógica necessária

    dispatch({ type: 'USER_SAVE_PAYMENT_SUCCESS', payload: data });

    // Após o salvamento bem-sucedido, você pode despachar outras ações se necessário

  } catch (error) {
    dispatch({
      type: 'USER_SAVE_PAYMENT_FAIL',
      payload: error.message,
    });
  }
};