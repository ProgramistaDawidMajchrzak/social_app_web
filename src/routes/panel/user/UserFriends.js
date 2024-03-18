import React, { useState, useEffect } from 'react';
import * as S from './style';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserFriends } from '../../../services/friends.service';
import { FriendViewElement, FriendViewElementSkeleton } from '../friends/my_friends/MyFriends';
import { MyFriendsContainer } from '../friends/style';

function UserFriends({ refreshInv, setRefreshInv }) {

    // const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const { userId } = useParams();

    const [friends, setFriends] = useState(null);
    const [loadingFriends, setLoadingFriends] = useState(true);

    const fetchAllFriends = async (userId) => {
        try {
            const data = await getUserFriends(userId);
            setFriends(data.friends);
            setLoadingFriends(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchAllFriends(userId);
    }, []);


    return (
        <div style={{ marginTop: "1.4rem" }}>
            <MyFriendsContainer>
                {(friends && friends.length !== 0) &&
                    friends.map(friendRes =>
                        <FriendViewElement
                            route='user_friends'
                            refresh={refreshInv}
                            setRefresh={setRefreshInv}
                            myId={user.id}
                            res={friendRes}
                            key={friendRes.id}
                        />)
                }
                {(friends && friends.length === 0) &&
                    <p>{user.name} no friends for now</p>

                }
                {loadingFriends &&
                    <>
                        <FriendViewElementSkeleton />
                        <FriendViewElementSkeleton />
                    </>
                }
            </MyFriendsContainer>
        </div>
    )
}

export default UserFriends