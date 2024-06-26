import React, { useState, useEffect } from 'react';
import * as S from '../style';
import UserImg from '../../../../assets/user-sample.png';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { getMyFriends, cancelInvitationOrFriendship, addInvitation } from '../../../../services/friends.service';
import Skeleton from 'react-loading-skeleton';
import { useSelector, useDispatch } from 'react-redux';
import { decreaseFriendsValue } from '../../../../features/userSlice';

function MyFriends({ refreshInv, setRefreshInv }) {

    const user = useSelector((state) => state.user);

    const [friends, setFriends] = useState(null);
    const [loadingFriends, setLoadingFriends] = useState(true);

    const fetchAllFriends = async () => {
        try {
            const data = await getMyFriends();
            setFriends(data.friends);
            setLoadingFriends(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchAllFriends();
    }, [refreshInv]);

    return (
        <S.MyFriendsContainer>
            {(friends && friends.length !== 0) &&
                friends.map(friendRes =>
                    <FriendViewElement
                        route='my_friends'
                        refresh={refreshInv}
                        setRefresh={setRefreshInv}
                        myId={user.id}
                        res={friendRes}
                        key={friendRes.id}
                    />)
            }
            {(friends && friends.length === 0) &&
                <p>You have no friends for now</p>

            }
            {loadingFriends &&
                <>
                    <FriendViewElementSkeleton />
                    <FriendViewElementSkeleton />
                </>
            }
        </S.MyFriendsContainer>
    )
}

export default MyFriends;

export function FriendViewElement({ route, refresh, setRefresh, myId, res }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formatDate = (date) => {
        return format(new Date(date), 'EEEE, MMM d, h:mm a');
    };

    const handleFriend = (myId, friend) => {
        if (myId) {
            if (friend.sender.id === myId) {
                return friend.recipient;
            } else {
                return friend.sender;
            }
        } else {
            return friend.name;
        }
    }


    const myFriend = handleFriend(myId, res);

    const handleDeleteFriend = async (id) => {
        try {
            await cancelInvitationOrFriendship(id);
            dispatch(decreaseFriendsValue());
            setRefresh(!refresh);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleAddFriend = async (id) => {
        try {
            await addInvitation(id);
            setRefresh(!refresh);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <S.FriendViewStyle>
            <div className="flex">
                <div className="img">
                    {route === 'all_people' ?
                        <img src={res.profile_photo ? `https://socialappapi-6239cbdff733.herokuapp.com/storage/${res.profile_photo}` : UserImg} alt="user-sample" />
                        :
                        <img src={myFriend.profile_photo ? `https://socialappapi-6239cbdff733.herokuapp.com/storage/${myFriend.profile_photo}` : UserImg} alt="user-sample" />

                    }
                </div>
                {route === 'my_friends' || route === 'user_friends' ?
                    <div className='friend-info'>
                        <h6 onClick={() => navigate(`/user/${myFriend.id}/posts`)}>{myFriend.name}</h6>
                        <p>Friends since: {formatDate(res.updated_at)}</p>
                    </div>
                    :
                    <div className='friend-info'>
                        <h6 onClick={() => navigate(`/user/${res.id}/posts`)}>{res.name}</h6>
                    </div>
                }
            </div>
            {route !== 'user_friends' &&
                <>
                    {route === 'my_friends' ?
                        <div className="action">
                            <button className='remove' onClick={() => handleDeleteFriend(res.id)}>
                                <i
                                    className="fa-solid fa-handshake-simple-slash"
                                    style={{ color: 'var(--gray)' }}
                                ></i>
                            </button>
                        </div>
                        :
                        <>
                            {res.friendship_id ?
                                <>
                                    {res.status[0].status === 'accepted' ?
                                        <div className="action">
                                            <button className='remove' onClick={() => handleDeleteFriend(res.friendship_id)}>
                                                <i
                                                    className="fa-solid fa-handshake-simple-slash"
                                                    style={{ color: 'var(--gray)' }}
                                                ></i>
                                            </button>
                                        </div>
                                        :
                                        <>
                                            <div className="action">
                                                <button className='pending'>
                                                    <i
                                                        className="fa-solid fa-hourglass-half"
                                                        style={{ color: 'var(--gray)' }}
                                                    ></i>
                                                    <i
                                                        className="fa-solid fa-handshake-simple"
                                                        style={{ color: 'var(--gray)' }}
                                                    ></i>
                                                </button>
                                                <button className='remove' onClick={() => handleDeleteFriend(res.friendship_id)}>
                                                    <i
                                                        className="fa-solid fa-xmark"
                                                        style={{ color: 'var(--gray)' }}
                                                    ></i>
                                                </button>
                                            </div>
                                        </>
                                    }
                                </>
                                :
                                <div className="action">
                                    <button className='add' onClick={() => handleAddFriend(res.id)}>
                                        <i
                                            className="fa-solid fa-handshake-simple"
                                            style={{ color: 'var(--gray)' }}
                                        ></i>
                                    </button>
                                </div>
                            }
                        </>

                    }
                </>
            }
        </S.FriendViewStyle>
    )
};
export function FriendViewElementSkeleton() {

    return (
        <S.FriendViewStyle>
            <div className="flex">
                <Skeleton
                    className='img'
                />
                <Skeleton
                    className='skeleton-author'
                    count={2} />
            </div>
        </S.FriendViewStyle>
    )
};