var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database,position

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database= firebase.database();
  createCanvas(1500,700);

  hotBalloon=database.ref('balloon/position');
  hotBalloon.on("value",readPosition,showErr);
   
  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);
  if(position!==undefined){

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    updatePosition(-10,0)
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    updatePosition(10,0)
  }
  else if(keyDown(UP_ARROW)){
   balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    updatePosition(0,-10);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    updatePosition(0,10)
  }
  }
  drawSprites();
  fill(0);
  stroke("white");
  //Add instructions to place the sprite in the position.x,position.y?
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updatePosition(x,y)
{
  database.ref('balloon/position').set({
    'x':position.x+x,
    'y':position.y+y

  })
}
function readPosition(data)
{
  position=data.val();
  hotBalloon.x=position.x;
  hotBalloon.y=position.y;

  //sprites x and y coordinate has to be updated whenever a new value is updated in db..
  //U can do it here or in draw(); both ll work :)
  //Ok??
  //how to export db/?

  //Ask ur student to do this n upload this also along with all other files
  //CAn you try once
  //fine?

  

  balloon.x = hotBalloon.x;
  balloon.y = hotBalloon.y


}
function showErr(){
  console.log("Error in writing to the database");
}