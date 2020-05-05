import * as React from "react";
import * as ReactDOM from 'react-dom';

import { TextPresenter } from './TextPresenter';
import { KeyboardComponent } from './KeyBoard';

function App() {
	return (
		<div className="w3-center">
			<TextPresenter caretIndex={4} text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
			<KeyboardComponent/>
		</div>
	);
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);