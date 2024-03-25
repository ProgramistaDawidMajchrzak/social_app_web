import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import * as S from './style';
import UserImg from '../../assets/user-sample.png';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { changeUserProfilePhoto, clearUser } from '../../features/userSlice';
import { logout, changePhoto } from '../../services/auth.service';
import loadingGif from '../../assets/loading-dark.svg';
import FriendsInvitations from './friends/FriendsInvitations';
import AdSample from '../../assets/ad-sample.png';

function PanelLayout({ refreshInv, setRefreshInv }) {
    const user = useSelector((state) => state.user);
    const friendsValue = useSelector((state) => state.friendsValue);
    const postsValue = useSelector((state) => state.postsValue);
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

    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('profile_photo', file);
        try {
            let data = await changePhoto(formData);
            dispatch(changeUserProfilePhoto(data.profile_photo));
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    console.log(user);

    return (
        <S.LayoutStyle>
            <div className="panel-sidebar">
                <div className="user-element">
                    <label htmlFor="file-input" className="edit-icon">
                        <i className="fa-solid fa-sm fa-pen-to-square" style={{ color: 'var(--gray)' }}></i>
                        <input accept=".png, .jpg, .jpeg" id="file-input" type="file" style={{ display: 'none' }} onChange={(e) => handleFileInputChange(e)} />
                    </label>
                    <div className="user-img">
                        <img src={user.profile_photo ? user.profile_photo : UserImg} alt="user-sample" />
                    </div>
                    <h5 style={{ cursor: 'pointer' }} onClick={() => navigate(`/user/${user.id}/posts`)}>{user.name}</h5>
                    <div className="user-info">
                        <div className="info-el">
                            <h6>{postsValue}</h6>
                            <p>Posts</p>
                        </div>
                        <div className="info-el">
                            <h6>{friendsValue}</h6>
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
                    {/* <div className="icon">
                        <i onClick={() => navigate('/settings')} className="fa-lg fa-solid fa-gear"
                            style={{ color: 'var(--main-color)' }}
                        ></i>
                    </div> */}
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
                        <FriendsInvitations
                            refreshInv={refreshInv}
                            setRefreshInv={setRefreshInv}
                            type='receive'
                        />
                        <FriendsInvitations
                            refreshInv={refreshInv}
                            setRefreshInv={setRefreshInv}
                            type='sent'
                        />
                        {/* <Advertise /> */}
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