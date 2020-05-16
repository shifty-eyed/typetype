import * as React from "react";
import * as CSS from "csstype";

const keysRows: Array<Array<string>> = [ 
	["1234567890-=", "!@#$%^&*()_+"],
	["qwertyuiop[]\\", "QWERTYUIOP{}|"],
	["asdfghjkl;'", "ASDFGHJKL:\""],
	["zxcvbnm,./", "ZXCVBNM<>?"]
];
const leftHandCapitals: string = "!@#$%QWERTASDFGZXCVB";
const rightHandCapitals: string = "^&*()_+YUIOP{}|HJKL:\"NM<>?";
const mainKeys: string = "asdfjkl;";
const fingerMap: Array<Array<string>> = [ 
	["1qaz!QAZ", "a"],
	["2wsx@WSX", "s"],
	["3edc#EDC", "d"],
	["4rfv5tgb$RFV%TGB", "f"],
	["6yhn7ujm^YHN&UJM", "j"],
	["8ik,*IK<", "k"],
	["9ol.(OL>", "l"],
	["0p;/-=[]')P:?\"{}_+|\\", ";"],
];

interface KeyButtonProps {
	x:number;
	y:number;
	text: string;
	expected: boolean;
	main:boolean;
	activeFinger:boolean;
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
	if (props.activeFinger) {
		styleClass += " keyButtonActiveFinger"	
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

export function mapKeyCharToMainFingerKey(key: string): string {
	let result: string = null;
	fingerMap.forEach((tpl) => {
		if (tpl[0].includes(key)) {
			result = tpl[1];
		}
	});
	return result;
}

export function isKeyInSymbolSet(key: string): boolean {
	for (let row of keysRows) {
		if (row[0].includes(key) || row[1].includes(key)) {
			return true;
		}
	}
	return key === " ";
}

function placeRow(x: number, y: number, expectedKey: string, shift: boolean, template:Array<string>):Array<React.ReactElement> {
	const gap: number = 70;
	let result = new Array<React.ReactElement>();
	const keyCount = template[0].length;
	for (let i:number=0; i<keyCount; i++) {
		const keyChar = template[shift ? 1 : 0].charAt(i);
		const isMain = mainKeys.includes(template[0].charAt(i));
		const isActiveFingerKey = template[0].charAt(i) === mapKeyCharToMainFingerKey(expectedKey);
		const isExpected = expectedKey === template[0].charAt(i) || expectedKey === template[1].charAt(i);
		result.push(<KeyButton x={x} y={y} text={keyChar} main={isMain} activeFinger={isActiveFingerKey} expected={isExpected}/>);
		x += gap;
	}
	return result;
}

export const KeyboardComponent = ({expectedKey, shift}: InternalProps) => {
	const gap: number = 70;
	const hOffset: number = 30;
	let y = 10-gap;
	let keys: Array<React.ReactElement> = []; 
	for (let i:number=0; i<keysRows.length; i++) {
		y+=gap;
		keys = keys.concat(placeRow(40+i*(hOffset), y, expectedKey, shift, keysRows[i]));
	}
	keys.push(<KeyButton x={30} y={y} text="Shift" main={false} activeFinger={false} expected={rightHandCapitals.includes(expectedKey)} width={90}/>);
	keys.push(<KeyButton x={830} y={y} text="Shift" main={false} activeFinger={false} expected={leftHandCapitals.includes(expectedKey)} width={110}/>);
	keys.push(<KeyButton x={230} y={y+gap} text="" main={false} activeFinger={false} expected={expectedKey === " "} width={410}/>);
	return (
		<div className="keyBoard">
			{keys}
		</div>
	);
};