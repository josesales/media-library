import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';
import './styles/main.scss';

const Home = lazy(() => import('./pages/Home'));
const VideoUpload = lazy(() => import('./pages/VideoUpload'));
const Container = lazy(() => import('./components/Container'));

function App() {
	return (
		<div className="App">
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route path="/" element={<Container />}>
						<Route index element={<Home />} />
						<Route path="/videoUpload" element={<VideoUpload />} />
					</Route>
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;
