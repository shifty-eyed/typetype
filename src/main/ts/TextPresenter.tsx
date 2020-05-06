import * as React from "react";

interface InternalProps {
	text: string;
	caretIndex: number;
}

export const TextPresenter = (props: InternalProps) => {
	const { text, caretIndex } = props;
	const part1: string = text.substring(0, caretIndex);
	const currentSymbol: string = text.charAt(caretIndex);
	const part2: string = text.substring(caretIndex + 1);
	return (
		<div className="w3-card textPresenter">
			{part1}<b>{currentSymbol}</b>{part2}
		</div>
	);
};