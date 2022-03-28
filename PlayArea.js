module.exports = class PlayArea{
	constructor(x, y, width, height, context){
        // position play area. This is the part of the canvas actually used for gameplay
		this.x = x;  // position of the play area on the canvas along x axis
		this.y = y;  // position of the play area on the canvas along y axis

		this.width = width;
		this.height = height;
		this.context = context;


        // convenience definitions for drawing objects that should be contained within the playable area
        // excluding top and bottom bar;
        this.playable_height = height * 0.9;
        this.playable_top = height * 0.05;
        this.playable_bottom = height * 0.95;
	}
	draw_background(){
        // draws background, top and bottom bar
        //
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
