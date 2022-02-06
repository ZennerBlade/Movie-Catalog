import { MovieSearchResp } from './MovieSeachResp.interface';
import type { MovieData } from './NameSearchResp.interface';

export interface AllMovieResponse {
    status: boolean
    message: string
    data?: DataToReturn
}

interface DataToReturn {
    movieData: MovieData[]
    count: string
}

export interface MovieDataResponse {
    status: boolean
    message: string
    data?: MovieSearchResp
}