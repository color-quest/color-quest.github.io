
// Global variables
var shared = { x: 100, y: 100 };
var playerImg = null;
var frame = 0;


// Sprite class
// img should be Image object which contains several pictures in line
// in the 4 directions: Left, Right, Up and Down (4 different lines)
// First image in each row is the idle position
function Sprite(img, frames, x, y, scale)
{
	this.img = img;
	this.scale = scale;
	this.x = x;
	this.y = y;
	this.w = img.width / frames;
	this.h = img.height / 4;
	this.frame = 0;
	this.frames = frames;
	
	this.Draw = function(dir)
	{
		image(this.img, this.x, this.y, this.w * this.scale, this.h * this.scale, this.w * this.frame, 0, this.w, this.h)

		this.frame += 1;
		if(this.frame > this.frames)
		{
			this.frame = 0;
		}
	}
}



function preload()
{
	// Load player image
	playerImg = loadImage('./assets/player.png');
	
	// Connect to the deepstream.io websocket server on Render.com
	partyConnect("wss://ws-0iff.onrender.com/deepstream", "color-quest");

	// Begin loading shared object
	shared = partyLoadShared("shared", shared);
}

function setup()
{
	createCanvas(displayWidth, displayHeight);
	background(0);
	noStroke();
	
	// Player
	player = new Sprite(playerImg, 4, 0, 0, 1);
	
	// Display info?
	//partyToggleInfo(true);
}

function mousePressed()
{
	// write shared data
	shared.x = mouseX;
	shared.y = mouseY;
}

function draw()
{
	background(100);

	player.x = mouseX;
	player.Draw();
	
	// Draw circle from shared data
	ellipse(shared.x, shared.y, 50, 50);
}
