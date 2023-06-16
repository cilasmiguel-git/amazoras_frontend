import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../actions/userActions';
import { useSearchParams } from 'react-router-dom';

const SigninScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.user); // Atualize para 'state.user'
  const { loading, userInfo, error } = user; // Atualize para 'user'
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const redirecth = searchParams.get('redirect') || '/';  
  
  useEffect(() => {
    if (userInfo) {
      navigate(redirecth);
    }
  }, [userInfo, navigate, redirecth]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Signin</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary">
              Signin
            </button>
          </li>
          <li>New to Amazoras?</li>
          <li>
            <Link to={redirecth === "/" ? `/register` : `/register?redirect=${encodeURIComponent(redirecth)}`} className="button secondary text-center">
              Create account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default SigninScreen;
