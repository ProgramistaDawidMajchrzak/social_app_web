import React, { useState } from 'react';
import * as S from './style';
import BannerPhoto from '../../assets/banner-auth.png';
import { PrimaryButton, AuthInput } from '../../components/Form';
import { Outlet, Link } from 'react-router-dom';
import { Motion } from '../../components/Motion';
import { fetchData, login } from '../../services/auth.service';

function AuthLayout() {

    return (
        <S.AuthContainer>
            <div className="auth-container">
                <Outlet />
            </div>
            <div className="auth-banner">
                <img src={BannerPhoto} alt="auth-banner" />
            </div>
        </S.AuthContainer>
    )
}

export default AuthLayout;


export function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            'email': 'davo123@mail.com',
            'password': 'password'
        }
        try {
            const data = await login(formData);
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <Motion>
            <form onSubmit={e => handleSubmit(e)}>
                <h3>Sign In</h3>
                <AuthInput
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />
                <AuthInput
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    style={{ margin: '1rem 0' }}
                />
                <PrimaryButton
                    value='Sign In'
                    onClick={() => { }}
                />
                <p>Not a member? <span><Link to={`/register`}>SIGN UP</Link></span></p>
            </form>
        </Motion>
    )
}

export function RegisterForm() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [data, setData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await fetchData();
            setData(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <Motion>
            <form onSubmit={e => handleSubmit(e)}>
                <h3>Sign up</h3>
                <AuthInput
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                />
                <AuthInput
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    style={{ margin: '1rem 0' }}
                />
                <AuthInput
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    style={{ margin: '1rem 0' }}
                />
                <AuthInput
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Confirm password"
                    style={{ margin: '1rem 0' }}
                />
                <PrimaryButton
                    value='Sign Up'
                    onClick={() => { }}
                />
                <p>Has account? <span><Link to={`/login`}>SIGN IN</Link></span></p>
            </form>
        </Motion>
    )
}