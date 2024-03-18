import axios from 'axios';

const request = axios.create({
    baseURL: 'http://192.168.1.9/api',
});


request.interceptors.request.use((req) => {
    if (localStorage.getItem('accessToken')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
        // req.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MDkxMjE0NTgsIm5iZiI6MTcwOTEyMTQ1OCwianRpIjoiSDY5eVJiSG05eThqZHFVVCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.nkbvIxVEhVrlkya1ifPW3lhL0-Gbr2k9AlI_z1VY3DU`;
    }
    return req;
});

export default request;