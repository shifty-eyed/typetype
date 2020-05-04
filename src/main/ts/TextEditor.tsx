import * as React from "react";

interface Props {
	text: string;
	caretIndex: number;
}

export class TextEditor extends React.Component {
	
	text: string;
	caretIndex: number;
	
	constructor(props: Props) {
		super(props);
		this.text = props.text;
		this.caretIndex = props.caretIndex;
	}
	
	render() {
		const part1: string = this.text.substring(0, this.caretIndex);
		const currentSymbol: string = this.text.charAt(this.caretIndex);
		const part2: string = this.text.substring(this.caretIndex+1);
		return <div className="w3-card w3-dark-grey w3-bar">{part1}<b>{currentSymbol}</b>{part2}</div>;
	}
};