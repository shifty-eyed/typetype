import * as React from "react";

interface InternalProps {
	items?: Array<string>;
	onClick:Function;
}

export const MenuBar = (props:InternalProps) => {
	let menuButtons: Array<React.ReactElement> = []; 
	for (const key in props.items) {
		menuButtons.push(<button className="menuButton" onClick={(e)=>{props.onClick(props.items[key]);e.currentTarget.blur()}}>{key}</button>)
	}
	return (
		<div className="menuBox">
			{menuButtons}
		</div>
	);
};