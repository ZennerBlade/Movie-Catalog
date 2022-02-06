import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieData } from '../interfaces/NameSearchResp.interface';
import styles from '../styles/InputBox.module.scss';

interface InputBoxProps {
	onChange: (val: string) => void
	onKeyDown: (val: string) => void
	movieData: MovieData[]
}

const InputBox = ({onChange, onKeyDown, movieData}: InputBoxProps) => {

	const navigate = useNavigate();
	
	const [showDropdown, setShowDropdown] = useState(false);
	const containerRef = useRef<any>(null);

	const handleClick = (id: string) => {
		navigate(id);
	};

	useEffect(() => {
		window.addEventListener('click', handleClickOutside);
		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	});
	
	const handleClickOutside = (event: MouseEvent) => {
		if (containerRef.current && !containerRef.current.contains(event.target)) {
			setShowDropdown(false);
		}
	};

	useEffect(() => {
		if(movieData.length > 0){
			setShowDropdown(true);
		}
	},[movieData]);

	return ( 
		<div ref={containerRef} className={styles.dropdownContainer}>
			<input 
				className={styles.input} 
				type='search' 
				placeholder='Search for a movie or TV show..'
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={(e) => onKeyDown(e.key)}
			/>
			{showDropdown && 
			<div className={styles.dropdownMenu}>
				{movieData.map(({Title, imdbID}) => 
					<div key={imdbID} className={styles.dropdownContent} onClick={() => handleClick(imdbID)}>
						{Title}
					</div>
				)}
			</div>
			}
		</div>
	);
};
 
export default InputBox;