import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions'; // Importe a ação de busca de produtos
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(listProducts()); // Despache a ação de busca de produtos ao carregar o componente
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>Ocorreu um erro: {error}</p>
      ) : (
        <div>
          
          <ul className="products">
            {Array.isArray(products) && products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <Link to={'/products/' + product._id}>
                    <img
                      className="product-image"
                      src={product.image}
                      alt="products"
                    />
                  </Link>
                  <div className="product-name">
                    <Link to={'/products/' + product._id}>{product.name}</Link>
                  </div>
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-price">${product.price}</div>
                  <div className="product-rating">
                    {product.rating} Stars ({product.numReviews} Reviews)
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
