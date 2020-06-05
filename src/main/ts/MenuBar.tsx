import * as React from "react";

interface InternalProps {
	items?: {[key:string]:string};
	completedItems?: Array<string>;
	current: string;
	onClick:Function;
}

export const MenuBar = (props:InternalProps) => {
	let menuButtons: Array<React.ReactElement> = []; 
	if (props.completedItems && props.items) {
		for (const key in props.items) {
			const isCompleted = props.completedItems.length > 0 && props.completedItems.indexOf(key) >= 0;
			
			menuButtons.push(<button 
				className={"menuButton" + (key === props.current ? " menuButtonCurrent" : "")} 
				disabled={!isCompleted && key !== props.current} 
				onClick={(e)=>{props.onClick(props.items[key]);e.currentTarget.blur()}}>
				{key}</button>)
		}
	}
	return (
		<div className="menuBox">
			{menuButtons}
		</div>
	);
};