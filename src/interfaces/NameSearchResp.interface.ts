export interface NameSearchResponse {
    Search: MovieData[];
    totalResults: string;
    Response: string;
    Error?: string;
  }
  
export interface MovieData {
    Title: string;
    Year?: string;
    imdbID: string;
    Type?: string;
    Poster: string;
  }