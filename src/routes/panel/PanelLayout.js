import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import * as S from './style';
import UserImg from '../../assets/user-sample.png';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearUser } from '../../features/userSlice';
import { logout } from '../../services/auth.service';
import loadingGif from '../../assets/loading-dark.svg';
import FriendsInvitations from './friends/FriendsInvitations';
import AdSample from '../../assets/ad-sample.png';

function PanelLayout() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            localStorage.clear();
            dispatch(clearUser());
            navigate('/login');
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }
    return (
        <S.LayoutStyle>
            <div className="panel-sidebar">
                <div className="user-element">
                    <div className="user-img">
                        <img src={UserImg} alt="user-sample" />
                    </div>
                    <h5>{user.name}</h5>
                    <div className="user-info">
                        <div className="info-el">
                            <h6>63</h6>
                            <p>Posts</p>
                        </div>
                        <div className="info-el">
                            <h6>20</h6>
                            <p>Friends</p>
                        </div>
                    </div>
                </div>
                <S.Navigation>
                    <ul>
                        <li>
                            <NavLink to='/board'>
                                <div className="icon">
                                    <i
                                        className="fa-solid fa-bars"
                                        style={{ color: 'var(--gray)' }}
                                    ></i>
                                </div>
                                <p>Board</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/friends'>
                                <div className="icon">
                                    <i
                                        className="fa-solid fa-user-group"
                                        //className="fa-solid fa-right-from-bracket"
                                        style={{ color: 'var(--gray)' }}
                                    ></i>
                                </div>
                                <p>Friends</p>
                            </NavLink>
                        </li>
                    </ul>
                </S.Navigation>
            </div>
            <div className="panel-main">
                <div className="panel-header">
                    search + settings + logout
                    <div className="icon">
                        <i className="fa-lg fa-solid fa-gear"
                            style={{ color: 'var(--main-color)' }}
                        ></i>
                    </div>
                    <div className="icon">
                        {loading ? <img src={loadingGif} alt="loading-gif" /> :
                            <i onClick={handleLogout} className="fa-lg fa-solid fa-right-from-bracket"
                                style={{ color: 'var(--main-color)' }}
                            ></i>
                        }
                    </div>
                </div>
                <div className="panel-flex">
                    <div className="panel-content">
                        <Outlet />
                    </div>
                    <div className="panel-sidebar right-side">
                        <FriendsInvitations />
                        <Advertise />
                    </div>
                </div>
            </div>
        </S.LayoutStyle >
    )
}

export default PanelLayout;

function Advertise() {
    return (
        <S.Ad>
            <img src={AdSample} alt="adv" />
            <h4>Special offer: 20% off today</h4>
            <a href="https://adidas.com">https://adidas.com</a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </S.Ad>
    )
}