// setup
const Birb = require('./Birb.js')
const PlayArea = require('./PlayArea.js')
const Game = require('./Game.js')

// set up game state and canvas
const canvas = document.getElementById("myCanvas"); // canvas object
const context = canvas.getContext("2d"); // context, used to draw to canvas

const width = canvas.width;
const height = canvas.height;

const play_area = new PlayArea(0, 0, width, height, context);
const birb = new Birb(25, 25, 5, 100, 10, 0);
const game = new Game(play_area, birb, context, 2, 15, 5)

// register input and start main loop
document.addEventListener('keydown', function(){birb.birb_flap(game.impulse)});
setInterval(function(){game.step()}, 40);
