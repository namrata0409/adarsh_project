var player;
var ground, invisibleground;
var fly, flyGroup;
var obstacles, obstaclesGroup;
var gameState = 1;
var level = 3;

// buttons
var gameover, gameoverimg;
var level1, level2, level3, level1img, level2img, level3img;
var restart, restartimg;
var selectimg;
var titleimg; 

// points
var coin, coinimg;
var fruit, fruitimg;
var poison, poisonimg;

//player images
var player1main, player1running, player1dead;
var player2main, player2running, player2dead;

//animals
var animal1img, animal2img, animal3img, animal4img, 
animal5img, animal6img, animal7img, animal8img, animal9img;

// background
var bgstart;
var bgmap;
var bgend;

// level1
var bg1img;
var spawn1img;
var ground1img;

//level2
var bg2img;
var spawn2img;
var ground2img;

//level3
var bg3img;
var spawn3img;
var ground3img;




function preload(){
bgstart = loadImage("forest/forest_start.jpg");
bgmap = loadImage("forest/forest_map.jpg");
bgend = loadImage("forest/forest_end.jpg");
bg1img = loadImage("forest/forest1.jpg");
bg2img = loadImage("forest/forest2.jpg");
bg3img = loadImage("forest/forest3.jpg");

level1img = loadImage("button/level1.png");
level2img = loadImage("button/level2.png");
level3img = loadImage("button/level3.png");

player1main = loadImage("character/player1main.png");
player1running = loadAnimation("character/player1_walk1.png","character/player1_walk2.png","character/player1_walk3.png");
player1dead = loadImage("character/player1_dead.png");

player2main = loadImage("character/player2main.png");
player2running = loadAnimation("character/player2_walk1.png","character/player2_walk2.png","character/player2_walk3.png");
player2dead = loadImage("character/player2_dead.png");

ground1img = loadImage("forest/ground1.png");
ground2img = loadImage("forest/ground2.png");
ground3img = loadImage("forest/ground3.png");

spawn1img = loadImage("spawn/bird.png");
spawn2img = loadImage("spawn/wisp.png");
spawn3img = loadImage("spawn/star.png");

animal1img = loadImage("animals/cheetah.png");
animal2img = loadImage("animals/elephant.png");
animal3img = loadImage("animals/fox.png");
animal4img = loadImage("animals/lion.png");
animal5img = loadImage("animals/giraffe.png");
animal6img = loadImage("animals/monkey.png");
animal7img = loadImage("animals/rhino.png");
animal8img = loadImage("animals/tiger.png");
animal9img = loadImage("animals/zebra.png");

gameoverimg = loadImage("button/GameOver.png");
restartimg = loadImage("button/restart.png");
}

function setup(){
  createCanvas(1400, 700);
 
  // level buttons
  level1= createSprite(350, 370, 40,40);
  level1.addImage(level1img);
  level1.scale = 0.7;
  level1.visible = false;

  level2= createSprite(700, 370, 40,40);
  level2.addImage(level2img);
  level2.scale = 0.7;
  level2.visible = false;

  level3= createSprite(1050, 370, 40,40);
  level3.addImage(level3img);
  level3.scale = 0.7;
  level3.visible = false;
  
  //ground's sprite
  ground = createSprite(800,660,700,30);
  ground.scale=2;
  ground.velocityX = -4;
  ground.visible=false;
 

//invisible ground
invisibleground = createSprite(300, 650, 2000,10);
invisibleground.visible = false;
 
  //player's sprite
  player = createSprite(100, 620,40,40);
  player.visible = false;
   player.addImage(player1main);
  //player.addAnimation("player1 running",player1running);
  //player.addImage(player1dead);
  //player.addImage(player2main);
  //player.addAnimation("player2 running",player2running);
  //player.addImage(player2dead);
  
  player.scale = 1.5;

 //game over 
gameover = createSprite(670, 120, 10, 10);
gameover.addImage(gameoverimg);
gameover.scale = 1.8;
gameover.visible = false;

//restart 
restart = createSprite(670, 370, 10,10);
restart.addImage(restartimg);
restart.scale = 1.3;
restart.visible = false;

  
  flyGroup = new Group();
  obstaclesGroup = new Group(); 

}


function draw(){
  
 if(gameState === 0){
 // start page of the game
background(bgstart);
textSize(40);
strokeWeight(1.5);
stroke("black");
fill("white");
text("message", 150,200);
 } 
else if(gameState === 1){
  //chose player and display Map
  background(bgmap);
  level1.visible = true;
  level2.visible = true;
  level3.visible = true;
   
  drawSprites();
 
}
else if(gameState ===2){
//main game

ground.visible = true;
player.visible = true;

  if(level===1){
  background(bg1img);
  ground.addImage(ground1img);
  }
else if(level===2){
  background(bg2img);
  ground.addImage(ground2img);
 }
else if(level === 3){
  background(bg3img);
  ground.addImage(ground3img);
}
//infinite scrolling effect
if(ground.x<425){
  ground.x = 800;
}

//making player jump
if(keyDown("space")){
  player.velocityY= -6;
}

player.velocityY = player.velocityY + 0.4;

while(player.velocityX>0){
  player.velocityX = player.velocityX - 0.08;
}

//making the player move left and right
if(keyDown("left")){
  player.velocityX = -1.5;
}
if(keyDown("right")){
  player.velocityX = 1.5;
}

spawnfly();
spawnobstacles();

player.collide(invisibleground);
drawSprites();
}
else if(gameState === 3){
  //end of the game
  background(bgend);
  gameover.visible = true;
  restart.visible = true;
  restart();
  drawSprites();
}


}

function restart(){
//write restart function

}



function spawnfly(){
  if(frameCount%70 === 0){
  fly= createSprite(1370, 100, 10, 10);
  fly.velocityX = -3;
  fly.lifetime= 500;
  fly.y = Math.round(random(10,350));
  
  switch(level){
    case 1: fly.addImage(spawn1img); fly.scale = 0.3; break;
    case 2: fly.addImage(spawn2img); fly.scale = 0.4; break;
    case 3: fly.addImage(spawn3img); fly.scale = 0.4; break;
    default:break;
  }
   
  fly.depth = player.depth;
  player.depth = player.depth+ 1;

  flyGroup.add(fly);
}
}

function spawnobstacles(){
  if(frameCount%100 === 0){
    obstacles= createSprite(1370, 600, 40, 10);
    obstacles.y =Math.round(random(550,600));
    obstacles.velocityX = -6;
    obstacles.lifetime= 500;
   
    var r = Math.round(random(1,9));
    switch (r){
      case 1: obstacles.addImage(animal1img); obstacles.scale = 0.4; break;
      case 2: obstacles.addImage(animal2img); obstacles.scale = 0.7; break;
      case 3: obstacles.addImage(animal3img); obstacles.scale = 0.4; break;
      case 4: obstacles.addImage(animal4img); obstacles.scale = 0.6; break;
      case 5: obstacles.addImage(animal5img); obstacles.scale = 0.7; break;
      case 6: obstacles.addImage(animal6img); obstacles.scale = 0.5; break;
      case 7: obstacles.addImage(animal7img); obstacles.scale = 0.7; break;
      case 8: obstacles.addImage(animal8img); obstacles.scale = 0.5; break;
      case 9: obstacles.addImage(animal9img); obstacles.scale = 0.5; break;
      default: break;
     }

    obstaclesGroup.add(obstacles);
    
  }
}


