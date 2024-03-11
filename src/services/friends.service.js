import request from './request';

export const getMyInvitations = async () => {
    try {
        const response = await request.get('/friends/invitations');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const acceptInvitation = async (inv_id) => {
    try {
        const response = await request.post(`/friends/${inv_id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const cancelInvitationOrFriendship = async (inv_id) => {
    try {
        const response = await request.delete(`/friends/${inv_id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

