var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var ball;
var ground;
var obstacles = [];
var blocks = [];
var side_blocks = [];
var prizes = ["YES", "NO", "YES", "MAYBE", "NO", "YES", "NO"];
var canvas_width = 600;
var canvas_height = 900;
var result = 7;
var hasResult = false;
var start = false;
var overlay_key;
var overlay;
var hand;

function preload() {
    overlay_key = loadImage('images/overlay.png');
}

function setup() {
    preload();
    createCanvas(canvas_width, canvas_height);
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 1.5;

    createObstacles();
    createResultBlocks();
    createSideBlocks();
    ground = new Ground();

    // for(var i = 0; i < result; i++) {
    //     // prizes.push(Math.floor(Math.random() * 500) + 100);
    // }

    hand = createSprite(canvas_width * 0.5, 135, 96, 89);
    hand.addAnimation("animate", 'images/hand1.png', 'images/hand2.png');
    hand.animation.frameDelay = 8;
    hand.scale = 0.75;

    textAlign(CENTER);
    textSize(40);
}

function createResultBlocks() {
    for(var i = 0; i < result + 1; i++) {
        var res = new Block(i * (canvas_width / result), i == 0 || i == result ? canvas_height * 0.569 : canvas_height * 0.955, i == 0 || i == result ? true : false);
        blocks.push(res);
    }
}

function createObstacles() {
    var adjust = 0;
    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < ((i % 2 == 1) ? 6 : 7); j++) {
            var obs = new Obstacle(90 + (j * 70) + (adjust * 35), 185 + (i * 70));
            obstacles.push(obs);
        }
        adjust += 1;
        adjust = adjust > 1 ? 0 : 1;
    }
}

function createSideBlocks() {
    for(var i = 0; i < 8; i++) {
        if(i < 4) {
            var blck = new SideBlock(canvas_width * 0.00525, canvas_height * 0.285 + (i * 140), false);
            side_blocks.push(blck);
        }
        else {
            var blck = new SideBlock(canvas_width * 0.9915, canvas_height * 0.285 + ((i % 4) * 140), true);
            side_blocks.push(blck);
        }
    }
}

function draw() {
    background("#21215b");

    Engine.update(engine);
    if(start) {
        ball.update();
    }
    else {
        // animation(hand_animation, canvas_width * 0.85, 75);
    }

    if(!start && mouseIsPressed) {
        start = true;
        hand.remove();
        ball = new Ball(/*Math.floor(Math.random() * (canvas_width - 100)) + 50*/mouseX, 50);
    }

    if(start && !hasResult && ball.body.position.y >= 870) {
        hasResult = true;
        console.log(prizes[(Math.floor(ball.body.position.x / (canvas_width / result)))]);
        // start = false;

        // overlay = createSprite(0, 0);
        // overlay.addImage(overlay_key);
        overlay = createSprite(canvas_width * 0.5, canvas_height * 0.5, canvas_width, canvas_height);
        overlay.addImage(overlay_key);
    }

    for(var i = 0; i < obstacles.length; i++) {
        obstacles[i].update();
    }

    for(var i = 0; i < blocks.length; i++) {
        blocks[i].update();
    }

    for(var i = 0; i < side_blocks.length; i++) {
        side_blocks[i].update();
    }

    ground.update();

    drawSprites();
    drawWords();
}

function drawWords() {
    fill("#ffff00");
    text("Does your crush like you back?", canvas_width * 0.5, 100);

    for(var i = 0; i < result; i++) {
        fill("#ff0000");
        textSize(20);
        text(prizes[i], (i * (canvas_width / result)) + (canvas_width / result * 0.5), canvas_height * 0.965);
    }

    if(hasResult) {
        textSize(100);
        // text("YOU WON", canvas_width * 0.5, canvas_height * 0.475);
        text(prizes[(Math.floor(ball.body.position.x / (canvas_width / result)))] + " " + (prizes[(Math.floor(ball.body.position.x / (canvas_width / result)))] == "YES" ? ":D" : prizes[(Math.floor(ball.body.position.x / (canvas_width / result)))] == "NO" ? ":'(" : ";)"), canvas_width * 0.5, canvas_height * 0.535);
    }
}