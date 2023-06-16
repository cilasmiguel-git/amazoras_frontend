import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { listProducts, saveProduct, updateProduct, deleteProduct } from '../actions/productActions';
import Modal from 'react-modal';

const ProductsScreen = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [productId, setProductId] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const productSave = useSelector((state) => state.product);
  const { loading, success, error } = productSave;

  const productList = useSelector((state) => state.product);
  const { loading: listLoading, success: successList, error: errorList, products } = productList;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch,navigate,successList,success]);

  const openModal = (action, productId) => {
    setModalAction(action);
    setIsModalOpen(true);
    setProductId(productId);
    setIsEdit(action === 'edit');
    if (action === 'edit') {
      // Aqui você pode fazer qualquer lógica necessária antes de iniciar a edição
      // Por exemplo, pode recuperar as informações do produto com base no ID fornecido
      // e preencher os campos de formulário com essas informações
      const product = products.find((product) => product._id === productId);

      if (product) {
        setName(product.name);
        setImage(product.image);
        setBrand(product.brand);
        setPrice(product.price);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setRating(product.rating);
        setNumReviews(product.numReviews);
      }
    } else {
      // Limpe os campos de formulário ao iniciar a criação de um novo produto
      setName('');
      setImage('');
      setBrand('');
      setPrice(0);
      setCategory('');
      setCountInStock(0);
      setDescription('');
      setRating(0);
      setNumReviews(0);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitHandler = (e) => {
    console.log(productId)
    e.preventDefault();
    if (isEdit) {
      // Chame a ação de atualização do produto com os dados do produto atualizado
      dispatch(
        updateProduct(productId, {
          name,
          image,
          brand,
          price,
          category,
          countInStock,
          description,
          rating,
          numReviews,
        }),
      );
      closeModal();
    } else {
      // Chame a ação de criação do produto com os dados do novo produto
      dispatch(
        saveProduct({
          name,
          image,
          brand,
          price,
          category,
          countInStock,
          description,
          rating,
          numReviews,
        })
      );
      closeModal();
    }
  };


  const deleteHandler = (productId) => {
    console.log(productId)
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId));
    }
  };

  return (
    <div>
      <div className='content content-margined'>
        <div className='product-header'>
          <h3>Products</h3>
          <button className='button primary' style={{ width:'12rem',height:'4rem'}} onClick={() => openModal('create', productId)}>Create Product</button>
        </div>
        <div className='product-list'>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link style={{ marginLeft: '15px' }} to={`/products/${product._id}`}>View</Link>
                    <button className='button' style={{ background: 'white', marginLeft: '15px' }} onClick={() => openModal('edit', product._id)}>Edit</button>
                    <button className='button' style={{ background: '#e64040', marginLeft: '10px' }} onClick={() => deleteHandler(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        {modalAction === 'create' ? (
          <form onSubmit={submitHandler} >
            <h2>Create Product</h2>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <ul className="form-container" style={{ width: '92%' }}>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="countInStock">Count in Stock</label>
                <input
                  type="number"
                  name="countInStock"
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <label htmlFor="rating">Rating</label>
                <input
                  type="number"
                  name="rating"
                  id="rating"
                  onChange={(e) => setRating(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="numReviews">Number of Reviews</label>
                <input
                  type="number"
                  name="numReviews"
                  id="numReviews"
                  onChange={(e) => setNumReviews(e.target.value)}
                />
              </li>
              <li>
                <button type="submit" className="button primary">
                  Create
                </button>
              </li>
              <li>
                <Link to="/" className="button secondary text-center">
                  Back to Home
                </Link>
              </li>
            </ul>
          </form>
        ) : (
          <form onSubmit={submitHandler}>
            <h2>Edit Product</h2>
            {listLoading && <div>Loading...</div>}
            {errorList && <div>{errorList}</div>}
            <ul className="form-container" style={{ width: '92%' }}>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="countInStock">Count in Stock</label>
                <input
                  type="number"
                  name="countInStock"
                  id="countInStock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <label htmlFor="rating">Rating</label>
                <input
                  type="number"
                  name="rating"
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="numReviews">Number of Reviews</label>
                <input
                  type="number"
                  name="numReviews"
                  id="numReviews"
                  value={numReviews}
                  onChange={(e) => setNumReviews(e.target.value)}
                />
              </li>
              <li>
                <button type="submit" className="button primary">
                  Update
                </button>
              </li>
              <li>
                <Link to="/" className="button secondary text-center">
                  Back to Home
                </Link>
              </li>
            </ul>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default ProductsScreen;
