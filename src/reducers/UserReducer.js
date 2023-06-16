const initialState = {
  loading: false,
  userInfo: null,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_SIGNIN_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'USER_SIGNIN_SUCCESS':
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null
      };
    case 'USER_SIGNIN_FAILURE':
      return {
        ...state,
        loading: false,
        userInfo: null,
        error: action.payload
      };
    case 'USER_REGISTER_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'USER_REGISTER_SUCCESS':
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null
      };
    case 'USER_REGISTER_FAILURE':
      return {
        ...state,
        loading: false,
        userInfo: null,
        error: action.payload
      };
    case 'USER_LOGOUT':
      return initialState
    default:
      return state;
  }
};

export default userReducer;


