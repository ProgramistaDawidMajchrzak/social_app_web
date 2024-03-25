import React, { useState, useEffect } from 'react';
import { getAllPeople } from '../../../../services/friends.service';
import * as S from '../style';
import { FriendViewElement, FriendViewElementSkeleton } from '../my_friends/MyFriends';

function AllPeople({ refreshInv, setRefreshInv }) {

    const [people, setPeople] = useState(null);
    const [loadingPeople, setLoadingPeople] = useState(true);

    const fetchAllPeople = async () => {
        try {
            const data = await getAllPeople();
            console.log(data);
            setPeople(data.people);
            setLoadingPeople(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchAllPeople();
    }, [refreshInv]);


    return (
        <S.MyFriendsContainer>
            {(people && people.length !== 0) &&
                people.map(peopleRes =>
                    <FriendViewElement
                        route='all_people'
                        refresh={refreshInv}
                        myId={null}
                        setRefresh={setRefreshInv}
                        res={peopleRes}
                        key={peopleRes.id}
                    />)
            }
            {(people && people.length === 0) &&
                <p>There are no other users for now</p>

            }
            {loadingPeople &&
                <>
                    <FriendViewElementSkeleton />
                    <FriendViewElementSkeleton />
                </>
            }
        </S.MyFriendsContainer>
    )
}

export default AllPeople;