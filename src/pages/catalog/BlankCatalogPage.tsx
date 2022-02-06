import styles from '../../styles/EmptySection.module.scss';
 
const BlankMoviePage = () => {
	return ( 
		<div className={styles.container}>
			<h2>No Results</h2>
			<h3>Type movie to search and hit enter or select from dropdown</h3>
		</div>
	);
};
 
export default BlankMoviePage;