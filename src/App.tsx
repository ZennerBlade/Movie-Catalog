import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/Global.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { lazy, Suspense } from 'react';
import NotFound from './components/NotFound';

// Added lazy load to reduce bundle size
const Catalog = lazy(() => import('./pages/catalog/Catalog'));
const Movie = lazy(() => import('./pages/movie/Movie'));

const App = () => {

	return (
		<>
			<ToastContainer />
			<Suspense fallback={<></>}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Catalog/>}/>
						<Route path='/:id' element={<Movie/>}/>
						<Route path='*' element={<NotFound/>}/>
					</Routes>
				</BrowserRouter>
			</Suspense>
		</>
	);
};

export default App;
