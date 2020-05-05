import * as React from "react";

interface InternalProps {
	text: string;
	caretIndex: number;
}

export class TextPresenter extends React.Component<InternalProps, object> {
	constructor(props:InternalProps) {
		super(props);
	}
	
	render() {
		const {text, caretIndex} = this.props;
		const part1: string =text.substring(0, caretIndex);
		const currentSymbol: string = text.charAt(caretIndex);
		const part2: string = text.substring(caretIndex+1);
		return <div className="w3-card w3-dark-grey w3-bar">{part1}<b>{currentSymbol}</b>{part2}</div>;
	}
};