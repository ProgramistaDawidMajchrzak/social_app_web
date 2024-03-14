import React, { useState, useEffect } from 'react';
import * as S from './style';
import FriendInvElement from './FriendInvElement';
import { getMyInvitations, getSentInvitations } from '../../../services/friends.service';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { PrimaryButton } from '../../../components/Form';
import { useNavigate } from 'react-router-dom';

function FriendsInvitations({ type, refreshInv, setRefreshInv }) {
    const navigate = useNavigate();

    const [invitations, setInvitations] = useState(null);
    const [loadingInvitations, setLoadingInvitations] = useState(true);

    const fetchAllInvitations = async () => {
        try {
            let data = {};
            if (type === 'receive') {
                data = await getMyInvitations();
            } else {
                data = await getSentInvitations();
            }
            setInvitations(data.invitations);
            setLoadingInvitations(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchAllInvitations();
    }, [refreshInv]);

    const handleSubmit = e => {
        e.preventDefault();
        navigate('/all-people');
    }

    return (
        <S.FriendsSidebar>
            <div className="inv-section">
                {type === 'receive' ?
                    <h4>Invitations to friends</h4>
                    :
                    <h4>Invitations sent</h4>
                }
                <div className="inv-scrollbar">
                    {(invitations && invitations.length !== 0) &&
                        invitations.map(inv =>
                            <FriendInvElement
                                type={type}
                                refresh={refreshInv}
                                setRefresh={setRefreshInv}
                                invitation={inv}
                                key={inv.id}
                            />)
                    }
                    {(invitations && invitations.length === 0) &&
                        <form onSubmit={(e) => handleSubmit(e)} className="no-inv-info">
                            {type === 'receive' ?
                                <p>You have no invitations to friendship</p>
                                :
                                <p>You have no invitations sent</p>
                            }
                            {type === 'receive' &&
                                <PrimaryButton
                                    value='Find new friends'
                                />
                            }
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