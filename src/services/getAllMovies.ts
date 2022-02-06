import type { NameSearchResponse } from '../interfaces/NameSearchResp.interface';
import type { AllMovieResponse } from '../interfaces/Response.interface';
import { axiosInstance } from '../utils/axiosInstance';


export const getAllMovies = async (name: string, page: number): Promise<AllMovieResponse> => {
	try{
		const response: NameSearchResponse = await axiosInstance.request({
			method: 'GET',
			url: '/',
			params: {s: name, page}
		});

		if(response.Error){
			return {
				status: false,
				message: response.Error
			};
		}

		const movieData = [];
		for(const {Title, Poster, imdbID} of response.Search){
			movieData.push({
				Title,
				Poster,
				imdbID
			});
		}
		return {
			status: true,
			message: 'Found data',
			data: { movieData, count: response.totalResults }
		};
	} catch {
		return {
			status: false,
			message: 'API/Network failure'
		};
	}
	
	
};