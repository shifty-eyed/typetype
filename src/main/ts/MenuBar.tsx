import * as React from "react";

interface InternalProps {
	items?: {[key:string]:string};
	completed?: Array<string>;
	current: string;
	onClick:Function;
}

export const MenuBar = (props:InternalProps) => {
	let menuButtons: Array<React.ReactElement> = []; 
	for (const key in props.items) {
		const isCompleted = props.completed.indexOf(key) >= 0;
		
		menuButtons.push(<button 
			className={"menuButton" + key === props.current ? " current" : ""} 
			disabled={!isCompleted} 
			onClick={(e)=>{props.onClick(props.items[key]);e.currentTarget.blur()}}>
			{key}</button>)
	}
	return (
		<div className="menuBox">
			{menuButtons}
		</div>
	);
};