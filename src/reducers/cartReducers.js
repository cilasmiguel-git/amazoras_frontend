const initialState = {
  cartItems: [],
  shippingInfo: {},
  shipping: {},
  payment: {}
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const { product, quantity } = action.payload;
      const existingItem = state.cartItems.find(item => item.product._id === product._id);

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.product._id === product._id ? { product, quantity } : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { product, quantity }],
        };
      }
    case 'CART_REMOVE_ITEM':
      const productId = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product._id !== productId),
      };
    case 'CART_SAVE_SHIPPING':
      return {
        ...state,
        shipping: action.payload,
      }
    case 'USER_SAVE_SHIPPING_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'USER_SAVE_SHIPPING_SUCCESS':
      return {
        ...state,
        loading: false,
        shippingInfo: action.payload, // Aqui você pode atualizar o estado de envio com os dados salvos
        shipping: action.payload,
      };

    case 'USER_SAVE_SHIPPING_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'USER_SAVE_PAYMENT_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'USER_SAVE_PAYMENT_SUCCESS':
      return {
        ...state,
        payment: action.payload,
      };

    case 'USER_SAVE_PAYMENT_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
