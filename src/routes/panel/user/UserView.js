import React, { useState, useEffect } from 'react';
import { getUser } from '../../../services/auth.service';
import * as S from './style';
import UserImg from '../../../assets/user-sample.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { format } from 'date-fns';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import { FriendsStyle } from '../friends/style';
import { useSelector } from 'react-redux';
import { updateUser } from '../../../services/auth.service';

function UserView() {
    const { userId } = useParams();
    const myId = useSelector((state) => state.user.id);

    const [userData, setUserData] = useState(null);
    const [refresh, setRefresh] = useState(true);

    const fetchUserData = async (id) => {
        try {
            const data = await getUser(id);
            setUserData(data.user);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchUserData(userId);
    }, [userId, refresh])

    return (
        <S.UserViewStyle>
            {userData ?
                <UserInfo
                    myId={myId}
                    user={userData}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
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

function UserInfo({ myId, user, refresh, setRefresh }) {

    const [editMode, setEditMode] = useState(false);
    const [about, setAbout] = useState(user.about ? user.about : '');
    const [editProcess, setEditProcess] = useState(false);

    const formatDate = (date) => {
        return format(new Date(date), 'MMM d, RRRR');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editProcess) {
            setEditProcess(true);
            try {
                await updateUser({ 'about': about });
                setEditProcess(false);
                setEditMode(false);
                setRefresh(!refresh);
            } catch (error) {
                console.error('Error fetching data:', error.response.data);
            }

        }
    }

    return (
        <div className="user-info">
            <div className="flex">
                <div className="img">
                    <img src={user.profile_photo ? `https://socialappapi-6239cbdff733.herokuapp.com/storage/${user.profile_photo}` : UserImg} alt="user-sample" />
                </div>
                <div className='post-info'>
                    <h6>{user.name}</h6>
                    <p>User since: {formatDate(user.created_at)}</p>
                </div>
            </div>
            <div className="content">
                {editMode ?
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            cols="60"
                            rows="2"
                        ></textarea>
                        <input type="submit" value="SAVE" />
                    </form>
                    :
                    <p>
                        {user.about ?? 'No about section'}
                        {user.id === myId &&
                            <span>
                                <i onClick={() => setEditMode(true)} className="fa-solid fa-sm fa-pen-to-square" style={{ color: 'var(--main-color)', marginLeft: "1rem", cursor: "pointer" }}></i>
                            </span>
                        }
                    </p>
                }
            </div>
        </div >
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