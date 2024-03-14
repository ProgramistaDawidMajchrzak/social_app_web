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

export const getSentInvitations = async () => {
    try {
        const response = await request.get('/friends/sent-invitations');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getMyFriends = async () => {
    try {
        const response = await request.get('/friends');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllPeople = async () => {
    try {
        const response = await request.get('/user/all');
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

export const addInvitation = async (user_id) => {
    try {
        const response = await request.post(`/friends/add/${user_id}`);
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

