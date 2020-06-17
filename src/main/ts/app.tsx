import * as React from "react"
import * as ReactDOM from 'react-dom'
import SplitPane from 'react-split-pane'

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
		return this.lessonText().charAt(this.state.caretIndex);
	}
	
	lessonText(): string {
		const result = !this.state.menuItems ? "_" : this.state.menuItems[this.state.currentItem]
		if (!result) {
			console.log(result);	
		}
		return result
	}
	
	nextIncompleteLessonKey(menuItems: {[key:string]:string}, completedItems: Array<string>): string {
		for (const key in menuItems) {
			if (completedItems.indexOf(key) < 0) {
				return key;
			}
		}
		return null;
	}
	
	completeLesson()  {
		fetch("markLessonCompleted?lessonId=" + this.state.currentItem);
		let completedItems: Array<string> = [].concat(this.state.completedItems);
		completedItems.push(this.state.currentItem)
		let selectedKey = this.nextIncompleteLessonKey(this.state.menuItems, completedItems)
		this.setState({ caretIndex:0, completedItems: completedItems, currentItem:selectedKey }) 
	}

	handleKeyPress(e: KeyboardEvent) {
		if (this.isShift != e.shiftKey) {
			this.isShift = e.shiftKey;
			this.forceUpdate();
		}
		if (isKeyInSymbolSet(e.key)) {
			if (this.expectedChar() == e.key) {
				if (this.lessonText().length <= this.state.caretIndex+1) {
					//this.doneSound.play();
					this.completeLesson();
					return;
				}
				this.setState({ caretIndex: this.state.caretIndex + 1 });
				//this.correctSound.play();
			} else {
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
			//.then(res => res.text())
			//.then(txt => console.log(txt));
			.then(res => res.json())
			.then(
				(result:LessonsResult) => {
					let selectedKey = this.nextIncompleteLessonKey(result.data, result.completed)
					this.setState({ menuItems: result.data, completedItems: result.completed, currentItem:selectedKey }) 
					},
				(error:any) => { this.setState({ menuItems: {}, errorMessage: error.message }) }
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
		if (this.state.errorMessage) {
			return <h3 style={{color:"red"}}>{this.state.errorMessage}</h3>
		}
		return (
			<SplitPane split="horizontal" minSize={50} defaultSize={100} allowResize={true}>
				<MenuBar onClick={this.handleMenuClick} items={this.state.menuItems} completedItems={this.state.completedItems} current={this.state.currentItem} />
				<div style={{marginTop:"20px"}}>
					<TextPresenter caretIndex={this.state.caretIndex} text={this.lessonText()} />
					<KeyboardComponent expectedKey={this.expectedChar()} shift={this.isShift} />
				</div>
			</SplitPane>
		);
	}
}

ReactDOM.render(
	<App caretIndex={0}  />,
	document.getElementById('root')
);