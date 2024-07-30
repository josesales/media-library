import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import htmlEntities from '../utils/htmlEntities';
import Button from './Button';

const Navigation = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="navigation">
				<Logo />
				<div className="navigation__button-container">
					<Button
						inputText="Upload Navigation"
						name={`${htmlEntities.add} Upload`}
						navigation
						clickHandler={() => {
							navigate('/videoUpload');
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default Navigation;
