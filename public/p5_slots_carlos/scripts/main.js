var objects = [];
var images = [];
var slotMachine;

function preload() {
  images.im1 = loadImage('assets/jigglypuff.png');
  images.im2 = loadImage('assets/jolteon.png');
  images.im3 = loadImage('assets/piplup.png');
  images.im4 = loadImage('assets/vulpix.png');
  images.im5 = loadImage('assets/7.png');
}
function setup() {
  createCanvas(600, 900);
  slotMachine = new slotMachine();
  objects.push(slotMachine);
  // frameRate(20)
}
function draw() {
  background(252, 244, 167);
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
    r.x = 105 * (i - center + 1);
    this.reels.push(r);
  }
}

slotMachine.prototype.update = function(){
  if(this.spinning){
    if(millis() >= this.stopAt){
      this.spinning = false;
    }
  }
  for(var reel of this.reels){
    reel.update();
  }
}

slotMachine.prototype.show = function(){
  for(var reel of this.reels){
    reel.show();
  }

  push();
  stroke(0);
  strokeWeight(10);
  noFill();
  rectMode(CENTER);
  rect(this.x, this.y, 105 * 3 + 20, 120);
  pop();
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
}

function reel(direction){
  if(direction === undefined) direction = 1;
  this.x = 0;
  this.y = 0;
  this.direction = direction
  this.spin = 0;
  this.spinV = 1 * this.direction;
  this.spinA = random(0.5, 1) * this.direction;
  this.spinning = false;
  this.spinMinBound = this.direction > 0? 0: -100;
  this.spinMaxBound = this.direction > 0? 100: 0;

  this.maxFaces = 4;
  this.currFace = 0;
  this.faceWidth = 100;
  this.faceHeight = 100;
  this.maxVisibleFaces = 3;


  this.faces = [
    images.im1,
    images.im2,
    images.im3,
    images.im4,
    images.im5
  ];
  this.upperMostColor = 0;

  this.value = null;

}
reel.prototype.update = function(){
  if(this.spinning){
    this.spin += this.spinV;
    if(this.spin >= 100){
      this.upperMostColor = (this.upperMostColor < 1? this.faces.length: this.upperMostColor) - 1;
    }
    else if(this.spin <= -100){
      this.upperMostColor = (this.upperMostColor >= this.faces.length - 1? -1: this.upperMostColor) + 1;
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

  var y0 = this.y - 100;
  var h = 0;

  h = map(this.spin, this.spinMinBound, this.spinMaxBound, 0, 75);
  y0 += 0.5 * h;
  imageRect(this.faces[this.upperMostColor], this.x, y0, 100, h);
  y0 += 0.5 * h;

  h = map(this.spin, this.spinMinBound, this.spinMaxBound, 125, 125);
  y0 += 0.5 * h;
  imageRect(this.faces[(this.upperMostColor + 1)% this.faces.length], this.x, y0, 100, h);
  y0 += 0.5 * h;

  h = map(this.spin, this.spinMinBound, this.spinMaxBound, 75, 0);
  y0 += 0.5 * h;
  imageRect(this.faces[(this.upperMostColor + 2)% this.faces.length], this.x, y0, 100, h);

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

mousePressed = function(){
  slotMachine.spinReels();
}
