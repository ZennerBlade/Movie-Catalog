import { MovieSearchResp } from '../interfaces/MovieSeachResp.interface';
import { MovieDataResponse } from '../interfaces/Response.interface';
import { axiosInstance } from '../utils/axiosInstance';

export const getMovieDetails = async (id: string): Promise<MovieDataResponse> => {
	try {
		const response: MovieSearchResp = await axiosInstance.request({
			method: 'GET',
			url: '/',
			params: { i: id}
		});
		return {
			status: true,
			message: 'Found',
			data: response
		};
	} catch {
		return {
			status: false,
			message: 'API/Network failure'
		};
	}
};