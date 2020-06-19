import * as React from "react";

interface InternalProps {
	count: number;
}

export const MistakeCount = (props: InternalProps) => {
	
	return (
		<div className="mistake" style={props.count > 0 ? {display:'block'} : {display:'none'}}>
			<span className="mistake">{props.count}</span>
			<img src={"img/mistake.png"}/>
		</div>
	);
};