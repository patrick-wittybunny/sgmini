var objects = [];
var images = [];

var hand;
var redButton;
var noButton;
var eventBoxes;

var scenarios = [
  ['Your crush likes you', 'No other friend except him/her'],
  ['You can see and explore any and all worlds and places from fiction, your own imagination, or from history', 'You cannot interact with them in any way'],
  ['You could win an infinite amount of money', 'There\'s only a 50% chance you will win it and if you don\'t you won\'t have any money for 2 years'],
  ['You get to know correct truth about any one question', 'You are unable to tell anyone the answer or question']
];

function preload() {
  images.redButton = loadImage('assets/button.png');
  images.hand = loadImage('assets/hand.png');
}
function setup() {
  createCanvas(600, 900);
  redButton = new redButton();
  objects.push(redButton);
  noButton = new noButton();
  objects.push(noButton);
  hand = new hand();
  objects.push(hand);
  eventBoxes = new eventBoxes();
  objects.push(eventBoxes);
  eventBoxes.updateTexts();
}
function draw() {
  background(121, 179, 243);
  for(var object of objects){
    object.update();
    object.show();
  }
}

function hand(){
  this.x = 0
  this.y = 0;
  this.angle = 0;
  this.pressing = false;
}
hand.prototype.update = function(){
  if(abs(mouseX - 281) <= 105 && abs(mouseY - 360) <= 80){
    this.x = 0.5 * width + 120;
    this.y = 0.4 * height - 150;
    this.angle = -20;  
    this.pressing = true;
  }
  else{
    this.x = 0.5 * width + 140;
    this.y = 0.4 * height - 200;
    this.angle = 0;  
    this.pressing = false;
  }
}
hand.prototype.show = function(){
  push();
  angleMode(DEGREES);
  imageMode(CENTER);
  translate(this.x, this.y);
  rotate(this.angle);
  image(images.hand, 0, 0);
  pop();
}

function redButton(){
  this.x = 0.5 * width;
  this.y = 0.4 * height;
}
redButton.prototype.update = function(){

}
redButton.prototype.show = function(){
  push();
  imageMode(CENTER);
  angleMode(DEGREES);
  rotate(this.angle);
  image(images.redButton, this.x, this.y);
  pop();
}

function noButton(){
  this.x = 0.5 * width;
  this.y = 0.5 * height + 40;
  this.boxColor = {
    inactive: color(255, 255, 255),
    active: color(148, 194, 245)
  };
  this.textColor = {
    inactive: color(121, 179, 243),
    active: (255, 255, 255)
  }
  this.mode = 'inactive';
}
noButton.prototype.update = function(){
  if(abs(mouseX - 300) <= 100 && abs(mouseY - 492) <= 37){
    this.mode = 'active';
  }
  else{
    this.mode = 'inactive';
  }
}
noButton.prototype.show = function(){
  push();
  rectMode(CENTER);
  stroke(255);
  fill(this.boxColor[this.mode]);
  rect(this.x, this.y, 200, 75, 10);

  noStroke();
  fill(this.textColor[this.mode]);
  textAlign(CENTER, CENTER);
  textSize(25);
  text('I WILL NOT', this.x, this.y);
  pop();
}

function eventBoxes(){
  this.x = 0.5 * width;
  this.y = 0.5 * height + 170;
  this.text1 = 'erh';
  this.text2 = 'ERH';
  this.boxColor = color(148, 194, 245);
}
eventBoxes.prototype.updateTexts = function(){
  var newScenario;
  do{
    newScenario = random(scenarios);
  }while(this.text1 == newScenario[0])
  this.text1 = newScenario[0];
  this.text2 = newScenario[1];
}
eventBoxes.prototype.update = function(){

}
eventBoxes.prototype.show = function(){
  push();
  rectMode(CENTER);
  stroke(255);
  fill(this.boxColor);
  rect(this.x, this.y, 400, 100, 10);

  rect(this.x, this.y + 150, 400, 100, 10);

  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(25);
  text('but', this.x, this.y + 75);

  textSize(20);
  text(this.text1, this.x, this.y, 400, 100);
  text(this.text2, this.x, this.y + 150, 400, 100);
  pop();
}
mouseReleased = function(){
  if(hand.pressing){
    eventBoxes.updateTexts();
  }
  else if(noButton.mode == 'active'){
    eventBoxes.updateTexts();
  }
}