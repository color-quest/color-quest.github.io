
// Constants
const Direction =
{
	Left: "Left",
	Right: "Right",
	Up: "Up",
	Down: "Down",
	None: "None"
};


// Global variables
var player = null;
var player_pos = null;
var playerImg = null;
var dir = Direction.None;

// Sprite class
// img parameter should be Image object which contains several pictures in line
// in the 4 directions: Right, Left, Up and Down (4 different lines)
// First image in each row is the idle position
function Sprite(img, frames, scale)
{
	// Sprites
	this.img = img;
	this.scale = scale;
	this.w = img.width / frames;
	this.h = img.height / 4;
	this.frame = 0;
	this.frames = frames;
}

// Position class
function Position(x, y)
{
	this.x = x;
	this.y = y;
	this.speed = 1.0;
	this.dir = Direction.None;
	this.idle = true;
}

// Player class
function Player(img)
{
	this.sprite = new Sprite(img, 4, 1);
	
	// Position & move
	this.pos = new Position(0, 0);
	
	this.Draw = function()
	{
		let line = 0;
		switch (this.pos.dir)
		{
			case Direction.Left:
				line = 1;
			break;
			case Direction.Right:
				line = 0;
			break;
			case Direction.Up:
				line = 2;
			break;
			case Direction.Down:
				line = 3;
			break;
		}
		
		// Use first frame for idle position
		if (this.pos.idle)
		{
			this.sprite.frame = 0;
		}
		else
		{
			// Compute new position
			let step = 2;
			this.pos.x += (this.pos.dir == Direction.Left ? -step : this.pos.dir == Direction.Right ? step : 0) * this.pos.speed;
			this.pos.y += (this.pos.dir == Direction.Up ? -step : this.pos.dir == Direction.Down ? step : 0) * this.pos.speed;
		}
		
		image(this.sprite.img, this.pos.x, this.pos.y, this.sprite.w * this.sprite.scale, this.sprite.h * this.sprite.scale,
			this.sprite.w * floor(this.sprite.frame), this.sprite.h * line, this.sprite.w, this.sprite.h)

		this.sprite.frame += 0.1;
		if (this.sprite.frame > this.sprite.frames)
		{
			this.sprite.frame = 0;
		}
	}
}


function preload()
{
	// Connect to the deepstream.io websocket server on Render.com
	partyConnect("wss://ws-0iff.onrender.com/deepstream", "color-quest");

	// Share player info
	player_pos = partyLoadShared("player_pos");
	
	// Load player image
	playerImg = loadImage('./assets/player.png');
}

function setup()
{
	createCanvas(windowWidth, windowHeight - 50);
	noStroke();

	// Create player
	player = new Player(playerImg);
	player_pos = player.pos;

	// Display info?
	//partyToggleInfo(true);
}

function mousePressed()
{
	// nothing
}

function draw()
{
	background(200);
	
	// Does user press a key?
	if (dir == Direction.None || !keyIsPressed)
	{
		player.pos.idle = true;
	}
	else
	{
		player.pos.idle = false;
		player.pos.dir = dir;
	}
	player.Draw();
	
	// Draw circle from shared data
	//ellipse(shared.x, shared.y, 50, 50);
}

function keyPressed()
{
	dir = Direction.None;
	switch (keyCode)
	{
		case LEFT_ARROW:
			dir = Direction.Left;
		break;
		case RIGHT_ARROW:
			dir = Direction.Right;
		break;
		case UP_ARROW:
			dir = Direction.Up;
		break;
		case DOWN_ARROW:
			dir = Direction.Down;
		break;
	}
}
