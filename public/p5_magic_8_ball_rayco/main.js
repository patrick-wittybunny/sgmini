var radius = 200;
var bg;
var texture_8ball;
// var alpha = 0;
// var beta = 0;
// var gamma = 0;
var count = 0;
var total = 0;
var pRotationXY = 0;
var BG_COLOR = 255;
var theta = {};
var dTheta = 0;
var scaleXY = 0;
var triangleRotation = 0;

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
    triangle = loadImage("assets/triangle.jpg");
    trianglePng = loadImage("assets/triangle.png");
    texture_8ball = loadImage("assets/8ball.jpg");
    mechanical = loadFont("assets/mechanical.otf");
}

function setup() {
    createCanvas(600, 900, WEBGL);
    mouseRate = HALF_PI / radius;
    triangleRotation = -0.125 * HALF_PI + Math.random() * 0.25 * HALF_PI;
    setShakeThreshold(50);
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
            if (!mouseIsPressed) {
                theta = {x: accelerationY * 0.03, y: -HALF_PI + accelerationX * 0.03}
                rotateX(theta.x);
                rotateY(theta.y);
                // rotateZ(PI);
            }
            else{
                theta = {x: -(mouseY - 0.5 * height) * mouseRate, y: -HALF_PI + (mouseX - 0.5 * width) * mouseRate};
                rotateX(theta.x);
                rotateY(theta.y);
                let mouseDrag = {sum: theta.x + theta.y + HALF_PI, absSum: Math.abs(theta.x) + Math.abs(theta.y + HALF_PI)};
                if (mouseDrag.absSum > 0.71 * HALF_PI && mouseDrag.sum * pRotationXY <= 0) {
                    deviceShaken(true);
                    pRotationXY = mouseDrag.sum < 0 ? -1 : 1;
                }
            }
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
        // // rotateX(0.1 * beta);
        // // rotateY(- 0.1 * gamma);
        texture(texture_8ball);
        sphere(radius);
    pop();

    if (total >= 3 && Math.abs(theta.x - PI) <= Math.abs(dTheta.x)) {
        push();
            translate(0, 0, 2 * radius);
            rotateZ(triangleRotation);
            fill(123, 12, 42, 128);
            texture(trianglePng);
            plane(108 * scaleXY, 94 * scaleXY);
            if (scaleXY < 1) {
                scaleXY += 1/60;
                // dRotation +=
            }
        pop();
    }

    //lighting
    pointLight(255, 255, 255, 0, 0, 2 * (1 + 4 * scaleXY) * radius);
    pointLight(255, 255, 255, 0, 0, 2 * (1 + 4 * scaleXY) * radius);
    pointLight(255, 255, 255, 0, 0, 2 * (1 + 4 * scaleXY) * radius);
    pointLight(255, 255, 255, 0, 0, 2 * (1 + 4 * scaleXY) * radius);
}

function deviceShaken(isMouse){
    count = !isMouse ? count + 1 : count + 6;
    if (count > 6) {
        count = 0;
        ++total;
    }
    if (total >= 3){
        BG_COLOR = [64, 32, 128];
        dTheta = {x: (PI - theta.x)/60, y: (-HALF_PI - theta.y)/60};
    }
}
// accelerometer Data
// window.addEventListener('deviceorientation', function(e) {
//   alpha = isFinite(e.alpha) ? e.alpha : 0;
//   beta = isFinite(e.beta) ? e.beta : 0;
//   gamma = isFinite(e.gamma) ? e.gamma : 0;
// });
