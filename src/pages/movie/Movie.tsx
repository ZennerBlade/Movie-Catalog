import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMovieDetails } from '../../services/getMovieDetails';
import styles from '../../styles/Movie.module.scss';

const Movie = () => {
	const {id} = useParams();
	const navigate = useNavigate();

	const [movieData, setMovieData] = useState({
		title: '',
		poster: '',
		plot: '',
		director: '',
		rating: ''
	});

	const callMovieDetails = async () => {
		if(id) {
			const response = await getMovieDetails(id);
			if(response.status && response.data){
				setMovieData({
					title: response.data.Title,
					poster: response.data.Poster,
					plot: response.data.Plot,
					director: response.data.Director,
					rating: response.data.imdbRating
				});
			} else{
				toast.error(response.message);
			}
		}
	};
	
	useEffect(() => {
		callMovieDetails();
	},[id]);

	return ( 
		<>
			{movieData.title && 
				<main className={styles.container}>
					<header className={styles.header}>
						<span className={styles.arrow} onClick={() => navigate('/')}>{'<'}</span>
						<h1>{movieData.title}</h1>
					</header>
					<section className={styles.section}>
						<img className={styles.image} src={movieData.poster} />
						<div className={styles.content}>
							<h2>Plot</h2>
							<p>{movieData.plot}</p>
							<h2>Director</h2>
							<p>{movieData.director}</p>
							<h2>IMDB Rating</h2>
							<p>{movieData.rating}</p>
						</div>
					</section>
				</main>}
		</>
	);
};
 
export default Movie;