import * as React from "react";

interface InternalProps {
	expectedKey: string;
}

export const KeyboardComponent = ({expectedKey}: InternalProps) => {
	return (
		<div className="w3-card keyBoard">
			{expectedKey}
		</div>
	);
};