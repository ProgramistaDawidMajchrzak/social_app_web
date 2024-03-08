import React, { useState } from 'react';
import * as S from './style';
import BannerPhoto from '../../assets/banner-auth.png';
import { PrimaryButton, AuthInput } from '../../components/Form';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Motion } from '../../components/Motion';
import { login, register } from '../../services/auth.service';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/userSlice';


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
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: [], password: [], error: null });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            setErrors({ email: [], password: [], error: null });
            const formData = {
                'email': email,
                'password': password
            }
            try {
                const data = await login(formData);
                setLoading(false);
                console.log(data.user);
                localStorage.setItem('accessToken', data.access_token);
                dispatch(setUser(data.user));
                navigate('/board');
            } catch (error) {
                console.error('Error fetching data:', error.response.data);
                setErrors(error.response.data);
                setLoading(false);
                setPassword('');
            }
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
                    error={errors.email?.length || errors.error}
                />
                {errors.email &&
                    <ul className='errors'>
                        {errors.email.map(error => <li>{error}</li>)}
                    </ul>
                }
                <AuthInput
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    style={{ margin: '1rem 0' }}
                    error={errors.password?.length || errors.error}
                />
                {errors.password &&
                    <ul className='errors'>
                        {errors.password.map(error => <li>{error}</li>)}
                    </ul>
                }
                {errors.error &&
                    <ul className='errors'>
                        {<li>{errors.error}</li>}
                    </ul>
                }
                <PrimaryButton
                    value='Sign In'
                    loading={loading}
                />
                <p>Not a member? <span><Link to={`/register`}>SIGN UP</Link></span></p>
            </form>
        </Motion>
    )
}

export function RegisterForm() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [name, setName] = useState("");
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({ name: [], email: [], password: [], error: null });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            setErrors({ name: [], email: [], password: [], error: null });
            const formData = {
                'name': name,
                'email': email,
                'password': password,
                'password_confirmation': passwordConfirmation
            }
            try {
                await register(formData);
                setLoading(false);
                toast.success("User created succesfully, Sign In")
                navigate('/login');
            } catch (error) {
                console.error('Error fetching data:', error.response.data);
                setErrors(error.response.data);
                setLoading(false);
                setPassword('');
                setPasswordConfirmation('');
            }
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
                    error={errors.name?.length || errors.error}
                />
                {errors.name &&
                    <ul className='errors'>
                        {errors.name.map(error => <li>{error}</li>)}
                    </ul>
                }
                <AuthInput
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    style={{ margin: '1rem 0' }}
                    error={errors.email?.length || errors.error}
                />
                {errors.email &&
                    <ul className='errors'>
                        {errors.email.map(error => <li>{error}</li>)}
                    </ul>
                }
                <AuthInput
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    style={{ margin: '1rem 0' }}
                    error={errors.password?.length || errors.error}
                />
                <AuthInput
                    value={passwordConfirmation}
                    onChange={e => setPasswordConfirmation(e.target.value)}
                    type="password"
                    placeholder="Confirm password"
                    style={{ margin: '1rem 0' }}
                    error={errors.password?.length || errors.error}
                />
                {errors.password &&
                    <ul className='errors'>
                        {errors.password.map(error => <li>{error}</li>)}
                    </ul>
                }
                <PrimaryButton
                    value='Sign In'
                    loading={loading}
                />
                <p>Has account? <span><Link to={`/login`}>SIGN IN</Link></span></p>
            </form>
        </Motion>
    )
}