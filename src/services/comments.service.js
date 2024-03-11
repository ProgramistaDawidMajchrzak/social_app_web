import request from './request';

export const addComment = async (post_id, body) => {
    try {
        const response = await request.post(`/comments/add/${post_id}`, body);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getComments = async (post_id) => {
    try {
        const response = await request.get(`/comments/${post_id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// export const deleteLike = async (post_id) => {
//     try {
//         const response = await request.delete(`/likes/${post_id}`);
//         return response.data;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// };
