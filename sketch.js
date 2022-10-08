var PLAY = 1;
var END = 0;
var gameState = PLAY;
var path, leftBoundary,rightBoundary;
var carImg
var obstacle,obstacleImg 
var restart, gameOverImg;
var score=0
var obstaclesGroup

function preload(){
    pathImg = loadImage("path.png");
    carImg = loadImage("cars4.png");
    obstacleImg = loadImage("car1.png");
    gameOverImg = loadImage("gameover.png")
}

function setup() {
    createCanvas(400,400);

    path=createSprite(200,200);
    path.addImage(pathImg);
    path.velocityY = 4;
    path.scale=1.2;

    car = createSprite(180,340,30,30);
    car.addAnimation("running",carImg);
    car.scale=0.05;

    gameOver = createSprite(200,200);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.8;
    gameOver.visible = false; 
    
    //leftBoundary=createSprite(500,500,100,800);
    //leftBoundary.visible = false;
    score=0;
    

//rightBoundary=createSprite(410,0,100,800);
//rightBoundary.visible = false;

//car.collide(leftBoundary);
//car.collide(rightBoundary);

obstaclesGroup=new Group()
car.setCollider("rectangle",0,0,300,570);
 car.debug=false

//var obstacle= createSprite(10,-50)
//obstacle.setLifetimeEach(-1);

  
}

function draw() {

    spawnObstacles();
    background(0);

   // car.collide(leftBoundary);
    //car.collide(rightBoundary);
    car.scale=0.2
    car.x = World.mouseX;
    edges= createEdgeSprites();
    car.collide(edges);

    //edges= createEdgeSprites();
    //car.collide(edges[3]);
    if(path.y > 400 ){path.y = height/2;}

     drawSprites();

     textSize(25);
    text("Score : "+ score,250,50);

    
   

    if (gameState===PLAY){
        path.velocityY=4
        score=score+Math.round(frameCount/60)
        
       
    

    

    if (obstaclesGroup.isTouching(car)){
       gameState=END
        car.velocityY=0

    }
    }

    else if (gameState===END){
    
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart!", 100,250);

    path.velocityY=0
        //obstaclesGroup.setLifetimeEach(-1)
        //car.setLifetimeEach(-1)
        obstaclesGroup.velocityY=0
       // car.velocityY=0
        obstaclesGroup.destroyEach()
        gameOver.visible = true;


    if(keyDown("UP_ARROW")) {
        reset();
      }
        
      }
  
    //edges= createEdgeSprites();
    
    
    
    
}

function reset(){
    gameState=PLAY
    gameOver.visible = false
    car.addAnimation("running",carImg);
      obstaclesGroup.destroyEach()
     
      score=0
}


function spawnObstacles() {
    if (frameCount %200  === 0) {
       obstacle= createSprite(10,-50);
       obstacle.addImage(obstacleImg)
       obstacle.x = Math.round(random(120,400));
       obstacle.scale=0.05
       obstacle.velocityY = 1;
        obstacle.lifetime=800;
        //score=score+2;
    
       
       
        car.depth=obstacle.depth
       obstacle.depth+=1

       obstaclesGroup.add(obstacle)
    }

       

    } 
    

