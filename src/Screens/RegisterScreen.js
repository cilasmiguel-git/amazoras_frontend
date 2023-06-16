import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../actions/userActions';
import { useSearchParams } from 'react-router-dom';
const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.user);
    const { loading, userInfo, error } = userRegister;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const redirecth = searchParams.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirecth);
        }
    }, [userInfo, navigate,redirecth]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== repassword) {
            // Senha e confirmação de senha não coincidem, exiba um erro ou faça alguma ação
            console.log("As senhas não coincidem");
            alert("campos de senha invalidos !");
            return;
        }
        dispatch(register(name, email, password)); // Chama a action de registro passando os dados do usuário
    };


    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Register</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                    </li>
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
                        <label htmlFor="repassword">Confirm Password</label>
                        <input
                            type="password"
                            id="repassword"
                            name="repassword"
                            onChange={(e) => setRePassword(e.target.value)}
                        />
                    </li>

                    <li>
                        <button type="submit" className="button primary">
                            Register
                        </button>
                    </li>
                    <li>Already have an account?</li>
                    <li>
                        <Link to={redirecth === "/" ? `/signin` : `/signin?redirect=${encodeURIComponent(redirecth)}`} className="button secondary text-center">
                            Signin
                        </Link>
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default RegisterScreen;
