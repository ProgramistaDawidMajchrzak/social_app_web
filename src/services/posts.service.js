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

export const addPost = async (body) => {
    try {
        const response = await request.post('/auth/login', body);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
