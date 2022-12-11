// inceptors request
import axios from 'axios';

import { api_url } from './config';



// Add a request interceptor
axios.interceptors.request.use(
	(config) => {
		const token = JSON.parse(localStorage.getItem('userInfo'))?.accessToken;
		if (token) {
			config.headers['Authorization'] = 'Bearer ' + token;
		}
		config.headers['Content-Type'] = 'application/json';
		// console.log("config: ", config)
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);
// inceptors response
axios.interceptors.response.use(
	(response) => {
		return response;
	},
	function (error) {
		const originalRequest = error.config;
		if(!JSON.parse(localStorage.getItem('userInfo'))?.accessToken){
			window.location.replace('/login');
		}else if (error.response?.data?.code == '141901' && originalRequest.url === `${api_url}/auth/refresh-token` ) {
			localStorage.removeItem('userInfo')
			window.location.replace('/login');
			return Promise.reject(error);
		}else if(error.response?.data?.code == '141902' && originalRequest.url === `${api_url}/auth/refresh-token` ){
			localStorage.removeItem('userInfo')
			window.location.replace('/login');
			return Promise.reject(error);
    }else if (error.response?.data?.code === '141901' && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = JSON.parse(localStorage.getItem('userInfo')).refreshToken;
			return axios
				.post(`${api_url}/auth/refresh-token`, {
					token: refreshToken,
				})
				.then((res) => {
					if (res.status === 200) {
						localStorage.setItem('userInfo', JSON.stringify(res.data));
						originalRequest.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.accessToken}`;
						axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.accessToken}`;
						return axios(originalRequest);
					}
				});
		}
		console.log('error.response: ', error.response);
		if(error.response.status === 404){
			// console.log("not found")
			// window.location.replace('/404')
		}
		if (error.res?.data?.code === '3034771') {
			console.log('kkkkkkkkkkkkkkk');
		}
		return error.response;
	}
);
