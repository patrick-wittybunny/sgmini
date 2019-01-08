var objects = [];
var images = [];
var game;

function preload() {
  images.mine = loadImage('assets/mine.png');
  images.flag = loadImage('assets/flag.png');
  images.angery = loadImage('assets/pepehands.png');
  images.smiley = loadImage('assets/monkas.png');
  images.yay = loadImage('assets/hypers.png');
}

function setup() {
  createCanvas(600, 900);
  game = new Minesweeper();
  objects.push(game);

  noLoop();
}

function draw() {
  for(var object of objects){
    object.update();
    object.show();
  }
}

function mousePressed(){
  game.mousePressed();
}

function Minesweeper(){
  this.modes = [];
  this.modes.push({
    xTiles : 8,
    yTiles : 8,
    mines  : 10,
    playWidth: 500,
    playHeight: 500,
    tsize : 40
  });
  this.modes.push({
    xTiles : 16,
    yTiles : 16,
    mines  : 40,
    playWidth: 500,
    playHeight: 500,
    tsize : 25
  });
  this.modes.push({
    xTiles : 24, 
    yTiles : 24, 
    mines  : 99, 
    playWidth: 500,
    playHeight: 500,
    tsize : 15
  });

  this.currentMode = this.modes[0];

  this.newGame();
}

Minesweeper.prototype.newGame = function(){
  this.clicks = 0;
  this.playState = [];
  this.gameState = 0;
  for(var y = 0; y < this.currentMode.yTiles; y++){
    var arr = [];
    for(var x = 0; x < this.currentMode.xTiles; x++){
      arr.push({
        visited: false,
        mine: false
      });
    }
    this.playState.push(arr);
  }
  this.placeMines(this.currentMode.mines);
}

Minesweeper.prototype.update = function(){

}

Minesweeper.prototype.show = function(){
  background(255);
  var playWidth = this.currentMode.playWidth;
  var playHeight = this.currentMode.playHeight;
  var tileWidth = playWidth/this.currentMode.xTiles;
  var tileHeight = playHeight/this.currentMode.yTiles;

  push();
  translate(0.5 * width, 0.5 * height);

  var visited = 0;
  for(var y = 0; y < this.currentMode.yTiles; y++){
    for(var x = 0; x < this.currentMode.xTiles; x++){
      if(this.playState[x][y].visited){
        if(this.playState[x][y].mine){
          image(
            images.mine, 
            -0.5 * playWidth + tileWidth * x, -0.5 * playHeight + tileHeight * y,
            tileWidth, tileHeight,
            0, 0, images.mine.width, images.mine.height
          )
        }
        else{
          var nearbyMines = this.getNearbyMines(x, y);
          push();
          fill(255);
          rect(
            -0.5 * playWidth + tileWidth * x, -0.5 * playHeight + tileHeight * y,
            tileWidth, tileHeight
          );
          pop();
          push();
          if(nearbyMines > 0){
            fill(this.getColor(nearbyMines));
            textAlign(CENTER, CENTER);
            textSize(this.currentMode.tsize);
            text(
              nearbyMines, 
              -0.5 * playWidth + tileWidth * x + 0.5 * tileWidth, 
              -0.5 * playHeight + tileHeight * y + 0.5 * tileHeight,
              )
            pop();
          }
        }
        visited++;
      }
      else{
        push();
        // var myTint = this.playState[x][y].mine? 0: 100;
        // fill(myTint);
        fill(100)
        rect(
          -0.5 * playWidth + tileWidth * x, -0.5 * playHeight + tileHeight * y,
          tileWidth, tileHeight
        );
        pop();
      }
    }
  }

  if(visited >= this.currentMode.xTiles * this.currentMode.yTiles - this.currentMode.mines){
    this.gameState = 1;
  }

  var emote;
  var emoteSize = 100;
  
  if(this.gameState == -1) emote = images.angery;
  if(this.gameState == 0)  emote = images.smiley;
  if(this.gameState == 1)  emote = images.yay;
  rectMode(CENTER);
  image(
    emote, 
    0 - 0.5 * emoteSize, 0.5 * this.currentMode.playHeight + 20,
    emoteSize, emoteSize,
    0, 0, emote.width, emote.height
  )

  pop();
}

Minesweeper.prototype.getColor = function(nearbyMines){
  retVal = 0;
  switch(nearbyMines){
    case 1:
      retVal = color(0, 255, 0);
    break;
    case 2:
      retVal = color(0, 0, 255);
    break;
    case 3:
      retVal = color(200, 10, 10);
    break;
    default:
      retVal = color(0, 0, 0);
  }
  return retVal;
}

Minesweeper.prototype.getNearbyMines = function(x, y){
  var minesFound = 0;
  for(var j = -1; j <= 1; j++){
    for(var i = -1; i <= 1; i++){
      if(i == 0 && j == 0){
        continue;
      }
      if(x + i < 0 || x + i >= this.currentMode.xTiles ||
        y + j < 0 || y + j >= this.currentMode.yTiles){
        continue
      }
      if(this.playState[x + i][y + j].mine){
        minesFound++;
      }
    }
  }
  return minesFound;
}

Minesweeper.prototype.placeMines = function(minesToPlace, x, y){
  if(x === undefined) x = -1;
  if(y === undefined) y = -1;
  var mineCount = 0;

  while(mineCount < minesToPlace){
    var randX = floor(random(0, this.currentMode.xTiles));
    var randY = floor(random(0, this.currentMode.yTiles));
    if(this.playState[randX][randY].mine == false
      && randX != x && randY != y){
      this.playState[randX][randY].mine = true;
      mineCount++;
    }
  }
}

Minesweeper.prototype.exploreTile = function(x, y, auto){
  if(x < 0 || x >= this.currentMode.xTiles || y < 0 || y >= this.currentMode.yTiles) return;
  if(this.playState[x][y].visited) return;
  if(this.playState[x][y].mine){
    if(this.clicks == 0){
      this.clicks++;
      this.playState[x][y].mine = false;
      this.placeMines(1, x, y);
      this.exploreTile(x, y);
    }
    else if(auto){
      return;
    }
    else{
      this.playState[x][y].visited = true;
      this.gameState = -1;
      redraw();
    }
  }
  else{
    this.playState[x][y].visited = true;
    if(!auto) this.clicks++;
    if(this.getNearbyMines(x, y) == 0){
      this.exploreTile(x - 1, y - 1 , true);
      this.exploreTile(x    , y - 1 , true);
      this.exploreTile(x + 1, y - 1 , true);
      this.exploreTile(x - 1, y     , true);
      this.exploreTile(x + 1, y     , true);
      this.exploreTile(x - 1, y + 1 , true);
      this.exploreTile(x    , y + 1 , true);
      this.exploreTile(x + 1, y + 1 , true);
    }
  }
  redraw();
}

Minesweeper.prototype.mousePressed = function(){
  switch(this.gameState){
    case 0:
      var clickX = mouseX - 0.5 * width;
      clickX += 0.5 * this.currentMode.playWidth;
      clickX /= this.currentMode.playWidth/this.currentMode.xTiles;
      clickX = floor(clickX);
    
      var clickY = mouseY - 0.5 * height;
      clickY += 0.5 * this.currentMode.playHeight;
      clickY /= this.currentMode.playHeight/this.currentMode.yTiles;
      clickY = floor(clickY);
      
      this.exploreTile(clickX, clickY);
    break;
    case -1:
      this.newGame();
      redraw();
    break;
    case 1:
      this.newGame();
      redraw();
    break;
    default:

  }
  

}
