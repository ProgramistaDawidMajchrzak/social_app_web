import request from './request';

export const allPosts = async (page) => {
    try {
        const response = await request.get(`/posts?page=${page}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const allPostsByUser = async (user_id, page) => {
    try {
        const response = await request.get(`/posts/by-user/${user_id}?page=${page}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const addPost = async (body) => {
    try {
        const response = await request.post('/posts/add', body);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
