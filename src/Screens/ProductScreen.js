import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductDetails } from '../actions/productActions';

const ProductScreen = (props) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log('Product ID:', id);
  const navigate = useNavigate();
  const { loading, error, product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    navigate("/cart/" + id + "?qty=" + qty);
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <div className='back-to-result'>
            <Link to="/">Back to result</Link>
          </div>
          <div className='details'>
            <div className='details-image'>
              <img src={product.image} alt='product'></img>
            </div>
            <div className='details-info'>
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
                <li>
                  {product.rating} Stars ({product.numReviews} Reviews)
                </li>
                <li>
                  Price: <b>${product.price}</b>
                </li>
                <li>
                  Description:
                  <div>{product.description}</div>
                </li>
              </ul>
            </div>
            <div className='details-action'>
              <ul>
                <li>Price: ${product.price}</li>
                <li>Status: {product.countInStock > 0 ? "In Stock" : "Out of Stock"}</li>
                <li>
                  Qty:
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {
                      [...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))
                    }
                  </select>
                </li>
                <li>
                  {product.countInStock > 0 &&
                    <button onClick={handleAddToCart} className='button'>Add to Cart</button>
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>

      )}
    </div>
  );
};

export default ProductScreen;
