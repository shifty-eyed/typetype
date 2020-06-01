import * as React from "react";
import * as ReactDOM from 'react-dom';

import { TextPresenter } from './TextPresenter';
import { KeyboardComponent, mapKeyCharToMainFingerKey, isKeyInSymbolSet } from './KeyBoard';
import { MenuBar } from './MenuBar';
import { Sound } from './Sound';

interface AppProps {
	//text: string;
	caretIndex: number;
	menuItems?: {[key:string]:string};
	completedItems?: Array<string>;
	currentItem?: string;
	errorMessage?: string;
}

interface LessonsResult {
	data: {[key:string]:string};
	completed: Array<string>;
}

export class App extends React.Component<AppProps, AppProps> {

	isShift: boolean = false;
	wrongSound: Sound;
	//correctSound: Sound;

	constructor(props: AppProps) {
		super(props);
		this.state = props;
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleMenuClick = this.handleMenuClick.bind(this);
	}

	expectedChar(): string {
		return this.state.menuItems[this.state.currentItem].charAt(this.state.caretIndex);
	}

	handleKeyPress(e: KeyboardEvent) {
		if (this.isShift != e.shiftKey) {
			this.isShift = e.shiftKey;
			this.forceUpdate();
		}
		if (isKeyInSymbolSet(e.key)) {
			if (this.expectedChar() == e.key) {
				console.log(`Correct: exp=${this.expectedChar()}, ke=${e.key}`)
				this.setState({ caretIndex: this.state.caretIndex + 1 });
				//this.correctSound.play();
			} else {
				console.log(`wrong: exp=${this.expectedChar()}, ke=${e.key}`)
				this.wrongSound.play();
			}
			this.sendSignal();
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
		document.addEventListener('keyup', this.handleKeyUp);

		fetch("getLessons")
			.then(res => res.json())
			.then(
				(result:LessonsResult) => {
					let selectedKey = result.completed.length == 0 ? Object.keys(result.data)[0] : result.completed[result.completed.length-1];
					this.setState({ menuItems: result.data, completedItems: result.completed, currentItem:selectedKey }) 
					},
				(error) => { this.setState({ menuItems: {}, errorMessage: error }) }
			)
		this.sendSignal();
		//this.correctSound = new Sound("audio/ding.wav");
		this.wrongSound = new Sound("audio/wrong.wav");
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
		document.removeEventListener('keyup', this.handleKeyUp);
	}


	handleMenuClick(itemKey: string) {
		this.setState({ caretIndex: 0, currentItem:itemKey });
		this.sendSignal();
	}

	render() {
		return (
			<div className="w3-border">
				<MenuBar onClick={this.handleMenuClick} items={this.state.menuItems} current={this.state.currentItem} />
				<TextPresenter caretIndex={this.state.caretIndex} text={this.state.menuItems[this.state.currentItem]} />
				<KeyboardComponent expectedKey={this.expectedChar()} shift={this.isShift} />
			</div>
		);
	}
}

ReactDOM.render(
	<App caretIndex={0}  />,
	document.getElementById('root')
);