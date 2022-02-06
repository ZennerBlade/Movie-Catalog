import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BlankCatalogPage from './BlankCatalogPage';
import Card from '../../components/Card';
import InputBox from '../../components/InputBox';
import type { MovieData } from '../../interfaces/NameSearchResp.interface';
import { getAllMovies } from '../../services/getAllMovies';
import styles from '../../styles/Catalog.module.scss';
 
const Catalog = () => {
	const [movieData, setMovieData] = useState<MovieData[]>([]);
	const [dropdownData, setDropdownData] = useState<MovieData[]>([]);
	const [isLastPage, setIsLastPage] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const totalMovies = useRef(0);
	const currentPage = useRef(1);
	const scrollRef = useRef<any>();
	const timer = useRef<NodeJS.Timeout>();
	const currentSearch = useRef('');
	const movieToSearch = useRef('');

	const navigate = useNavigate();

	const callGetAllMovies = async (name: string, page: number) => {
		const response = await getAllMovies(name, page);
		if(response.status && response.data){
			totalMovies.current = Number(response.data.count);
			return response.data.movieData;
		} else{
			setErrorMsg(response.message);
			return [];
		}
	};

	// Displays next page of movies and resets scroll. Hides arrow when on last page
	const handleArrowNext = async () => {
		currentPage.current += 1;
		setMovieData(await callGetAllMovies(currentSearch.current, currentPage.current));
		scrollRef.current.scrollLeft = 0;
		if((totalMovies.current / (currentPage.current*10)) < 1){
			setIsLastPage(true);
		}
	};
	
	// Displays previous page of movies
	const handleArrowPrev = async () => {
		currentPage.current -= 1;
		setMovieData(await callGetAllMovies(currentSearch.current, currentPage.current));
	};

	// Displays movies in dropdown. Added debounce to prevent rapid calls
	const handleInputChange = (val: string) => {
		movieToSearch.current = val;
		if(timer.current){
			clearTimeout(timer.current);
		}
		timer.current = setTimeout(async () => {
			if (val) {
				setDropdownData(await callGetAllMovies(val, currentPage.current));
			}
		},500);
	};

	// Searches for movies when user hits enter. 
	const handleEnter = async (key: string) => {
		if(key === 'Enter'){
			if (movieToSearch.current) {
				currentPage.current = 1;
				currentSearch.current = movieToSearch.current;
				const dataToDisplay = await callGetAllMovies(currentSearch.current, currentPage.current);
				if(dataToDisplay.length === 0){
					toast.error(errorMsg); // Errors from OMDB api or network failure
				}
				setMovieData(dataToDisplay);
			}
		}
	};

	return ( 
		<div className={styles.container}>
			<header className={styles.head}>
				<div className={styles.title}>
                    My Watchlist
				</div>
				<p className={styles.subTitle}>
                    Search to add Movies or TV Shows to your WatchList
				</p>
				<InputBox onChange={handleInputChange} onKeyDown={handleEnter} movieData={dropdownData}/>
			</header>
			<section ref={scrollRef} className={`${styles.section} ${movieData.length === 0 ? styles.centerEmptySection : ''}`}>
				{/* Empty area when there are no movies to show */}
				{movieData.length === 0 && <BlankCatalogPage />}

				{/* Previous arrow */}
				{movieData.length > 0 && currentPage.current !== 1 && <button className={styles.arrow} onClick={handleArrowPrev}>{'<'}</button>}
				{movieData?.map(({Poster, Title, imdbID}) => 
					<Card 
						key={imdbID} 
						title={Title} 
						poster={Poster} 
						imdbID={imdbID} 
						onClick={(id) => navigate(id)} 
					/>)}
				{/* Next arrow */}
				{movieData.length > 0 && !isLastPage && <button className={styles.arrow} onClick={handleArrowNext}>{'>'}</button>}
			</section>
		</div>
	);
};
 
export default Catalog;