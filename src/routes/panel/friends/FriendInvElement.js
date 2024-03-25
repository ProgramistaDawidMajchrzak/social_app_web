import React, { useState } from 'react';
import * as S from './style';
import UserImg from '../../../assets/user-sample.png';
import { format } from 'date-fns';
import { acceptInvitation, cancelInvitationOrFriendship } from '../../../services/friends.service';
import { useDispatch } from 'react-redux';
import { increaseFriendsValue, decreaseFriendsValue } from '../../../features/userSlice';
import { useNavigate } from 'react-router-dom';


function FriendInvElement({ type, refresh, setRefresh, invitation }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [invProcess, setInvProcess] = useState(false);

    const formatDate = (date) => {
        return format(new Date(date), 'EEEE, MMM d, h:mm a');
    };

    const handleInvAction = async (status) => {
        if (!invProcess) {
            setInvProcess(true);
            try {
                if (status === 'accept') {
                    await acceptInvitation(invitation.id);
                    dispatch(increaseFriendsValue());
                } else {
                    await cancelInvitationOrFriendship(invitation.id);
                    if (type === 'receive') {
                        dispatch(decreaseFriendsValue());
                    }
                }
                setInvProcess(false);
                setRefresh(!refresh);
            } catch (error) {
                console.error('Error fetching data:', error.response.data);
            }
        }
    }

    return (
        <S.FriendElStyle>
            <div className="flex">
                <div className="img">
                    <img src={UserImg} alt="user-sample" />
                </div>
                <div className='post-info'>
                    {type === 'receive' ?
                        <h6 style={{ cursor: 'pointer' }} onClick={() => navigate(`/user/${invitation.sender.id}/posts`)}>{invitation.sender.name}</h6>
                        :
                        <h6 style={{ cursor: 'pointer' }} onClick={() => navigate(`/user/${invitation.recipient.id}/posts`)}>{invitation.recipient.name}</h6>
                    }
                    <p>{formatDate(invitation.created_at)}</p>
                </div>
            </div>
            <div className="inv-action">
                {type === 'receive' &&
                    <button className='accept'>
                        <i
                            className='fa-solid fa-check'
                            style={{ color: 'var(--gray)' }}
                            onClick={() => handleInvAction('accept')}
                        ></i>
                    </button>
                }
                <button className='decline'>
                    <i
                        className='fa-solid fa-xmark'
                        style={{ color: 'var(--gray)' }}
                        onClick={() => handleInvAction('decline')}
                    ></i>
                </button>
            </div>
        </S.FriendElStyle>
    )
}

export default FriendInvElement;