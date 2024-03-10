import request from './request';

export const addLike = async (post_id) => {
    try {
        const response = await request.post(`/likes/add/${post_id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteLike = async (post_id) => {
    try {
        const response = await request.delete(`/likes/${post_id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
