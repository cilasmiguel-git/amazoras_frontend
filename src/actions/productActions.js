import apiAxios from '../api/apiAxios';
// Ação para buscar a lista de produtos
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });

    const response = await apiAxios.get('/api/products');
    const products = response.data;

    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: products });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
};

export const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'SAVE_PRODUCT_REQUEST' });

    const { user: { userInfo } } = getState();
    const config = {
      headers: {
        'Authorization': `Bearer ${userInfo.data.token}`,
      },
    };

    const response = await apiAxios.post('/api/products', product, config);
    const savedProduct = response.data;

    dispatch({ type: 'SAVE_PRODUCT_SUCCESS', payload: savedProduct });
  } catch (error) {
    dispatch({ type: 'SAVE_PRODUCT_FAILURE', payload: error.message });
  }
};


export const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_DETAILS_REQUEST' });

    const response = await apiAxios.get(`/api/products/${productId}`);
    const product = response.data;

    dispatch({ type: 'PRODUCT_DETAILS_SUCCESS', payload: product ,success:true});
  } catch (error) {
    dispatch({ type: 'PRODUCT_DETAILS_FAILURE', payload: error.message });
  }
};


export const updateProduct = (productId, productData) => async (dispatch, getState) => {
  dispatch({ type: 'PRODUCT_UPDATE_REQUEST', payload: productId });
  try {
    const { user: { userInfo } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.data.token}`
      }
    };
    const response = await apiAxios.put(`/api/products/${productId}`, productData, config);
    const updatedProduct = response.data;
    dispatch({ type: 'PRODUCT_UPDATE_SUCCESS', payload: updatedProduct });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_UPDATE_FAILURE',
      payload: error.message
    });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'PRODUCT_DELETE_REQUEST' });

    const { user: { userInfo } } = getState();
    const config = {
      headers: {
        'Authorization': `Bearer ${userInfo.data.token}`,
      },
    };

    const response = await apiAxios.delete(`/api/products/${productId}`, config);
    const deletedProducts = response.data ;
    dispatch({ type: 'PRODUCT_DELETE_SUCCESS', payload: deletedProducts });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DELETE_FAILURE',
      payload: error.message
    });
  }
};
