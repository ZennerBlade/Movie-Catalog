import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: 'http://www.omdbapi.com',
	timeout: 30000
});


axiosInstance.interceptors.request.use(config => {
	// Appended apikey with all requests and searched only for movies
	config.params = {...config.params, apikey: 'bd2f1e56', type: 'movie'};
	return config;
});

axiosInstance.interceptors.response.use(({data}) => data);