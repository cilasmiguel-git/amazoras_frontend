const initialState = {
  products: [],
  loading: false,
  error: null,
  product: {}, // Estado para os detalhes do produto
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case 'FETCH_PRODUCTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'PRODUCT_DETAILS_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'PRODUCT_DETAILS_SUCCESS':
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case 'PRODUCT_DETAILS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //
    case 'SAVE_PRODUCT_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'SAVE_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };
    case 'SAVE_PRODUCT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //
    case 'PRODUCT_UPDATE_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'PRODUCT_UPDATE_SUCCESS':
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case 'PRODUCT_UPDATE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //
    case 'PRODUCT_DELETE_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'PRODUCT_DELETE_SUCCESS':
      return {
        ...state,
        loading: false,
        products: state.products.filter(
          (product) => product._id !== action.payload._id
        ),
      };
    case 'PRODUCT_DELETE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
