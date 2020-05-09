import * as React from "react";
import * as CSS from "csstype";

const keysRows: Array<Array<string>> = [ 
	["1234567890-=", "!@#$%^&*()_+"],
	["qwertyuiop[]\\", "QWERTYUIOP{}|"],
	["asdfghjkl;'", "ASDFGHJKL:"],
	["zxcvbnm,./", "ZXCVBNM<>?"]
];


interface KeyButtonProps {
	x:number;
	y:number;
	text: string;
	expected: boolean;
	main:boolean;
	width?:number;
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
	if (props.width) {
		keyStyle["width"] = props.width+"px";
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
	const gap: number = 70;
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
	const gap: number = 70;
	let shiftRequired = false;
	for (let i:number=0; i<keysRows.length; i++) {
		if (keysRows[i][0].includes(expectedKey)) {
			shiftRequired = false;
			break;
		}
		if (keysRows[i][1].includes(expectedKey)) {
			shiftRequired = true;
			break;
		}
	}
		
	let y = 10;
	return (
		<div className="w3-card keyBoard">
			{placeRow(10, y+=gap, expectedKey, shift, keysRows[0])}
			{placeRow(40, y+=gap, expectedKey, shift, keysRows[1])}
			{placeRow(70, y+=gap, expectedKey, shift, keysRows[2])}
			{placeRow(100, y+=gap, expectedKey, shift, keysRows[3])}
			<KeyButton x={0} y={y} text="Shift" main={false} expected={shiftRequired} width={90}/>
			<KeyButton x={800} y={y} text="Shift" main={false} expected={shiftRequired} width={110}/>
		</div>
	);
};