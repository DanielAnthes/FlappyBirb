module.exports = class PlayArea{
	constructor(x, y, width, height, context){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.context = context;
	}
	draw_background(){
		this.context.fillStyle = "#000000";
		// draw top bar
		this.context.beginPath();
		this.context.fillRect(0, 0, width, 0.05*height);
		this.context.closePath();

		// draw bottom bar
		this.context.beginPath();
		this.context.fillRect(0, height - 0.05*height, width, 0.05*height);
		this.context.closePath();
	}
	// clear play area
	clear(){
		context.clearRect(this.x, this.y, this.width, this.height)
	}
}