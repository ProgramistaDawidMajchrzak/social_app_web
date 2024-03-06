import request from './request';

export const fetchData = async () => {
    try {
        const response = await request.get('/posts');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const login = async (body) => {
    try {
        const response = await request.post('/auth/login', body);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};
export const register = async (body) => {
    try {
        const response = await request.post('/auth/register', body);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};
export const logout = async () => {
    try {
        const response = await request.post('/auth/register');
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};