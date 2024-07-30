import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Container = () => {
	return (
		<>
			<Header />

			<div className="container-body">
				<Outlet />
			</div>

			<Footer />
		</>
	);
};

export default Container;
