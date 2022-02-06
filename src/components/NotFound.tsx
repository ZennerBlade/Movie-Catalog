import { useNavigate } from 'react-router-dom';
import styles from '../styles/NotFound.module.scss';

const NotFound = () => {
	const navigate = useNavigate();
	return ( 
		<main className={styles.container}>
			<h1>Oops...</h1>
			<h3>This route does not exist</h3>
			<button onClick={() => navigate('/')}>Go back to home</button>
		</main>
	);
};
 
export default NotFound;