import React, { useState, useEffect } from 'react';
import { getUser } from '../../../services/auth.service';
import * as S from './style';
import UserImg from '../../../assets/user-sample.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { format } from 'date-fns';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import { FriendsStyle } from '../friends/style';

function UserView() {
    const { userId } = useParams();

    const [userData, setUserData] = useState(null);
    const [loadingData, setLoadingData] = useState(true);

    const fetchUserData = async (id) => {
        try {
            const data = await getUser(id);
            setUserData(data.user);
            setLoadingData(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchUserData(userId);
    }, [userId])

    return (
        <S.UserViewStyle>
            {userData ?
                <UserInfo user={userData} />
                :
                <UserInfoSkeleton />
            }
            <FriendsStyle>
                <div className="friends-nav" style={{ margin: ".8rem 1.4rem 0 1.4rem" }}>
                    <NavLink to={`/user/${userId}/posts`}>POSTS</NavLink>
                    <NavLink to={`/user/${userId}/friends`}>FRIENDS</NavLink>
                </div>
            </FriendsStyle>
            <Outlet />
        </S.UserViewStyle>
    )
}

export default UserView;

function UserInfo({ user }) {

    const formatDate = (date) => {
        return format(new Date(date), 'MMM d, RRRR');
    };

    return (
        <div className="user-info">
            <div className="flex">
                <div className="img">
                    <img src={UserImg} alt="user-sample" />
                </div>
                <div className='post-info'>
                    <h6>{user.name}</h6>
                    <p>User since: {formatDate(user.created_at)}</p>
                </div>
            </div>
            <div className="content">
                <p>
                    {user.about ?? 'No about section'}
                </p>
            </div>
        </div>
    )
}

function UserInfoSkeleton() {
    return (
        <div className="user-info">
            <div className="flex">
                <Skeleton className='img' />
                <Skeleton className='skeleton-author' count={2} />
            </div>
            <Skeleton className='skeleton-content' count={2} />
        </div>
    )
}