import React, { useState, useEffect } from 'react';
import * as S from './style';
import FriendInvElement from './FriendInvElement';
import { getMyInvitations } from '../../../services/friends.service';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { PrimaryButton } from '../../../components/Form';
import { useNavigate } from 'react-router-dom';

function FriendsInvitations() {
    const navigate = useNavigate();

    const [invitations, setInvitations] = useState(null);
    const [loadingInvitations, setLoadingInvitations] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const fetchAllInvitations = async () => {
        try {
            const data = await getMyInvitations();
            setInvitations(data.invitations);
            setLoadingInvitations(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchAllInvitations();
    }, [refresh]);

    const handleSubmit = e => {
        e.preventDefault();
        navigate('/friends');
    }

    return (
        <S.FriendsSidebar>
            <div className="inv-section">
                <h4>Invitations to friends</h4>
                <div className="inv-scrollbar">
                    {(invitations && invitations.length !== 0) &&
                        invitations.map(inv =>
                            <FriendInvElement
                                refresh={refresh}
                                setRefresh={setRefresh}
                                invitation={inv}
                            />)
                    }
                    {(invitations && invitations.length === 0) &&
                        <form onSubmit={(e) => handleSubmit(e)} className="no-inv-info">
                            <p>You have no invitations to friendship</p>
                            <PrimaryButton
                                value='Find new friends'
                            />
                        </form>
                    }
                    {loadingInvitations &&
                        <>
                            <FriendsInvElSkeleton />
                            <FriendsInvElSkeleton />
                        </>
                    }
                </div>
            </div>
        </S.FriendsSidebar>
    )
}

export default FriendsInvitations;

function FriendsInvElSkeleton() {
    return (
        <S.FriendElStyle>
            <div className="flex">
                <Skeleton
                    baseColor='#d2d1d1'
                    highlightColor='#aeaeae'
                    className='img'
                />
                <Skeleton
                    baseColor='#d2d1d1'
                    highlightColor='#aeaeae'
                    className='skeleton-author'
                    count={2} />
            </div>
        </S.FriendElStyle >
    )
};