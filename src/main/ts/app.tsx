import * as React from "react";
import * as ReactDOM from 'react-dom';

import { TextPresenter } from './TextPresenter';
import { KeyboardComponent, mapKeyCharToMainFingerKey, isKeyInSymbolSet } from './KeyBoard';
import { MenuBar } from './MenuBar';

interface AppProps {
	text: string;
	caretIndex: number;
	menuItems?: [];
	errorMessage?: String;
}

class Sound {
	private handler: HTMLAudioElement;
	constructor(src: string) {
		this.handler = document.createElement("audio");
		this.handler.src = src;
		this.handler.setAttribute("preload", "auto");
		this.handler.setAttribute("controls", "none");
		this.handler.style.display = "none";
		document.body.appendChild(this.handler);
	}
	
	play() {
		this.handler.play();
	}
	
	pause() {
		this.handler.pause();
	}
}

export class App extends React.Component<AppProps, AppProps> {

	isShift: boolean = false;
	wrongSound: Sound;
	//correctSound: Sound;

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
		if (isKeyInSymbolSet(e.key)) {
			if (this.expectedChar() == e.key) {
				this.setState({ /*text: this.state.text, */caretIndex: this.state.caretIndex + 1 });
				//this.correctSound.play();
				console.log("Correct")
			} else {
				console.log("Wrong!")
				this.wrongSound.play();
			}
			setTimeout(this.sendSignal.bind(this), 300);
		}
	}

	handleKeyUp(e: KeyboardEvent) {
		if (this.isShift != e.shiftKey) {
			this.isShift = e.shiftKey;
			this.forceUpdate();
		}
	}

	sendSignal() {
		if (this.expectedChar() === " ") {
			return;
		}
		console.log("signal:" + mapKeyCharToMainFingerKey(this.expectedChar()));
		fetch("fingerSignal?key=" + mapKeyCharToMainFingerKey(this.expectedChar()));
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
		setTimeout(this.sendSignal.bind(this), 300);
		//this.correctSound = new Sound("audio/ding.wav");
		this.wrongSound = new Sound("audio/wrong.wav");
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
		document.removeEventListener('keyup', this.handleKeyPress);
	}


	handleMenuClick(text: string) {
		this.setState({ text: text, caretIndex: 0 });
		setTimeout(this.sendSignal.bind(this), 300);
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