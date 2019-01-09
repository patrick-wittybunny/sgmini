var img;  // Declare variable 'img'.
var timer = 5;
var clicks = 0;
var r = 255;
var g = 255;
var b = 255;
var started = false;
var restartButton;
var button;
var inp, inp2, myImage, myBackground;
var myRect;
var rectPos = 400;
var submitted = false;
var percent = 0;
var percentResult = 0;
var successSound, failSound, pushSound;
var released = true;

function preload (){ 
  img = loadImage("assets/lava.png");  // Load the image

}
function setup() {
  // img = loadImage("/try1/assets/lava.png");  // Load the image

  createCanvas(window.innerWidth, window.innerHeight);
  // createCanvas(600, 900);

  successSound = loadSound('assets/success.mp3');
  failSound = loadSound('assets/fail.mp3');
  pushSound = loadSound('assets/push.mp3');

  // button = createButton('click me');
  // button.style('border-radius', '30%');
  // button.style('font-size', '150px');
  // button.position(width * 0.05, height * 0.7);
  // button.mousePressed(clickMe);
  // button.doubleClicked(clickMe);
  // console.log(button);

  
  myImage = createImage(img, 0, height/2, img.width/2, img.height/2);
  // myImage.mousePressed(clickMe);

/*
  inp = createInput('');
  inp.position(width * 0.1, height * 0.3);
  inp.input(myInputEvent);

  inp2 = createInput('');
  inp2.position(width * 0.1, height * 0.35);
  inp2.input(myInputEvent); 

  submitButton = createButton('submit');
  submitButton.position(width * 0.1, height * 0.45);
  submitButton.mousePressed(submitNames);

  fill(255, 204, 0);*/

}

function draw() {
  // Displays the image at its actual size at point (0,0)

  // Displays the image at point (0, height/2) at half size
  // image(img, 0, height/2, img.width/2, img.height/2);

  // console.log("hello2");
  clear();
  background(r, g, b);

  ellipse(width * 0.5, height * 0.8, 300, 300);


  textAlign(CENTER, CENTER);
  textSize(50);

  if(!started){
  	text("CLICK TO START", width/2, height * 0.1);
  }
  text(timer + " sec", width/2, height * 0.25);
  text(clicks + " clicks", width/2, height * 0.4);
  text("CLICK ME", width * 0.5, height * 0.8);
  
  // while (timer > 0) {  // this doesn't work because it's all happening at the same time
  //   timer --;
  // }
  
  // frameCount --> this keeps track of the number of times the program has gone throught the code, 60 = 1 second
  // % ---> this is the Modulo operator, it divides numbers and evaluates to the remainder: 17 % 5 evaluates to 2 remainder
  // this can be used to determine if the number on the left is divisible by the number on the right
  
  if (started && frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    	timer--;
    	if (timer == 0) {
	    // text("GAME OVER", width/2, height*0.7);
        createRestartButton();
	}
  }

  if(started && timer == 0){
		
	if(clicks > 30){
	  	text("Good Result", width/2, height * 0.1);
	}
	else{
	  	text("Bad Result", width/2, height * 0.1);
	}

  }


  /*if(submitted && rectPos != 0 && percentResult != 0){
  	rectPos -= height/100; 
  	percentResult--;
  	percent++; 	
  }
  myRect = rect(0, rectPos, 25, height);

  text(percent, width * 0.1, height * 0.1);*/




}

function mouseReleased(){
  released = true;
  return false;
}

// When the user clicks the mouse
function mousePressed() {
  // Check if mouse is inside the circle
  if(!released){
    return;
  }
  released = false;
  var d = dist(mouseX, mouseY, width * 0.5, height * 0.8);
  if (d < 100) {

    if(!started){
    		started = true;
  	}

  	if(started && timer > 0){
  	  	clicks++;
  	  	r = random(255);
  	    g = random(255);
  	   	b = random(255);

  	   	pushSound.play();
  	}

  }
  console.log("helloas");
}
// function doubleClicked() {

// }

/*function clickMe() {
  // Check if mouse is inside the circle
  // var d = dist(mouseX, mouseY, 360, 200);
  // if (d < 100) {
    // Pick new random color values
    // r = random(255);
    // g = random(255);
    // b = random(255);
  // }

  if(!started){
  	started = true;
  }

  if(started && timer > 0){
  	clicks++;
  	r = random(255);
    g = random(255);
   	b = random(255);
  }

  console.log("hello");
}*/

function restart() {
	started = false;
    	timer = 5;
    	clicks = 0;

    	// button.show();
    	restartButton.hide();
}

function createRestartButton() {

	// button.hide();


	if(!restartButton){

	    restartButton = createButton('restart');
      restartButton.style('font-size', '30px');
	  	restartButton.position(width * 0.40, height * 0.48);
      restartButton.touchStarted(restart); 
	  	restartButton.mousePressed(restart); 
	}
	else{
		restartButton.show();
	}

	if(clicks > 30){
  		text("Result 1", width/2, height * 0.2);
  		successSound.play();
	}
	else{
  		text("Result 2", width/2, height * 0.2);
  		failSound.play();
	}
}

function myInputEvent() {
  // console.log('you are typing: ', this.value());
}

function submitNames() {
  console.log(inp.value(), inp2.value());

  submitted = true;

  percentResult = Math.floor(Math.random()  * 100);
}












