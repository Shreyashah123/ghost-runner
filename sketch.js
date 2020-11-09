var door,doorImage;
var ghost,ghostImage;
var climber,climberImage;
var tower,towerImage;
var spookySound;
var invisibleblock;
var gameState="PLAY";
function preload(){
  doorImage=loadImage("door.png");
  ghostImage=loadImage("ghost-standing.png");
  climberImage=loadImage("climber.png");
  towerImage=loadImage("tower.png");
  spookySound=loadSound("spooky.wav");
}




function setup() {
  
  createCanvas(600,600);
  spookySound.loop();
  tower=createSprite(300,300,10,10);
  tower.addImage(towerImage);
  tower.velocityY=1;
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleGroup=new Group();
  ghost=createSprite(200,200,10,10);
  ghost.addImage(ghostImage);
  ghost.scale=0.3;
}


function draw(){
  background("black");
  if(gameState==="PLAY"){
  if(tower.y>400){
    tower.y=300;
  }
    spawnDoors();
  if(keyDown("space")){
    ghost.velocityY=-10;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  if(keyDown("left_arrow")){
    ghost.x-=3;
  }
  if(keyDown("right_arrow")){
    ghost.x+=3;
  }
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    if(invisibleGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState="END";
      
    }
  }
 
  drawSprites();
   if(gameState==="END"){
     tower.velocityY=0;
    textSize(30);
    stroke("yellow");
     fill("yellow");
    text("GAME OVER",230,250);
    
  }
  
  
}
 function spawnDoors(){
   if(frameCount%200===0){
     
   
   door=createSprite(200,-50);
     climber=createSprite(200,10);
     invisibleblock=createSprite(200,15,70,10);
    door.x= Math.round(random(120,400));
     climber.x=door.x;
     invisibleblock.x=door.x;
   door.addImage(doorImage);
     climber.addImage(climberImage);
   door.velocityY=1;
     climber.velocityY=1;
     invisibleblock.velocityY=1;
     ghost.depth=door.depth;
     ghost.depth+=1;
     door.lifetime=600;
     climber.lifetime=600;
     invisibleblock.lifetime=600;
     doorsGroup.add(door);
     climbersGroup.add(climber);
     invisibleGroup.add(invisibleblock);
   }
 }
