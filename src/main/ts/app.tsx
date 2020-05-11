import * as React from "react";
import * as ReactDOM from 'react-dom';

import { TextPresenter } from './TextPresenter';
import { KeyboardComponent, mapKeyCharToMainFingerKey } from './KeyBoard';
import { MenuBar } from './MenuBar';

interface AppProps {
	text: string;
	caretIndex: number;
	menuItems?: [];
	errorMessage?: String;
}

export class App extends React.Component<AppProps, AppProps> {

	isShift: boolean = false;
	timerId: number;

	constructor(props: AppProps) {
		super(props);
		this.state = props;
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleMenuClick = this.handleMenuClick.bind(this);
	}

	expectedChar(): string {
		return this.state.text.charAt(this.state.caretIndex);
	}

	handleKeyPress(e: KeyboardEvent) {
		if (this.isShift != e.shiftKey) {
			this.isShift = e.shiftKey;
			this.forceUpdate();
		}
		if (this.expectedChar() === e.key) {
			this.setState({ /*text: this.state.text, */caretIndex: this.state.caretIndex + 1 });
		} else {
			//console.log('Wrong Key');
		}
	}

	handleKeyUp(e: KeyboardEvent) {
		if (this.isShift != e.shiftKey) {
			this.isShift = e.shiftKey;
			this.forceUpdate();
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);
		document.addEventListener('keyup', this.handleKeyPress);

		fetch("getLessons")
			.then(res => res.json())
			.then(
				(result) => { this.setState({ menuItems: result }) },
				(error) => { this.setState({ menuItems: [], errorMessage: error }) }
			)
		this.timerId = setInterval(this.sendSignal.bind(this), 3000);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
		document.removeEventListener('keyup', this.handleKeyPress);
		clearInterval(this.timerId);
	}
	
	sendSignal() {
		fetch("fingerSignal?key="+mapKeyCharToMainFingerKey(this.expectedChar()));
	}

	handleMenuClick(text: string) {
		this.setState({ text: text, caretIndex: 0 });
	}

	render() {
		return (
			<div className="w3-border">
				<MenuBar onClick={this.handleMenuClick} items={this.state.menuItems} />
				<div className="vSpaceFiller">&nbsp;</div>
				<TextPresenter caretIndex={this.state.caretIndex} text={this.state.text} />
				<KeyboardComponent expectedKey={this.expectedChar()} shift={this.isShift} />
			</div>
		);
	}
}

ReactDOM.render(
	<App caretIndex={0} text="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />,
	document.getElementById('root')
);