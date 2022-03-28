module.exports = class Birb{
	constructor(width, height, x, y, speed, accel){
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.accel = accel;
	}
	// birb dynamics
	compute_birb_movement(gravity, impulse, pressed){
		this.accel += gravity;
		if(pressed)
			this.accel -= impulse;
		this.y += this.accel;
	}

	// birb response to impulse
	birb_flap(impulse){
		this.accel -= impulse;
	}

	// draw birb
	draw_birb(context, play_area){
		context.beginPath();
		context.rect(this.x, this.y + play_area.y, this.height, this.width);
		context.fillStyle = "#cfc848";
		context.fill();
		context.closePath();
	}
}
