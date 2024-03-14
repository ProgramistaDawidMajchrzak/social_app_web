import React, { useState, useEffect } from 'react';
import * as S from '../style';
import UserImg from '../../../../assets/user-sample.png';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { getMyFriends, cancelInvitationOrFriendship, addInvitation } from '../../../../services/friends.service';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

function MyFriends() {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const [friends, setFriends] = useState(null);
    const [loadingFriends, setLoadingFriends] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const fetchAllFriends = async () => {
        try {
            const data = await getMyFriends();
            console.log('data.friends');
            console.log(data.friends);
            setFriends(data.friends);
            setLoadingFriends(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchAllFriends();
    }, [refresh]);

    return (
        <S.MyFriendsContainer>
            {(friends && friends.length !== 0) &&
                friends.map(friendRes =>
                    <FriendViewElement
                        route='my_friends'
                        refresh={refresh}
                        setRefresh={setRefresh}
                        myId={user.id}
                        res={friendRes}
                        key={friendRes.id}
                    />)
            }
            {(friends && friends.length === 0) &&
                <p>You have no frinds for now</p>

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
            return null;
        }
    }

    const myFriend = handleFriend(myId, res);

    const handleDeleteFriend = async (id) => {
        console.log(id);
        try {
            await cancelInvitationOrFriendship(id);
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
                    <img src={UserImg} alt="user-sample" />
                </div>
                {route === 'my_friends' ?
                    <div className='friend-info'>
                        <h6>{myFriend.name}</h6>
                        <p>Friends since: {formatDate(res.updated_at)}</p>
                    </div>
                    :
                    <div className='friend-info'>
                        <h6>{res.name}</h6>
                    </div>
                }
            </div>
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