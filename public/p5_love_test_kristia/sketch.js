var img, img2;  // Declare variable 'img'
var timer = 3;
var clicks = 0;
var r = 255;
var g = 255;
var b = 255;
var started = false;
var restartButton;
var button;
var inp, inp2, myText;
var myRect;
var rectPos = 900;
var submitted = false;
var percent = 0;
var percentResult = 0;

function preload () {
  img = loadImage("assets/bg.png");  // Load the image
  img2 = loadImage("assets/heart.png");  // Load the image
  img3 = loadImage("assets/heartbg.png");  // Load the image
  mask2 = loadImage("assets/startBtn.png");  // Load the image



  successSound = loadSound('assets/success.mp3');
  failSound = loadSound('assets/fail.mp3');
}

function setup() {
  createCanvas(600, 900);

  inp = createInput('');
  inp.position(width * 0.02, height * 0.28);
  inp.input(myInputEvent);
  inp.mousePressed(clearInput1);

  inp2 = createInput('');
  inp2.position(width * 0.535, height * 0.28);
  inp2.input(myInputEvent);
  inp2.mousePressed(clearInput2);


  inp.size(260, 40);
  inp2.size(260, 40);

  inp.style('font-size', '40px');
  inp2.style('font-size', '40px');
  console.log(inp);

  textAlign(CENTER, CENTER);
  textSize(50);
}

function customEvent() {
  console.log("adasdasasd");
}

function draw() {

  background(img);


  image(img3, width/6, height * 0.9 - img3.height );
  image(mask2, width/2 - mask2.width/2, height*0.4 - mask2.height/2);

  if (submitted && frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    	timer--;
  }
  else if(submitted && timer > 0){
    text("Calculating...", width * 0.47, height * 0.7);

  }
  if (timer == 0) {
    drawHeart();

    if(submitted && rectPos != 0 && percentResult != 0){
        rectPos -= height/100; 
        percentResult--;
        percent++;

        if(percentResult == 0){
            if(percent > 60){
                successSound.play();
            }
            else{
                failSound.play();
            }
        } 	
    }

    text(percent + "%", width * 0.47, height * 0.7);
  }

}

function mousePressed() {

    var x1 = width/2 - mask2.width/2;
    var y1 = height*0.4 - mask2.height/2;
    var x2 = width/2 + mask2.width/2;
    var y2 = height*0.4 + mask2.height/2;

  if(mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2){
    submitNames();
  }

}

function drawHeart(){

  if(percent != 0){
    var img2Y = img2.height * (100 - percent) / 100;
    var img2Height = img2.height * percent / 100;

    image(img2.get(0, img2Y, img2.width, img2Height), width/6, height * 0.9 - img2Height);    
  }

}


function myInputEvent() {
    this.style('color', 'black');

}

function clearInput1() {
    inp.value('');
}

function clearInput2() {
    inp2.value('');
}

function submitNames() {
  console.log(inp.value(), inp2.value());

  if(inp.value() && inp2.value() && inp.value() != 'Add name!' && inp2.value() != 'Add name!'){
      rectPos = height;
      submitted = false;
      percent = 0;
      percentResult = 0;

      submitted = true;

      timer = 3;

      percentResult = Math.floor(Math.random()  * 100);
  }
  else {
        if(!inp.value()){
            inp.style('color', 'red');
            inp.value('Add name!');
        }
        if(!inp2.value()){
            inp2.style('color', 'red');
            inp2.value('Add name!');
        }
  }

}
