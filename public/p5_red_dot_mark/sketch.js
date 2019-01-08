var canvas_width = 600, canvas_height = 900;
var curr_radius, currX, currY;
var ellipse_radius = 200, ellipseX = 300, ellipseY = 450;
var timer = 10, score = 0;
var is_over_box, is_game_over = false;
var has_started = false;
var has_drawn = false;

function preload() {
    try_again_button = loadImage("assets/try_again.png")
}

function setup() {
    createCanvas(canvas_width, canvas_height);
    startGame();
}

function draw() {
    if(has_started) {
        background(51);
        drawCircle();
        fill("white");
        textAlign(CENTER, CENTER);
        textSize(100);
        text("TIME: " + timer, 300, 850);
        text("SCORE: " + score, 300, 50);

        if (frameCount % 60 == 0 && timer > 0) {
            timer --;
        }
        if (timer == 0) {
            text("GAME OVER", 300, 450);
            image(try_again_button, 200, 550);
            is_game_over = true;
            if(mouseX >= 200 && mouseX <= 400 && mouseY >= 550 && mouseY <= 580) {
                is_over_box = true;
            } else {
                is_over_box = false;
            }
        }
    }
}

function drawCircle() {
    if(!has_drawn) {
        ellipse_radius = random(20, 50);
        ellipseX = random(10 + ellipse_radius, canvas_width - ellipse_radius - 10);
        ellipseY = random(100 + ellipse_radius, canvas_height - ellipse_radius - 100);

        curr_radius = ellipse_radius;
        currX = ellipseX;
        currY = ellipseY;

        ellipseMode(RADIUS);
        fill('red');
        ellipse(ellipseX, ellipseY, ellipse_radius);
        has_drawn = true;
    } else {
        ellipseMode(RADIUS);
        fill('red');
        ellipse(currX, currY, curr_radius);
    }
}

function mousePressed() {
    let d = dist(ellipseX, ellipseY, mouseX, mouseY);
    if(d <= ellipse_radius && timer != 0) {
        if(has_started) {
            score++;
        }
        has_started = true;
        has_drawn = false;
        drawCircle();
    } else if(is_over_box && is_game_over) {
        startGame();
    }
}

function startGame() {
    ellipse_radius = 200, ellipseX = 300, ellipseY = 450;
    timer = 10;
    score = 0;
    has_started = false;
    has_drawn = false;
    is_game_over = false;
    background(51);

    ellipseMode(RADIUS);
    fill('red');
    ellipse(ellipseX, ellipseY, ellipse_radius);

    fill("white");
    textAlign(CENTER, CENTER);

    textSize(100);
    text("TIME: " + timer, 300, 850);
    text("SCORE: " + score, 300, 50);

    textSize(150);
    text("PLAY", 300, 450)
}
