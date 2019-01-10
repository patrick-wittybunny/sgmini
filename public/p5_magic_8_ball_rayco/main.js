var radius = 200;
var bg;
var title;
var texture_8ball;
var alpha = 0;
var beta = 0;
var gamma = 0;
var isTurned = false;
var pRotationXY = 0;
var theta = {};
var dTheta = 0;
var triangleScale = 0;
var lightScale = 0;
var triangleRotation = 0;
var turnCount = 0;
var button;
var pseudoShakeStatus = 0;
var pseudoAccX = 0;
var pseudoAccY = 0;
var targetPseudoAccX = 0;
var targetPseudoAccY = 0;
var dPseudoAccX = 0;
var dPseudoAccY = 0;
var center = {};
var answerLength = 20;

function preload() {
    bg = loadImage("assets/bg.jpg");
    title = loadImage("assets/title.png");
    texture_8ball = loadImage("assets/8ball.jpg");
}

function setup() {
    createCanvas(600, 900, WEBGL);
    mouseRate = HALF_PI / radius;
    // setShakeThreshold(30);

    button = createButton('SHAKE');
    button.position(0.5 * width - 100 - 25, 0.85 * height);
    button.mousePressed(pseudoShake);

    button = createButton('TURN OVER');
    button.position(0.5 * width + 0 + 25, 0.85 * height);
    button.mousePressed(deviceTurned);
}

function draw(){
    clear();

    //background
    push();
        texture(bg);
        plane(width, height);
    pop();

    //title
    push();
        translate(0, -0.35 * height, 0);
        texture(title);
        plane(540, 207);
    pop();

    //ball
    push();
        if (!isTurned) {
            if (!mouseIsPressed && pseudoShakeStatus == 0) {
                //device is shaken
                theta = {x: accelerationY * 0.03, y: -HALF_PI + accelerationX * 0.03}
            }
            else if (pseudoShakeStatus != 0) {
                //shake button is pressed
                theta = {x: pseudoAccY * 0.03, y: -HALF_PI + pseudoAccX * 0.03}
                if (pseudoShakeStatus == 1 && Math.abs(pseudoAccX - targetPseudoAccX) > Math.abs(dPseudoAccX)) {
                    pseudoAccX += dPseudoAccX;
                    pseudoAccY += dPseudoAccY;
                }
                else if (pseudoShakeStatus != 0){
                    if (pseudoShakeStatus == 1) {
                        pseudoShakeStatus = -1;
                        dPseudoAccX = (-pseudoAccX) / 8;
                        dPseudoAccY = (-pseudoAccY) / 8;
                    }
                    pseudoAccX += dPseudoAccX;
                    pseudoAccY += dPseudoAccY;
                    if (Math.abs(pseudoAccX) < Math.abs(dPseudoAccX)) {
                        pseudoShakeStatus = 0;
                        pseudoAccX = 0;
                        pseudoAccY = 0;
                    }
                }
            }
            else {//if (Math.abs(mouseY - 0.5 * height) < 0.35 * height) {
                //mouse is dragged
                theta = {x: -(mouseY - center.y) * mouseRate, y: -HALF_PI + (mouseX - center.x) * mouseRate};
                let mouseDrag = {sum: theta.x + theta.y + HALF_PI, absSum: Math.abs(theta.x) + Math.abs(theta.y + HALF_PI)};
                if (mouseDrag.absSum > 0.71 * HALF_PI && mouseDrag.sum * pRotationXY <= 0) {
                    pRotationXY = mouseDrag.sum < 0 ? -1 : 1;
                }
            }
            // else {
            //     // ball is resting
            //     // theta = {x: 0, y: -HALF_PI}
            //     // console.log(dist(mouseX, mouseY, 0, 0), radius);
            // }
            rotateX(theta.x);
            rotateY(theta.y);
        }
        else if (Math.abs(theta.x - PI) > Math.abs(dTheta.x)){
            // ball is turning over
            rotateX(theta.x);
            rotateY(theta.y);
            theta.x += dTheta.x;
            theta.y += dTheta.y;
        }
        else {
            // ball has been turned over
            rotateX(PI);
            rotateY(-HALF_PI);
        }
        // rotateZ(-0.1 * beta);
        // rotateY(-0.1 * gamma);
        texture(texture_8ball);
        sphere(radius);
    pop();

    if (isTurned && Math.abs(theta.x - PI) <= Math.abs(dTheta.x)) {
        push();
            translate(0, 0, 2 * radius);
            rotateZ(triangleRotation);
            fill(123, 12, 42, 128);
            texture(triangle);
            plane(108 * triangleScale, 94 * triangleScale);
            if (triangleScale < 1) {
                triangleScale += 1/28;
                lightScale += 1/28;
                // dRotation +=
            }
        pop();
    }

    //lighting
    // ambientLight(222);
    // pointLight(255, 255, 255, 0, 0, (2 + 8 * lightScale) * radius);
    // pointLight(255, 255, 255, 0, 0, (2 + 8 * lightScale) * radius);
    // pointLight(255, 255, 255, 0, 0, (2 + 8 * lightScale) * radius);
    // pointLight(255, 255, 255, 0, 0, (2 + 8 * lightScale) * radius);
}

function pseudoShake(){
    if (pseudoAccX == 0) {
        targetPseudoAccX = -60 + 2*60 * Math.random();
        targetPseudoAccY = -60 + 2*60 * Math.random();
    }
    else {
        targetPseudoAccX = -targetPseudoAccX - 0.5*60 + 2*0.5*60 * Math.random();
        targetPseudoAccY = -targetPseudoAccY - 0.5*60 + 2*0.5*60 * Math.random();
    }
    dPseudoAccX = (targetPseudoAccX - pseudoAccX) / 8;
    dPseudoAccY = (targetPseudoAccY - pseudoAccY) / 8;
    pseudoShakeStatus = 1;
    isTurned = false;
}

function deviceTurned() {
  if (turnAxis === 'X' || turnAxis === undefined) {
      ++turnCount;
      if (turnCount >= 2 || turnAxis === undefined) {
          triangle = loadImage("assets/triangle"+((Math.random() * answerLength) | 0)+".png");
          triangleRotation = -0.11 * HALF_PI + Math.random() * 0.22 * HALF_PI;
          triangleScale = 0;
          if (isTurned) {
              theta.x = PI;
          }
          dTheta = {x: (PI - theta.x)/60, y: (-HALF_PI - theta.y)/60};
          isTurned = true;
      }
  }
}

function mousePressed(e) {
    center = {x: mouseX, y: mouseY};
}
// // accelerometer data
// window.addEventListener('deviceorientation', function(e) {
//   alpha = isFinite(e.alpha) ? e.alpha : 0;
//   beta = isFinite(e.beta) ? e.beta : 0;
//   gamma = isFinite(e.gamma) ? e.gamma : 0;
// });
