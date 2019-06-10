var scores=0;
var lives=3;
//var t=true;

document.getElementById('live').innerHTML=  lives +"lives";
document.getElementById('score').innerHTML=   scores +"scores";

// Enemies our player must avoid
var Enemy = function (x, y, speed) {

    // The following variables are used to determine the x and y axis and speed of the enemy
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image of the enemy of cockroach that is added to the playing field 
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {

    // Multiplies the speed by the dt parameter on the x axis
    this.x += this.speed * dt;

    // Once enemies are off the canvas, they reappear randomly with different speeds
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    };

    // Checks for collisions between the player and the enemies
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y && lives > 0) {
        player.x = 202;
        player.y = 405;
        lives--;
        document.getElementById('live').innerHTML= lives +"lives";
     }

else {
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y && lives == 0) {
        player.x = 202;
        player.y = 405;
         document.getElementById('live').innerHTML= lives +"lives"}
        }
};

// Renders the enemy into the game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class focusing on x and y axis
var Player = function (x, y) {

    // Variables for the player to move along x and y axis 
    this.x = x;
    this.y = y;

    //The image of the player of horn-girl is added to the playing field 
    this.player = 'images/char-horn-girl.png';
};

Player.prototype.update = function (dt) {

};

// Renders the image of the user into the game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Allows the user to use the arrow keys to jump from tile to tile
Player.prototype.handleInput = function (keyPress) {

    // Enables user on left arrow key to move left on the x axis by 102
    // Also enables user not to go off the game tiles on the left side
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    };

    // Enables user on right arrow key to move right on the x axis by 102
    // Also enables user not to go off the game tiles on the right side
    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    };

    // Enables user on up arrow key to move upwards on the y axis by 83
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    };

    // Enables user on down arrow key to move downwards on the y axis by 83
    // Also enables user not to go off the game tiles on the bottom side
    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    };

    // when the user reaches to the top of canvas, the user will autamatic 
    // reset to the starting position
   if(lives > 0){
   
    if (this.y == -10 && this.x <= 406 && this.x >=-2) {
        scores++;
console.log("we reach to desired area");
    document.getElementById('score').innerHTML=  scores +"scores";
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 500);
    
     }
  console.log("score still above zero");
}
else{
this.x = 202;
 this.y = 405;

// this is to prevent the player to move when the live reaces zero
document.removeEventListener('keyup', function (e) {
     
});
var r =confirm("do you want to reset the game?");
//when user wants to play again 
if(r==true){
lives=3;
scores=0;
document.getElementById('score').innerHTML=  scores +"scores";
document.getElementById('live').innerHTML= lives +"lives";
}
//when user press cancel button
else
{
    this.x = 202;
    this.y = 405;
   
   // this is to prevent the player to move when the live reaces zero
   document.removeEventListener('keyup', function (e) {
    console.log("the game was canceled by user!!! ");  
   }); 
  }
}

};
// All enemies are placed in an array
var allEnemies = [];

// Location of the 3 enemies on the y axis located on the stone road
var enemyLocation = [63, 147, 230];


// For each enemy located on the y axis from 0 on the x axis move at a speed of 200 
// Until randomly regenerated in the enemy update function above
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

// The postion of the player is located at x=200, y=405
var player = new Player(202, 405);
 
// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
