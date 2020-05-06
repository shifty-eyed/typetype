import * as React from "react";
import * as ReactDOM from 'react-dom';

import { TextPresenter } from './TextPresenter';
import { KeyboardComponent } from './KeyBoard';

interface AppProps {
	text: string;
	caretIndex: number;
}

export class App extends React.Component<AppProps, AppProps> {
	
	constructor(props: AppProps) {
		super(props);
		this.state = props;
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	
	expectedChar():string {
		return this.state.text.charAt(this.state.caretIndex);
	}

	handleKeyPress(e: KeyboardEvent) {
		if (this.expectedChar() === e.key) {
			this.setState({ text: this.state.text, caretIndex: this.state.caretIndex + 1 });
		} else {
			console.log('Wrong Key');
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
	}

	render() {
		return (
			<div className="w3-center">
				<TextPresenter caretIndex={this.state.caretIndex} text={this.props.text} />
				<KeyboardComponent expectedKey={this.expectedChar()} />
			</div>
		);
	}
}

ReactDOM.render(
	<App caretIndex={0} text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"/>,
	document.getElementById('root')
);