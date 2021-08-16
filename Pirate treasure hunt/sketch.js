var SERVE = 1;
var PLAY = 2;
var END = 0;
var gameState = 1;

var canvas;
var pirate, 
var coin, bomb;
var system,code,security;


function preload() {
  bomb1_img = loadImage("images/bomb.png");
  bomb2_img = loadImage("images/bomb2.png");
  coin1_img = loadImage("images/coin1.png");
  coin2_img = loadImage("images/coin2.png");
  coin3_img = loadImage("images/coin3.png");
  coin4_img = loadImage("images/coin4.png");
  pPirate_img = loadImage("images/Player Pirate img.png");
  treasure_img = loadImage("images/TREASURE.png");
  gameOverImage = loadImage("images/game over.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  security = new Security();
  system = new System();

  pirate = createSprite(50, 330, 20, 50)
  pirate.addImage(pPirate_img);
  pirate.scale = 0.5

  

  score = 0;
  coinGroup = createGroup();

  bombGroup = createGroup();
}

function draw() {

  background("lightblue");

  if(gameState === SERVE){
    clues();
    security.display();
    textSize(20);
    fill("white");


    fill("red");
    text("please answer these questions to begin the game",650,55)
text("*INSTRUCTIONS*",1020,100)
text(".You can move the pirate with the mouse",1020,130)
text(".Touch the coins so you can gain points",1020,160)
text(".Make sure you don't touch the bombs,",1020,190)
text("or else you will lose",1020,220)
text("- Hope you enjoy playing the game.",1020,250)

    if(score === 3){
      gameState  = PLAY;
    }
  }

  if (gameState === PLAY) {

   pirate.x = World.mouseX;
   pirate.y = World.mouseY;

    bombs();
    coins();

    // Increase score if pirate touching coin
    if (coinGroup.isTouching(pirate)) {
      coinGroup.destroyEach();


      score = score + 5

        
          

      if(score === 25){
        gameState = END;
        clear()
        background(treasure_img);
      }

    }
    else if (bombGroup.isTouching(pirate)) {
      gameState = END;
    }

  }


  else if (gameState === END) {



    

    coinGroup.destroyEach();
    bombGroup.destroyEach();
    coinGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);

    // Change the image of pirate to gameover and reset its position
    pirate.addImage(gameOverImage);
    pirate.x = 550;
    pirate.y = 400;
    pirate.velocity = 0;
    
  
    
  }





  //Display score
  textSize(40);
  text("Score : " + score, 300, 50);


  drawSprites();
}


function bombs() {
  if (frameCount % 50 === 0) {
    bomb = createSprite(random(100, 950), 200, 20, 20);
    bomb.velocityY = 7
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: bomb.addImage(bomb1_img);
        break;
      case 2: bomb.addImage(bomb2_img);
        break;
      default: break;

    }
    bomb.scale = 0.5;
    bombGroup.add(bomb);
  }
}


function coins() {
  if (frameCount % 20 === 0) {
    coin = createSprite(random(100, 1000), 0, 100, 100);

    coin.velocityY = 6;
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1: coin.addImage(coin1_img);

        break;
      case 2: coin.addImage(coin2_img);

        break;
      case 3: coin.addImage(coin3_img);

        break;
      case 4: coin.addImage(coin4_img);

        break;

      default: break;

    }
    coin.scale = 0.5;
    coinGroup.add(coin);

  }
}

