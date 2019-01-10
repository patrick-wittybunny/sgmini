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
var resultString;

var strArr = [
  ['Not in this lifetime!', 'You’re making a mistake!'],
  ['You’re better off as friends.'],
  ['There’s someone better out there for you.'],
  ['Your destiny is with someone else.'],
  ['Maybe you can give each other a chance!'],
  ['It might work out but, then again, it might not!'],
  ['You’re compatible, but it’s not going to be easy.'],
  ['What a lovely couple you both make!'],
  ['No couple is perfect, but you come very close!'],
  ['Your love is meant to be!', 'You are the perfect couple!']
]

function preload () {
    img = loadImage("assets/bg.png");  // Load the image
    img2 = loadImage("assets/heart.png");  // Load the image
    img3 = loadImage("assets/heartbg.png");  // Load the image
    mask2 = loadImage("assets/startBtn.png");  // Load the image

    successSound = loadSound('assets/success.mp3');
    failSound = loadSound('assets/fail.mp3');

    //font = loadFont('assets/SourceSansPro-Regular.otf');
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
        
        textSize(50);
        text(percent + "%", width * 0.47, height * 0.7);

        if(percentResult == 0){
            textSize(20);
            text(resultString, width * 0.5 - 150, height * 0.83, 300, 200);
        }

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

      percentResult = calculateLove2();//Math.floor(Math.random()  * 100);

      resultString = getResultStr();
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

function getResultStr() {
    var num = Math.floor(percentResult / 10);
    num = num >= 10 ? 9 : num;
    var num2 = Math.floor(Math.random() * strArr[num].length);
    console.log("gettttt");
    return strArr[num][num2];
}

function calculateLove() {
    var calculate = inp.value().length + inp2.value().length;

    if(inp.value().length > inp2.value().length){
        calculate += 5;
    }
    else{
        calculate += 3;
    }

    calculate *= 84;

    calculate /= (10 + inp2.value().length);

    if(calculate > 100){
        calculate = 100;
    }
    else{
        calculate = Math.round(calculate);
    }

    return calculate;
}


function calculateLove2() {
first = inp.value().toUpperCase();
firstlength = inp.value().length;
second = inp2.value().toUpperCase();
secondlength =  inp2.value().length;

var LoveCount=0;

for (Count=0; Count < firstlength; Count++) {

    letter1=first.substring(Count,Count+1);

    // if (letter1=='I') LoveCount+=2; 
    if (letter1=='L') LoveCount+=2; 
    if (letter1=='O') LoveCount+=2; 
    if (letter1=='V') LoveCount+=2;
    if (letter1=='E') LoveCount+=2; 
    // if (letter1=='Y') LoveCount+=3; 
    // if (letter1=='O') LoveCount+=1;

    if (letter1=='K') LoveCount+=3;
    if (letter1=='E') LoveCount+=3;
    if (letter1=='T') LoveCount+=3;
    if (letter1=='A') LoveCount+=2;
    if (letter1=='O') LoveCount+=2;
    if (letter1=='I') LoveCount+=1;
    if (letter1=='N') LoveCount+=1;
}


for (Count=0; Count < secondlength; Count++) {
    letter2=second.substring(Count,Count+1);
    // if (letter2=='I') LoveCount+=2;
    if (letter2=='L') LoveCount+=2;
    if (letter2=='O') LoveCount+=2; 
    if (letter2=='V') LoveCount+=2; 
    if (letter2=='E') LoveCount+=2;
    // if (letter2=='Y') LoveCount+=3;
    // if (letter2=='O') LoveCount+=1;
    // if (letter2=='U') LoveCount+=3;

    if (letter2=='K') LoveCount+=3;
    if (letter2=='E') LoveCount+=3;
    if (letter2=='T') LoveCount+=3;
    if (letter2=='A') LoveCount+=2;
    if (letter2=='O') LoveCount+=2;
    if (letter2=='I') LoveCount+=1;
    if (letter2=='N') LoveCount+=1;
}

amount=0;

if (LoveCount> 0) amount=  5-((firstlength+secondlength)/2)
if (LoveCount> 2) amount= 10-((firstlength+secondlength)/2)
if (LoveCount> 4) amount= 20-((firstlength+secondlength)/2)
if (LoveCount> 6) amount= 30-((firstlength+secondlength)/2)
if (LoveCount> 8) amount= 40-((firstlength+secondlength)/2)

if (LoveCount>10) amount= 50-((firstlength+secondlength)/2)

if (LoveCount>12) amount= 60-((firstlength+secondlength)/2)
if (LoveCount>14) amount= 70-((firstlength+secondlength)/2)
if (LoveCount>16) amount= 80-((firstlength+secondlength)/2)
if (LoveCount>18) amount= 90-((firstlength+secondlength)/2)
if (LoveCount>20) amount=100-((firstlength+secondlength)/2)
if (LoveCount>22) amount=110-((firstlength+secondlength)/2)
if (firstlength==0 || secondlength==0) amount= 0;
if (amount < 0) amount= 0;
if (amount >100) amount=100;

console.log("amount", amount);
return Math.round(amount);
}


// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
