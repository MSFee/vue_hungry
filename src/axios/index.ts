import axios from 'axios';

let instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: {'Content-Type': 'application/x-www-form-urlencoded;'}
});

instance.interceptors.request.use(config => {
    if (config.method === 'post') {
        config.data = JSON.parse(JSON.stringify(config.data));
    }
    // if (config.method === 'get') {
    //     const data = config.data;
    //     const url = config.url;
    //     return config;
    // }
    return config; 
},error => {
    return Promise.reject(error);
});

instance.interceptors.response.use( res => {
    if (res.status !== 200) {
        return Promise.reject(res);
    }
    return res.data;
},error => {
    return Promise.reject(error);
});

// class http {
//     static async get(url, params) { //封装get方法
//         return await instance.get(url, { params })
//     }

//     static async post(url, rawData) { // 封装post方法
//         return await instance.post(url, rawData)
//     }
// }
export default instance;