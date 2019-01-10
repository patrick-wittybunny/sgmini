var objects = [];
var images = [];
var slotMachine;

function preload() {
  images.im1 = loadImage('assets/jigglypuff.png');
  images.im2 = loadImage('assets/jolteon.png');
  images.im3 = loadImage('assets/piplup.png');
  images.im4 = loadImage('assets/vulpix.png');
  images.im5 = loadImage('assets/7.png');

  images.button = loadImage('assets/button.png');
}
function setup() {
  createCanvas(600, 900);
  slotMachine = new slotMachine();
  objects.push(slotMachine);
}
function draw() {
  translate(0.5 * width, 0.5 * height);
  for(var object of objects){
    object.update();
    object.show();
  }
}

function slotMachine(){
  this.x = 0;
  this.y = 0;

  this.reels = [];
  this.maxReels = 3;
  
  this.spinning = false;

  var center = (this.maxReels + 1)/2;
  for(var i = 0; i < this.maxReels; i++){
    var r = new reel(1 - 2 * (i%2));
    r.x = 105 * (i - center + 1) - 100;
    r.width = 100;
    this.reels.push(r);
  }
  this.lever = new lever();
  this.lever.x = 200;
  this.lever.height = 600;
  this.lever.width = 200;
  this.lever.updateValues();
  // noLoop();
}

slotMachine.prototype.update = function(){
  if(this.spinning){
    if(millis() >= this.stopAt){
      this.spinning = false;
      this.lever.pullable = true;
      // noLoop();
    }
  }
  else{
    if(this.lever.pulled){
      this.spinReels()
      this.lever.pulled = false;
      this.lever.pullable = false;
    }
  }
  for(var reel of this.reels){
    reel.update();
  }
  this.lever.update();
}

slotMachine.prototype.show = function(){
  background(252, 244, 167);
  for(var reel of this.reels){
    reel.show();
  }
  this.lever.show();
  // push();
  // textAlign(LEFT, TOP);
  // stroke(0);
  // strokeWeight(5);
  // fill(255);
  // textSize(50);
  // text('So you want to know how many want to...', -0.5 * width + 50, -0.5 * height + 50, 500)
  // pop();

  // push();
  // stroke(0);
  // strokeWeight(5);
  // textAlign(CENTER, CENTER);
  // angleMode(DEGREES);
  // textSize(70);
  // translate(0, -160);

  // push();
  // translate(-160, 0);
  // fill(0, 0,  255);
  // text('FUCK', 0, 0);
  // pop();


  // push();
  // translate(160, 0);
  // fill(255, 0, 0);
  // text('KILL', 0, 0);
  // pop();

  // push();
  // translate(0, 0);
  // rotate(-20);
  // fill(160, 64, 191);
  // text('MARRY', 0, 0);
  // pop();

  // push();
  // fill(255);
  // translate(-160, 350);
  // text('..you?', 0, 0);
  // pop();

  // pop();

  push();
  stroke(0);
  strokeWeight(5);
  noFill();
  rectMode(CENTER);
  rect(this.x - 100, this.y, 105 * 3 + 20, 140);
  pop();

  // push();
  // imageMode(CENTER);
  // image(images.button, 120, 270, 250, 250);
  // pop();
}

slotMachine.prototype.spinReels = function(){
  if(this.spinning) return;
  this.spinning = true;
  var now = millis();
  var prevStopAt = now + 1000;
  for(var i = 1; i <= this.reels.length; i++){
    var stopAt = prevStopAt + 500 + 1000 * random(0, 0.8);
    prevStopAt = stopAt;
    this.reels[i - 1].spinReel(stopAt);
    if(i == this.reels.length){
      this.stopAt = stopAt + 200;
    }
  }
  // loop();
}

slotMachine.prototype.mousePressed = function(){

}

function reel(direction){
  if(direction === undefined) direction = 1;
  this.x = 0;
  this.y = 0;
  this.width = 100;
  this.direction = direction;
  this.spin = 0;
  this.spinV = 1 * this.direction;
  this.spinA = random(0.5, 1) * this.direction;
  this.spinning = false;
  this.spinMinBound = this.direction > 0? 0: -99;
  this.spinMaxBound = this.direction > 0? 99: 0;

  this.faceWidth = 100;
  this.faceHeight = 100;
  this.maxVisibleFaces = 3;

  this.faces = [0, 1, 2, 3, 4, 5, 99];

  this.topFace = floor(random(this.faces.length));

  this.value = null;
  this.minVal = 0;
  this.maxVal = 0;
}
reel.prototype.update = function(){
  if(this.spinning){
    this.spin += this.spinV + this.spinA;
    if(this.spin >= 100){
      this.topFace = (this.topFace <= 1? this.faces.length: this.topFace) - 1;
    }
    else if(this.spin <= -100){
      this.topFace = (this.topFace >= this.faces.length -1? -1: this.topFace) + 1;
    }
    this.spin = this.spin % 100;
    this.spinV = this.spinV + this.spinA;
    if(millis() >= this.stopAt){
      this.spinning = false;
    }
  }
  else{
    if(this.spin != 50 * this.direction){
      this.spin = 50 * this.direction;
      this.spinV = 1 * this.direction;
    }
  }
  
}
reel.prototype.show = function(){
  push();

  stroke(10);
  strokeWeight(2);
  fill(255);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  var y0 = this.y - 100;
  var h = 0;

  h = map(this.spin, this.spinMinBound, this.spinMaxBound, 0, 75);
  y0 += 0.5 * h;
  rect(this.x, y0, this.width, h);
  textSize(map(this.spin, this.spinMinBound, this.spinMaxBound, 1, 70));
  text(this.faces[this.topFace], this.x, y0);
  y0 += 0.5 * h;

  h = 125;
  y0 += 0.5 * h;
  rect(this.x, y0, this.width, h);
  textSize(80);
  text(this.faces[(this.topFace + 1)%this.faces.length], this.x, y0 );
  y0 += 0.5 * h;

  h = map(this.spin, this.spinMinBound, this.spinMaxBound, 75, 0);
  y0 += 0.5 * h;
  rect(this.x, y0, this.width, h);
  textSize(map(this.spin, this.spinMinBound, this.spinMaxBound, 70, 1));
  text(this.faces[(this.topFace + 2)% this.faces.length], this.x, y0);

  // imageRect(this.faces[this.upperMostColor], this.x, y0, 100, h);
  // imageRect(this.faces[(this.upperMostColor + 1)% this.faces.length], this.x, y0, 100, h);
  // imageRect(this.faces[(this.upperMostColor + 2)% this.faces.length], this.x, y0, 100, h);

  pop();
}

reel.prototype.getValue = function(){
  this.value = this.faces[(this.upperMostColor + 1)% this.faces.length];
  return this.value;
}

reel.prototype.spinReel = function(stopAt){
  this.spinning = true;
  this.stopAt = stopAt;
}

function imageRect(img, x, y, w, h){
  if(h == 0) return;
  rect(x - 0.5 * w, y - 0.5 * h, w, h);
  image(img, x - 0.5 * w, y - 0.5 * h, w, h, 0, 0);
  
}

function simplifiedQuad(x, y, w1, h1, w2, h2){
  if(h2 === undefined) h2 = h1;
  if(w2 === undefined) w2 = w1;

  quad(
    x - 0.5 * w1, y - 0.5 * h1, 
    x + 0.5 * w1, y - 0.5 * h2,
    x + 0.5 * w2, y + 0.5 * h2,
    x - 0.5 * w2, y + 0.5 * h1,
    );
}

function lever(){
  this.x = 0;
  this.y = 0;
  this.height = 200;
  this.width = 100;
  this.retractSpeed = -5;
  this.pullSpeed = -this.retractSpeed;
  this.updateValues();
}

lever.prototype.updateValues = function(){
  this.minBallR = 0.25 * this.width;
  this.maxBallR = 0.5 * this.width;
  this.minBallH = -0.5 * this.height + this.minBallR;
  this.maxBallH = 0.5 * this.height - this.maxBallR;
  this.crankAngle = 0;
  this.dCrank = this.pullSpeed;
  this.pulled = false;
  this.pullable = true;
}

lever.prototype.update = function(){
  if(this.dCrank > 0){
    if(this.crankAngle >= 99){
      this.pulled = true;
      this.dCrank = this.retractSpeed;
    }
  }
  else if(this.dCrank <= 0){
    if(this.crankAngle <= 0){
      if(this.pullable){
        this.dCrank = this.pullSpeed;
      }
    }
  }
  this.crankAngle = min(max(this.crankAngle + this.dCrank, 0), 99);
}

lever.prototype.show = function(){
  push();
  translate(this.x, this.y);
  var ballR = map(this.crankAngle, 0, 100, this.minBallR, this.maxBallR);
  var ballH = map(this.crankAngle, 0, 100, this.minBallH, this.maxBallH);
  stroke(0);
  strokeWeight(1);
  push();
  quad(
    -0.5 * this.minBallR, 0, 
    -0.5 * ballR, ballH,
    0.5 * ballR, ballH,
    0.5 * this.minBallR, 0
  );
  pop();
  push();
  fill(255, 0, 0);
  ellipseMode(RADIUS);
  ellipse(0, ballH, ballR);
  pop();
  pop();
}

lever.prototype.grab = function(){

}

mousePressed = function(){
  // if((mouseX - 0.5 * width - 120) ** 2 + (mouseY - 0.5 * height - 270)**2 <= 125 ** 2){
  //   slotMachine.spinReels();
  // }
  // slotMachine.mousePressed();
  // loop();
}

mouseReleased = function(){
  // slotMachine.mouseReleased();
  // noLoop();
}