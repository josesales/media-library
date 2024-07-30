type Props = {
	name: string;
	inputText: string;
	navigation?: boolean;
	clickHandler: () => void;
};

const Button = ({ name, clickHandler, inputText, navigation }: Props) => (
	<button
		name={inputText}
		type="button"
		onClick={clickHandler}
		className={navigation ? 'navigation-button' : 'button'}
	>
		{name}
	</button>
);

export default Button;
