var objects = [];
var images = [];
var slotMachine;

function preload() {
  // images.im1 = loadImage('assets/jigglypuff.png');
  // images.im2 = loadImage('assets/jolteon.png');
  // images.im3 = loadImage('assets/piplup.png');
  // images.im4 = loadImage('assets/vulpix.png');
  // images.im5 = loadImage('assets/7.png');

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
      if(this.lever.pullable){
        noLoop();
      }
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
  if(this.spinning) return;
  this.lever.mousePressed();
}
slotMachine.prototype.mouseDragged = function(){
  this.lever.mouseDragged();
}
slotMachine.prototype.mouseReleased = function(){
  this.lever.mouseReleased();
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

  this.faces = [-5, -1, 0, 1, 24, 7, 25, 3, 99];
  this.faceWeights = [2, 1, 2, 4, 4, 4, 4, 4, 1];
  this.topFace = floor(random(this.faces.length));
  this.faceValue = this.faces[(this.topFace + 1)%this.faces.length];

  this.faceWeights.push(this.faceWeights.shift())
  var faceValSum = this.faceWeights.reduce(
    function(t, n){
      return t + n;
    });
  var cumVal = 0;

  for(i = 0; i < this.faceWeights.length; i++){
    this.faceWeights[i] = cumVal + this.faceWeights[i]/faceValSum;
    cumVal = this.faceWeights[i];
  }
  this.faceWeights[this.faceWeights.length - 1] = 1;
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
      var myVal = random();
      for(i = 0; i < this.faceWeights.length; i++){
        if(myVal <= this.faceWeights[i]){
          this.topFace = i;
          this.faceValue = this.faces[(this.topFace + 1)%this.faces.length];
          break;
        }
      }
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
  this.retractSpeed = -10;
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
  if(this.dCrank < 0){
    this.crankAngle += this.dCrank;
    if(this.crankAngle <= 0){
      this.crankAngle = 0;
      this.dCrank = 0;
      this.pullable = true;
      if(this.weakPull){
        noLoop();
      }
    }
  }
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

  // push();
  // noFill();
  // ellipseMode(RADIUS);
  // ellipse()
  // pop();

  push();
  ellipseMode(RADIUS);
  if(this.crankAngle >= 50){
    push();
    noFill();
    translate(0, ballH);
    rotate(0.1 * frameCount);
    ellipse(0, 0, ballR * 1.2, ballR * 1.6);
    if(this.crankAngle >= 98){
      rotate(PI/2);
      ellipse(0, 0, ballR * 1.2, ballR * 1.6);
    }
    pop();
  }
  var colorR = map(this.crankAngle, 50, 100, 0, 255, true);
  fill(colorR, 0, 0);
  ellipse(0, ballH, ballR);
  pop();
  pop();
}

lever.prototype.mousePressed = function(){
  if(this.pullable){
    var x = this.x + 0.5 * width;
    var y = this.y + 0.5 * height;
    if( abs(y + this.minBallH - mouseY)**2 + abs(x - mouseX)**2 <= this.minBallR ** 2 ||(
        abs(x - mouseX) <= 0.5 * this.minBallR &&
        abs(y + 0.5 * this.minBallH - mouseY) <= abs(0.5 * this.minBallH))){
      this.grabbed = true;
      this.minGrabY = mouseY;
      this.maxGrabY = 2 * y - this.minGrabY + 1;
    }
    loop();
  }

}
lever.prototype.mouseDragged = function(){
  if(this.grabbed){
    this.crankAngle = map(mouseY, this.minGrabY, this.maxGrabY, 0, 100, true);
  }
}
lever.prototype.mouseReleased = function(){
  if(this.grabbed){
    this.grabbed = false;
    this.pullable = false;
    this.dCrank = this.retractSpeed;
    if(this.crankAngle >= 50){
      this.pulled = true;
      this.weakPull = false;
    }
    else{
      this.weakPull = true;
    }
  }
}

mousePressed = function(){
  slotMachine.mousePressed();
  // loop();
}

mouseReleased = function(){
  slotMachine.mouseReleased();
}

mouseDragged = function(){
  slotMachine.mouseDragged();
}