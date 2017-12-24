import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://api.dreamersky.com',
    baseURL: 'http://localhost:8001',
    withCredentials: true,
    timeout: 5000
});

// let loadingInstancce;

// instance.interceptors.request.use((require) => {
//   loadingInstancce = Loading.service({
//     fullscreen: true,
//     text: '拼命加载中'
//   });
//   return require;
// });

instance.interceptors.response.use((response) => {
    const { data } = response;
    return data;
}, (error) => {
    return error;
});

export default instance;
