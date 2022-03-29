const Obstacle = require('./Obstacle.js')

module.exports = class Game{
    constructor(play_area, birb, context, gravity, impulse, obstacle_speed){
        this.play_area = play_area;
        this.birb = birb;
        this.context = context;
        this.gravity = gravity;
        this.impulse = impulse;
        this.obstacle_speed = obstacle_speed
        this.obstacles = this.initialize_obstacles(2, 500, 
            play_area);
        this.init_game();
    }

    initialize_obstacles(num_obstacles, distance){
        let obstacles = new Array()
        let xpos = 2 * width;
        for(let i = 0; i < num_obstacles; i++){
            let width = 100;  // TODO randomize
            // TODO better randomization, maybe gaussian centered on current position?
            let ypos = this.play_area.playable_top + 
                (Math.random() * 
                    (this.play_area.playable_height - width));
            let obs = new Obstacle(xpos, 
                ypos, 
                width, 
                this.play_area.playable_top, 
                this.play_area.playable_bottom)
            xpos += distance
            obstacles.push(obs)
        }
        return obstacles
    }

    check_collision(){
	// check collision with bounds
	let collision = false;
	let birb = this.birb;
	let play_area = this.play_area;
	if(birb.y <= play_area.playable_top)
		collision = true;
	else if(birb.y >= this.play_area.playable_bottom - this.birb.height)
		collision = true;

	// check for collision with obstacles
	for(let i in this.obstacles){
		if(this.obstacles[i].check_collision(this.birb))
			collision = true;
	}
	return collision
    }
 
    update_obstacles(){
        for(let i in this.obstacles){
            let obs = this.obstacles[i];
            if(obs.xpos + obs.width < 0){
                // obstacle out of view should be removed
                this.obstacles.splice(i,1)
                // refill array with new obstacle
                let xpos = this.obstacles[this.obstacles.length - 1].xpos + 150;  // TODO maybe randomize slightly
                let width = 100;  // TODO randomize
                let ypos = this.play_area.playable_top + 
                    (Math.random() * 
                        (this.play_area.playable_height - width));
                let obs = new Obstacle(xpos, 
                ypos, 
                width, 
                this.play_area.playable_top, 
                this.play_area.playable_bottom)
                this.obstacles.push(obs)
            }
            this.obstacles[i].move_obstacle(this.obstacle_speed);
        }
    }

    draw_obstacles(){
        for(let i in this.obstacles){
            this.obstacles[i].draw_obstacle(this.context);
        }
    }

    update(){
        this.birb.compute_birb_movement(this.gravity, this.impulse, false);
        this.update_obstacles();
        return this.check_collision();
    }

    init_game(){
        let rnd = Math.random();
        this.birb.y = rnd * this.play_area.height;
        this.birb.accel = 0;
        this.play_area.draw_background();
        this.birb.draw_birb(this.context, this.play_area);
        this.draw_obstacles();
    }

    step(){
        let gameover = this.update();
        if(gameover)
            console.log("GAME OVER");
        this.play_area.clear(this.context, this.play_area);
        this.birb.draw_birb(this.context, this.play_area);
        this.draw_obstacles();
        this.play_area.draw_background();
        if(gameover)
            this.init_game();
    }
}
