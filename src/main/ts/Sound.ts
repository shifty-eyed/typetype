export class Sound {
	private handler: HTMLAudioElement;
	
	constructor(src: string) {
		this.handler = document.createElement("audio");
		this.handler.src = src;
		this.handler.setAttribute("preload", "auto");
		this.handler.setAttribute("controls", "none");
		this.handler.style.display = "none";
		document.body.appendChild(this.handler);
	}
	
	play() {
		console.log(`playing ${this.handler.src}`);
		this.handler.play();
	}
	
	pause() {
		this.handler.pause();
	}
}