// setup
class Obstacle{
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

			// check collision with bottom bar
		}
	}
}

class Birb{
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
	draw_birb(game_state){
		let context = game_state.context;
		let play_area = game_state.play_area;
		context.beginPath();
		context.rect(this.x, this.y + play_area.y, this.height, this.width);
		context.fillStyle = "#FF0000";
		context.fill();
		context.closePath();
	}
}

class PlayArea{
	constructor(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	draw_background(){
		ctx.fillStyle = "#000000";
		// draw top bar
		ctx.beginPath();
		ctx.fillRect(0, 0, width, 0.05*height);
		ctx.closePath();

		// draw bottom bar
		ctx.beginPath();
		ctx.fillRect(0, height - 0.05*height, width, 0.05*height);
		ctx.closePath();
	}
	// clear play area
	clear(context, play_area){
		context.clearRect(play_area.x, play_area.y, play_area.width, play_area.height)
	}

}

// set up control
document.addEventListener('keydown', function(){birb.birb_flap(game_state.impulse)});

// set up game state and canvas
var canvas = document.getElementById("myCanvas"); // canvas object
var ctx = canvas.getContext("2d"); // context, used to draw to canvas

var width = canvas.width;
var height = canvas.height;

var play_area = new PlayArea(0, height*0.05, width, height - height*0.1);
var birb = new Birb(25, 25, 5, 100, 10, 0);
var game_state = {play_area:play_area, 
					birb:birb,
					obstacles:initialize_obstacles(5, 150, play_area),
					context:ctx,
					gravity:1,
					impulse:15,
					obstacle_speed:5};

function initialize_obstacles(num_obstacles, distance, play_area){
	let obstacles = new Array()
	xpos = 2 * width;
	for(let i = 0; i < num_obstacles; i++){
		let width = 200;  // TODO randomize
		let ypos = play_area.y + Math.random() * (play_area.width - width);
		obs = new Obstacle(xpos, ypos, width, play_area.y, play_area.y + play_area.width)
		xpos += distance
		obstacles.push(obs)
	}
	return obstacles
}

function check_collision(game_state){
	// check collision with bounds
	let collision = false;
	let birb = game_state.birb;
	let play_area = game_state.play_area;
	if(birb.y <= 0)
		collision = true;
	else if(birb.y >= play_area.height + birb.height)
		collision = true;

	// check for collision with obstacles
	for(i in game_state.obstacles){
		if(game_state.obstacles[i].check_collision(game_state.birb))
			collision = true;
	}
	return collision
}

function update_obstacles(game_state){
	console.log(game_state.obstacles.length)
	for(i in game_state.obstacles){
		obs = game_state.obstacles[i];
		if(obs.xpos + obs.width < 0){
			// obstacle out of view should be removed
			game_state.obstacles.splice(i,1)
			// refill array with new obstacle
			let xpos = game_state.obstacles[game_state.obstacles.length - 1].xpos + 150;  // TODO maybe randomize slightly
			let width = 200;  // TODO randomize
			let ypos = game_state.play_area.y + Math.random() * (game_state.play_area.width - width);
			let obs = new Obstacle(xpos, ypos, width, game_state.play_area.y, game_state.play_area.y + game_state.play_area.width)
			game_state.obstacles.push(obs)
		}
		game_state.obstacles[i].move_obstacle(game_state.obstacle_speed);
	}
}

function draw_obstacles(game_state){
	for(i in game_state.obstacles){
		game_state.obstacles[i].draw_obstacle(game_state.context);
	}
}

function update(game_state){
	game_state.birb.compute_birb_movement(game_state.gravity, game_state.impulse, false);
	update_obstacles(game_state);
	return check_collision(game_state);
}

// initialize
function init_game(game_state){
	rnd = Math.random();
	game_state.birb.y = rnd * game_state.play_area.height;
	game_state.birb.accel = 0;
	game_state.play_area.draw_background();
	game_state.birb.draw_birb(game_state);
	draw_obstacles(game_state);
}

// update game state
function step(game_state){
	gameover = update(game_state);
	if(gameover)
		console.log("GAME OVER");
	game_state.play_area.clear(game_state.context, game_state.play_area);
	game_state.birb.draw_birb(game_state);
	draw_obstacles(game_state);
	game_state.play_area.draw_background();
	if(gameover)
		init_game(game_state);
}



init_game(game_state);
setInterval(function(){step(game_state)}, 40)
