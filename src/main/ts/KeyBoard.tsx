import * as React from "react";
import * as CSS from "csstype";

const keysRow1:Array<string> = ["1234567890-=", "!@#$%^&*()_+"];
const keysRow2:Array<string> = ["qwertyuiop[]|", "QWERTYUIOP{}|"];
const keysRow3:Array<string> = ["asdfghjkl;'", "ASDFGHJKL:"];
const keysRow4:Array<string> = ["zxcvbnm,./", "ZXCVBNM<>?"];


interface KeyButtonProps {
	x:number;
	y:number;
	text: string;
	expected: boolean;
	main:boolean;
}

const KeyButton = (props:KeyButtonProps) => {
	let styleClass: string = "keyButton";
	if (props.expected) {
		styleClass += " keyButtonExpected"	
	}
	if (props.main) {
		styleClass += " keyButtonMain"	
	}
	const keyStyle: CSS.Properties = {
		left: props.x + "px",
		top: props.y + "px"
	}
	return (
		<div className={styleClass} style={keyStyle}>
			{props.text}
		</div>
	);
}

interface InternalProps {
	expectedKey: string;
	shift: boolean;
}

function placeRow(x: number, y: number, expectedKey: string, shift: boolean, template:Array<string>):Array<React.ReactElement> {
	const gap: number = 60;
	const mainKeys: string = "asdfjkl;";
	let result = new Array<React.ReactElement>();
	const keyCount = template[0].length;
	for (let i:number=0; i<keyCount; i++) {
		const keyChar = template[shift ? 1 : 0].charAt(i);
		const isMain = mainKeys.includes(template[0].charAt(i));
		const isExpected = expectedKey === template[0].charAt(i) || expectedKey === template[1].charAt(i);
		result.push(<KeyButton x={x} y={y} text={keyChar} main={isMain} expected={isExpected}/>);
		x += gap;
	}
	return result;
}

export const KeyboardComponent = ({expectedKey, shift}: InternalProps) => {
	const gap: number = 60;
	let y = 10;
	return (
		<div className="w3-card keyBoard">
			{placeRow(10, y+=gap, expectedKey, shift, keysRow1)}
			{placeRow(30, y+=gap, expectedKey, shift, keysRow2)}
			{placeRow(50, y+=gap, expectedKey, shift, keysRow3)}
			{placeRow(70, y+=gap, expectedKey, shift, keysRow4)}
		</div>
	);
};