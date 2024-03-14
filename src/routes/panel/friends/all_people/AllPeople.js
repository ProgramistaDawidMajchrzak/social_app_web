import React, { useState, useEffect } from 'react';
import { getAllPeople } from '../../../../services/friends.service';
import * as S from '../style';
import { FriendViewElement, FriendViewElementSkeleton } from '../my_friends/MyFriends';

function AllPeople() {

    const [people, setPeople] = useState(null);
    const [loadingPeople, setLoadingPeople] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const fetchAllPeople = async () => {
        try {
            const data = await getAllPeople();
            console.log('data.people');
            console.log(data.people);
            setPeople(data.people);
            setLoadingPeople(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchAllPeople();
    }, [refresh]);


    return (
        <S.MyFriendsContainer>
            {(people && people.length !== 0) &&
                people.map(peopleRes =>
                    <FriendViewElement
                        route='all_people'
                        refresh={refresh}
                        myId={null}
                        setRefresh={setRefresh}
                        res={peopleRes}
                        key={peopleRes.id}
                    />)
            }
            {(people && people.length === 0) &&
                <p>YThere are no other users for now</p>

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