import { useState } from 'react';
import styles from '../styles/Card.module.scss';
 
interface CardProps {
    poster: string 
    title: string
    imdbID: string
	onClick: (val: string) => void
}

const Card = ({poster, title, imdbID, onClick}: CardProps) => {

	const [showTitle, setShowTitle] = useState(false);

	return ( 
		<div className={styles.cardConatiner} onClick={() => onClick(imdbID)}>
			<img 
				className={styles.cardImage} 
				src={poster} 
				onMouseEnter={() => setShowTitle(true)}
				onMouseLeave={() => setShowTitle(false)}
			/>
			{showTitle && 
			<div className={styles.movieTitle} style={{color: poster === 'N/A'? 'black' : 'white'}}>{title}</div>
			}
		</div>
	);
};
 
export default Card;