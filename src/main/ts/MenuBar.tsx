import * as React from "react";

interface InternalProps {
	items?: Array<string>;
	onClick:Function;
}

export const MenuBar = (props:InternalProps) => {
	let menuButtons: Array<React.ReactElement> = []; 
	for (const key in props.items) {
		menuButtons.push(<button className="w3-button" onClick={(e)=>{props.onClick(props.items[key]);e.currentTarget.blur()}}>{key}</button>)
	}
	return (
		<div className="w3-bar w3-black">
			{menuButtons}
		</div>
	);
};