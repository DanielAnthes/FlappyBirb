module.exports = class Obstacle{
	constructor(xpos, ypos, gap_width, play_area_top, play_area_bottom){
		this.xpos = xpos;
		this.ypos = ypos;
		this.width = 25;
		this.gap_width = gap_width;
		this.play_area_top = play_area_top;
		this.play_area_bottom = play_area_bottom;
	}

	draw_obstacle(context){
		context.fillStyle = '#000000';
		context.beginPath();
		context.fillRect(this.xpos, this.play_area_top, this.width, this.play_area_top + this.ypos);
		context.closePath();

		// compute coordinates for bottom part of obstacle
		let ytop = this.play_area_top + this.ypos + this.gap_width;
		let height = this.play_area_bottom - ytop;

		context.beginPath();
		context.fillRect(this.xpos, ytop, this.width, height);
		context.closePath();
	}

	move_obstacle(distance){
		this.xpos -= distance;
	}

	check_collision(birb){
		// check x coordinate collision
		let birb_left = birb.x;
		let birb_right = birb.x + birb.width;

		let birb_top = birb.y;
		let birb_bottom = birb.y + birb.height;

		let obs_left = this.x;
		let obs_right = this.x + this.width;

		// check whether x coordinates match
		if((birb_left >= obs_left && birb_left <= obs_right) || (birb_right >= obs_left && birb_right <= obs_right)){
			// check collision with top bar
			let bar_top = this.play_area_top;
			let bar_bottom = this.play_area_top + this.ypos;
			
			let collision = false;
			// check collision with bottom bar
		}
	}
}

