var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var score;
var cloudsGroup, cloudImage;
var obstacleGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5,obstacle6;
var PLAY = 1;
var END= 0;
var gamestate = PLAY;

var gameover, restart;
var gameoverImage, restartImage;

    
function preload(){
  
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  
  gameoverImage = loadImage("gameOver.png")

  restartImage = loadImage("restart.png")
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  
}


function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstacleGroup = new Group ();
  score = 0;
  gameover= createSprite(300,100);
  gameover.addImage(gameoverImage);
  gameover.scale = 0.5;
  gameover.visible = false;
  restart = createSprite(300,140);
  restart.addImage(restartImage)
  restart.scale = 0.5;
  restart.visible = false;
  
}

function draw() {
  background(180);
 
  text("score" + score,400,50)

  if(gamestate === PLAY){
    //score increases only in play state
     score=score+Math.round(getFrameRate()/60);
     //gravity
     trex.velocityY = trex.velocityY + 0.8
     //trex jumps only in play state 
     if(keyDown("space" )&& trex.y>161) {
     trex.velocityY = -10;
    }
    //ground moves
      ground.velocityX = -2;
    //ground scroles
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    //clouds and obsticals and they move
    spawnClouds();
    spawnObstacles();
    //gamestate changes to end when trex touches any obstacle
    if(obstacleGroup.isTouching(trex)){
       gamestate = END;
       }
    
    
    
  }
  else if (gamestate === END){
    //ground stops moving
    ground.velocityX = 0;
    //trex stops jumping
    trex.verlocityY = 0;
    trex.changeAnimation(trex_collided);
    //clouds and obstacles stop moving
    obstacleGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    //setlife time negative number so that there never destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    gameover.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)){
       reset();
       }
    

  }
  
  trex.collide(invisibleGround);

  drawSprites();
}

function spawnClouds(){
  if(frameCount%60=== 0){     
    var cloud = createSprite (600,120,40,10);
    cloud.y= Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale=0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    cloudsGroup.add(cloud);
     }
  
}
function spawnObstacles(){
  if(frameCount%60=== 0){     
    var obstacles = createSprite (600,165,40,10);
    var rand = Math.round(random(1,6));
  switch(rand){
    case 1: obstacles.addImage(obstacle1);
      break;
        case 2: obstacles.addImage(obstacle2);
      break;
        case 3: obstacles.addImage(obstacle3);
      break;
        case 4: obstacles.addImage(obstacle4);
      break;
        case 5: obstacles.addImage(obstacle5);
      break;
        case 6: obstacles.addImage(obstacle6);
      break;
      default:break;
  }
    
    obstacles.scale=0.5;
    obstacles.velocityX = -6;
    obstacles.lifetime = 300;
  obstacleGroup.add(obstacles);
     }
  
}
function reset(){
  gamestate = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation(trex_running);
  
  score = 0;
  
}