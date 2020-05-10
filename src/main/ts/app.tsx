import * as React from "react";
import * as ReactDOM from 'react-dom';

import { TextPresenter } from './TextPresenter';
import { KeyboardComponent } from './KeyBoard';
import { MenuBar } from './MenuBar';

interface AppProps {
	text: string;
	caretIndex: number;
}

export class App extends React.Component<AppProps, AppProps> {
	
	isShift: boolean = false;
	
	constructor(props: AppProps) {
		super(props);
		this.state = props;
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	
	expectedChar():string {
		return this.state.text.charAt(this.state.caretIndex);
	}

	handleKeyPress(e: KeyboardEvent) {
		if (this.isShift != e.shiftKey) {
			this.isShift = e.shiftKey;
			this.forceUpdate();
		}
		if (this.expectedChar() === e.key) {
			this.setState({ text: this.state.text, caretIndex: this.state.caretIndex + 1 });
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
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
		document.removeEventListener('keyup', this.handleKeyPress);
	}

	render() {
		return (
			<div className="w3-border">
				<MenuBar />
				<div className="vSpaceFiller">&nbsp;</div>
				<TextPresenter caretIndex={this.state.caretIndex} text={this.props.text} />
				<KeyboardComponent expectedKey={this.expectedChar()} shift={this.isShift}/>
			</div>
		);
	}
}

ReactDOM.render(
	<App caretIndex={0} text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"/>,
	document.getElementById('root')
);