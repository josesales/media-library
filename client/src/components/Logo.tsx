import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
	const navigate = useNavigate();

	return (
		<div
			className="logo"
			title="Home"
			onClick={() => {
				navigate('/');
			}}
		>
			<img src={logo} alt="Media Library Logo" className="logo__img" />
			<h1 className="logo__name">Media Library</h1>
		</div>
	);
};
export default Logo;
