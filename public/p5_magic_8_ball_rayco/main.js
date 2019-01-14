var radius = 200;
var bg;
var title;
var ball;
var isTurned = false;
var pRotationXY = 0;
var theta = {};
var dTheta = 0;
var answer = [];
var answerScale = 0;
var answerRotation = 0;
var turnCount = 0;
var shakeButton;
var turnButton;
var pseudoAcc = {status: 0, x: 0, y: 0, targetX: 0, targetY: 0, dx: 0, dy: 0};
var center = {};
var answerTexture;
var input;
var title_plane;
var newAccelerationX, newAccelerationY;

function preload() {
    bg = loadImage("assets/bg.jpg");
    for (var i = 0; i < 20; i++) {
        answer.push(loadImage("assets/answer"+i+".jpg"));
    }
    title = loadImage("assets/title.png");
    ball = loadImage("assets/ball.jpg");
}

function setup() {
    createCanvas(600, 900, WEBGL);
    mouseRate = HALF_PI / radius;

    input = createInput();
    input.style('font-size', '24px');
    input.position(0.5 * width - 200, 0.8 * height);
    input.elt.maxLength = 36;
    input.elt.placeholder = "Ask a question...";
    input.elt.style.textAlign = "center";
    // input.elt.style = "text-align: center";

    shakeButton = createButton('SHAKE');
    shakeButton.position(0.5 * width - 100 - 25, 0.9 * height);
    shakeButton.mousePressed(pseudoShake);

    turnButton = createButton('TURN OVER');
    turnButton.position(0.5 * width + 0 + 25, 0.9 * height);
    turnButton.mousePressed(deviceTurned);
}

function draw(){
    clear();
    background(128);

    //background
    push();
        texture(bg);
        plane(width, height);
    pop();

    //title
    push();
        translate(createVector(0, -0.35 * height, 0));
        // translate(0, -0.35 * height, 0);
        texture(title);
        title_plane = plane(577, 144);
        // console.log(title_plane);
    pop();

    //ball
    push();
        if (!isTurned) {
            // console.log(0);
            if (!mouseIsPressed && pseudoAcc.status == 0) {
                //device is shaken
                newAccelerationX = 2.074434e-16 + 0.3333333 * accelerationX - 1.037217e-18 * Math.pow(accelerationX, 2) + 0.001666667 * Math.pow(accelerationX, 3);
                newAccelerationY = 2.074434e-16 + 0.3333333 * accelerationY - 1.037217e-18 * Math.pow(accelerationY, 2) + 0.001666667 * Math.pow(accelerationY, 3);
                theta = {x: newAccelerationY * 0.03, y: -HALF_PI + newAccelerationX * 0.03}
            }
            else if (pseudoAcc.status != 0) {
                //shake button is pressed
                theta = {x: pseudoAcc.y * 0.03, y: -HALF_PI + pseudoAcc.x * 0.03}
                if (pseudoAcc.status == 1 && Math.abs(pseudoAcc.x - pseudoAcc.targetX) > Math.abs(pseudoAcc.dx)) {
                    pseudoAcc.x += pseudoAcc.dx;
                    pseudoAcc.y += pseudoAcc.dy;
                }
                else if (pseudoAcc.status != 0){
                    if (pseudoAcc.status == 1) {
                        pseudoAcc.status = -1;
                        pseudoAcc.dx = (-pseudoAcc.x) / 8;
                        pseudoAcc.dy = (-pseudoAcc.y) / 8;
                    }
                    pseudoAcc.x += pseudoAcc.dx;
                    pseudoAcc.y += pseudoAcc.dy;
                    if (Math.abs(pseudoAcc.x) < Math.abs(pseudoAcc.dx)) {
                        pseudoAcc.status = 0;
                        pseudoAcc.x = 0;
                        pseudoAcc.y = 0;
                    }
                }
            }
            else {
                //mouse is dragged
                theta = {x: -(mouseY - center.y) * mouseRate, y: -HALF_PI + (mouseX - center.x) * mouseRate};
                let mouseDrag = {sum: theta.x + theta.y + HALF_PI, absSum: Math.abs(theta.x) + Math.abs(theta.y + HALF_PI)};
                if (mouseDrag.absSum > 0.71 * HALF_PI && mouseDrag.sum * pRotationXY <= 0) {
                    pRotationXY = mouseDrag.sum < 0 ? -1 : 1;
                }
            }
            rotateX(theta.x);
            rotateY(theta.y);
        }
        else if ((Math.abs(theta.x - PI) > Math.abs(dTheta.x) && turnCount == -2) || (Math.abs(theta.x) > Math.abs(dTheta.x) && turnCount == 0)){
            // console.log(1);
            // ball is turning over
            rotateX(theta.x);
            rotateY(theta.y);
            theta.x += dTheta.x;
            theta.y += dTheta.y;
        }
        else {
            // ball has been turned over
            // console.log(2, Math.floor(0.5 * turnCount));
            rotateX(-2 * PI - 3 * Math.floor(0.5 * turnCount) * PI);
            rotateY(-HALF_PI);
        }
        texture(ball);
        sphere(radius, 24, 24);
    pop();

    if (isTurned && Math.abs(theta.x - PI) <= Math.abs(dTheta.x)) {
        push();
            translate(0, 0, radius);
            rotateZ(answerRotation);
            fill(123, 12, 42, 128);
            texture(answerTexture);
            plane(115 * answerScale, 115 * answerScale);
            if (answerScale < 1) {
                answerScale += 1/15;
            }
        pop();
    }
    pointLight(255, 255, 255, 0, 0, 550);
    pointLight(255, 255, 255, 0, 0, 550);
    pointLight(255, 255, 255, 0, 0, 550);
    pointLight(255, 255, 255, 0, 0, 550);

    // ambientLight(196, 196, 196);
    // pointLight(255, 255, 255, mouseX - height / 2, mouseY - width / 2, 3 * radius);
    // pointLight(255, 255, 255, mouseX - height / 2, mouseY - width / 2, 3 * radius);
    // pointLight(255, 255, 255, mouseX - height / 2, mouseY - width / 2, 3 * radius);
    // pointLight(255, 255, 255, mouseX - height / 2, mouseY - width / 2, 3 * radius);
}

function pseudoShake(){
    if (pseudoAcc.x == 0) {
        pseudoAcc.targetX = -60 + 2*60 * Math.random();
        pseudoAcc.targetY = -60 + 2*60 * Math.random();
    }
    else {
        pseudoAcc.targetX = -pseudoAcc.targetX - 0.5*60 + 2*0.5*60 * Math.random();
        pseudoAcc.targetY = -pseudoAcc.targetY - 0.5*60 + 2*0.5*60 * Math.random();
    }
    pseudoAcc.dx = (pseudoAcc.targetX - pseudoAcc.x) / 8;
    pseudoAcc.dy = (pseudoAcc.targetY - pseudoAcc.y) / 8;
    pseudoAcc.status = 1;
    isTurned = false;
}

function deviceTurned() {
  if (turnAxis === 'X' || turnAxis === undefined) {
      ++turnCount;
      if (turnAxis === undefined) {
          ++turnCount;
      }
      if (turnCount >= 2 && Math.abs(theta.x - PI) > PI / 30) {
          answerTexture = answer[((Math.random() * answer.length) | 0)];
          answerRotation = -0.11 * HALF_PI + Math.random() * 0.22 * HALF_PI;
          answerScale = 0;
          if (isTurned) {
              theta.x = 0;
          }
          dTheta = {x: (PI - theta.x)/30, y: (-HALF_PI - theta.y)/30};
          isTurned = true;
          turnCount = -2;
      }
      else if (turnCount >= 0 && turnCount < 2 && Math.abs(theta.x) > PI / 30) {
          answerScale = 0;
          dTheta = {x: -theta.x/30, y: (-HALF_PI - theta.y)/30};
          isTurned = true;
          turnCount = 0;
      }
  }
}

function mousePressed() {
    center = {x: mouseX, y: mouseY};
}
