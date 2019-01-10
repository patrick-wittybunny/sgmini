var radius = 200;
var bg;
var texture_8ball;
var alpha = 0;
var beta = 0;
var gamma = 0;
var count = 0;
var total = 0;
var pRotationXY = 0;
var theta = {};
var dTheta = 0;
var scaleXY = 0;
var triangleRotation = 0;
var turnCount = 0;
var button;
var shakeStatus = 0;
var pseudoAccX = 0;
var pseudoAccY = 0;
var targetPseudoAccX = 0;
var targetPseudoAccY = 0;
var dPseudoAccX = 0;
var dPseudoAccY = 0;

var answer = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes - definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful.",
];
var answerIndex = (Math.random() * answer.length) | 0;

function preload() {
    bg = loadImage("assets/bg.jpg");
    triangle = loadImage("assets/triangle.png");
    texture_8ball = loadImage("assets/8ball.jpg");
}

function setup() {
    createCanvas(600, 900, WEBGL);
    mouseRate = HALF_PI / radius;
    triangleRotation = -0.11 * HALF_PI + Math.random() * 0.22 * HALF_PI;
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

    //ball
    push();
        if (total < 3) {
            if (!mouseIsPressed && shakeStatus == 0) {
                theta = {x: accelerationY * 0.03, y: -HALF_PI + accelerationX * 0.03}
            }
            else if (!mouseIsPressed && shakeStatus != 0) {
                theta = {x: pseudoAccY * 0.03, y: -HALF_PI + pseudoAccX * 0.03}
                if (shakeStatus == 1 && Math.abs(pseudoAccX - targetPseudoAccX) > Math.abs(dPseudoAccX)) {
                    pseudoAccX += dPseudoAccX;
                    pseudoAccY += dPseudoAccY;
                    console.log(1, pseudoAccX, targetPseudoAccX, dPseudoAccX);
                }
                else if (shakeStatus != 0){
                    if (shakeStatus == 1) {
                        shakeStatus = -1;
                    }
                    pseudoAccX -= dPseudoAccX;
                    pseudoAccY -= dPseudoAccY;
                    console.log(-1, pseudoAccX, dPseudoAccX);

                    if (Math.abs(pseudoAccX) < Math.abs(dPseudoAccX)) {
                        shakeStatus = 0;
                    }
                }
            }
            else if (Math.abs(mouseY - 0.5 * height) < 0.35 * height) {
                theta = {x: -(mouseY - 0.5 * height) * mouseRate, y: -HALF_PI + (mouseX - 0.5 * width) * mouseRate};
                let mouseDrag = {sum: theta.x + theta.y + HALF_PI, absSum: Math.abs(theta.x) + Math.abs(theta.y + HALF_PI)};
                if (mouseDrag.absSum > 0.71 * HALF_PI && mouseDrag.sum * pRotationXY <= 0) {
                    pRotationXY = mouseDrag.sum < 0 ? -1 : 1;
                }
            }
            rotateX(theta.x);
            rotateY(theta.y);
        }
        else if (Math.abs(theta.x - PI) > Math.abs(dTheta.x)){
            rotateX(theta.x);
            rotateY(theta.y);
            theta.x += dTheta.x;
            theta.y += dTheta.y;
        }
        else {
            rotateX(PI);
            rotateY(-HALF_PI);
        }
        // rotateZ(-0.1 * beta);
        // rotateY(-0.1 * gamma);
        texture(texture_8ball);
        sphere(radius);
    pop();

    if (total >= 3 && Math.abs(theta.x - PI) <= Math.abs(dTheta.x)) {
        push();
            translate(0, 0, 2 * radius);
            rotateZ(triangleRotation);
            fill(123, 12, 42, 128);
            texture(triangle);
            plane(108 * scaleXY, 94 * scaleXY);
            if (scaleXY < 1) {
                scaleXY += 1/8;
                // dRotation +=
            }
        pop();
    }

    //lighting
    pointLight(255, 255, 255, 0, 0, (2 + 8 * scaleXY) * radius);
    pointLight(255, 255, 255, 0, 0, (2 + 8 * scaleXY) * radius);
    pointLight(255, 255, 255, 0, 0, (2 + 8 * scaleXY) * radius);
    pointLight(255, 255, 255, 0, 0, (2 + 8 * scaleXY) * radius);
}

function pseudoShake(){
    pseudoAccX = 0;
    pseudoAccY = 0;
    targetPseudoAccX = -50 + 100 * Math.random();
    targetPseudoAccY = -50 + 100 * Math.random();
    dPseudoAccX = targetPseudoAccX / 6;
    dPseudoAccY = targetPseudoAccY / 6;
    shakeStatus = 1;
}

function deviceTurned(e) {
    console.log(turnAxis);
  if (turnAxis === 'X' || turnAxis === undefined) {
      ++turnCount;
      if (turnCount >= 2 || turnAxis === undefined) {
          scaleXY = 0;
          theta = {x: 0, y: -HALF_PI}
          dTheta = {x: (PI - theta.x)/60, y: (-HALF_PI - theta.y)/60};
          total = 3;
      }
  }
}
// accelerometer Data
// window.addEventListener('deviceorientation', function(e) {
//   alpha = isFinite(e.alpha) ? e.alpha : 0;
//   beta = isFinite(e.beta) ? e.beta : 0;
//   gamma = isFinite(e.gamma) ? e.gamma : 0;
// });
