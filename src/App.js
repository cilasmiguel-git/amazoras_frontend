import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import ProductScreen from './Screens/ProductScreen';
import HomeScreen from './Screens/HomeScreen';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from "./Screens/RegisterScreen";
import ProductsScreen from './Screens/productsScreen';
import ShippingScreen from './Screens/ShippingScreen';
import NotFound from './Screens/NotFound';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import ProfileScreen from './Screens/ProfileScreen';

function App() {
  const userInfo = useSelector(state => state.user);
  userInfo.userInfo != null ?
    (console.log('Usuário logado:', userInfo ? userInfo : null))
    :
    (console.log('Usuário deslogado:', userInfo ? userInfo : null))

  const { loading, userInfo: user, error } = userInfo; // Atualize para 'user'
  const isAdmin = user && user.data && user.data.isAdmin ? user.data.isAdmin : false;

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };

  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };

  return (
    <Router>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">Amazoras</Link>
          </div>
          <div className="header-links">
            <Link to="/cart">Cart</Link>
            {!userInfo || !userInfo.userInfo ? (
              <Link to="/signin">Sign In</Link>
            ) : (
              <Link to={`/profile/${userInfo.userInfo.data._id}`}>
                {userInfo.userInfo.data.name}
              </Link>
            )}
            {userInfo.userInfo && userInfo.userInfo.data.isAdmin && (
              <Link className='color-blue' to="/addproducts">AdminArea</Link>
            )}

          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="index.html">Shirts</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Routes>
              <Route path="/notfound" element={<NotFound />} />
              <Route path="/*" element={<NotFound />} />
              {isAdmin === true ? (
                <Route path="/addproducts" element={<ProductsScreen />} />
              ) : (
                console.log('(404)NotFound')
              )}
              <Route path='/shipping' element={<ShippingScreen />} />
              <Route path='/signin/shipping' element={<ShippingScreen />} />
              <Route path='/register/shipping' element={<ShippingScreen />} />
              <Route path='/payment' element={<PaymentScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/products/:id" element={<ProductScreen />} />
              <Route path="/cart/:id?" element={<CartScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path='/profile/:id' element={<ProfileScreen />} />
            </Routes>
          </div>
        </main>
        <footer className="footer">all right reserved.</footer>
      </div>
    </Router>
  );
}

export default App;
