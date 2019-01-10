// var Engine = Matter.Engine,
//     World = Matter.World,
//     Bodies = Matter.Bodies;

var engine;
var world;
var balls = [];
var ground;
var obstacles = [];
var blocks = [];
var side_blocks = [];
var questions = ["Who will you marry?", "Who is secretly in love with you?", "Who will always have your back?", "Who is secretly your worst enemy?", "Who is your smartest friend?", "Who admires you the most?", "Who would do anything for you?", "Who actually hates you?", "Who would have a baby with you?", "Who are you really in love with?", "Who is your guardian angel?", "Who is the devil on your shoulder?", "Who has the best ideas?", "Who is the life of the party?"];
var question_ask = Math.floor(Math.random() * questions.length);
var prizes = ["YES", "NO", "YES", "MAYBE", "NO", "YES", "NO"];
var canvas_width = 600;
var canvas_height = 900;
var result = 5;
var hasResult = false;
var start = false;
var overlay_key;
var celebs_keys = [];
var celebs_result = [];// = [0, 2, 4, 6, 7];
var overlay;
var hand;

function preload() {
    overlay_key = loadImage('images/overlay.png');
    celebs_keys.push(loadImage('images/AngelinaJolie.jpg'));
    celebs_keys.push(loadImage('images/JenniferLawrence.jpg'));
    celebs_keys.push(loadImage('images/NataliePortman.jpg'));
    celebs_keys.push(loadImage('images/ScarlettJohanson.jpg'));
    celebs_keys.push(loadImage('images/BradPitt.jpg'));
    celebs_keys.push(loadImage('images/DwayneJohnson.jpg'));
    celebs_keys.push(loadImage('images/LeonardoDicaprio.jpg'));
    celebs_keys.push(loadImage('images/TomCruise.jpg'));

    console.log(celebs_keys);
}

function setup() {
    // preload();
    createCanvas(canvas_width, canvas_height);
    world = createWorld(new box2d.b2Vec2(0, 0));
    // engine = Engine.create();
    // world = engine.world;
    // world.gravity.y = 1.5;

    // for(var i = 0; i < 5; i++) {
    //     var num = Math.floor(Math.random() * 8);
    //     while(celebs_result.indexOf(num) >= 0) {
    //         num = Math.floor(Math.random() * 8);
    //     }
    //     celebs_result.push(num);
    // }

    createObstacles();
    // createResultBlocks();
    // // createSideBlocks();
    // ground = new Ground();

    // hand = createSprite(canvas_width * 0.5, 190, 96, 89);
    // hand.addAnimation("animate", 'images/hand1.png', 'images/hand2.png');
    // hand.animation.frameDelay = 8;
    // hand.scale = 0.9;

    // textAlign(CENTER);
    // textSize(40);
}

function createResultBlocks() {
    for(var i = 0; i < result + 1; i++) {
        var res = new Block(i * ((canvas_width - 20) / result) + 10, i == 0 || i == result ? canvas_height * 0.635 : canvas_height * 0.9, i == 0 || i == result ? true : false);
        blocks.push(res);
        if(i < result) {
            var celeb = createSprite(i * ((canvas_width - 20) / result) + 10 + ((canvas_width - 20) / result * 0.5), canvas_height * 0.9, 150, 225);
            celeb.addImage(celebs_keys[celebs_result[i]]);
            celeb.scale = 0.65
            celebs_result.push(celeb);
        }
    }
}

function createObstacles() {
    var adjust = 0;
    for(var i = 0; i < 7; i++) {
        for(var j = 0; j < ((i % 2 == 1) ? 8 : 9); j++) {
            var obs = new Ball(39 + (j * 65) + (adjust * 32.5), 325 + (i * 57), true);
            obstacles.push(obs);
        }
        adjust += 1;
        adjust = adjust > 1 ? 0 : 1;
    }
}

// function createSideBlocks() {
//     // for(var i = 0; i < 8; i++) {
//     //     if(i < 4) {
//     //         var blck = new SideBlock(canvas_width * 0.00525, canvas_height * 0.285 + (i * 140), false);
//     //         side_blocks.push(blck);
//     //     }
//     //     else {
//     //         var blck = new SideBlock(canvas_width * 0.9915, canvas_height * 0.285 + ((i % 4) * 140), true);
//     //         side_blocks.push(blck);
//     //     }
//     // }
//     side_blocks.push(new SideBlock(canvas_width * 0.00525, canvas_height * 0.285 + (0), false));
//     // side_blocks.push(new SideBlock(canvas_width * 0.00525, canvas_height * 0.285 + (0), true));
// }

function draw() {
    background("#21215b");

    // if(mouseIsPressed) {
    //     var ball = new Box(canvas_width * 0.5, canvas_height * 0.25);
    //     balls.push(ball);
    // }

    let timeStep = 1.0 / frameRate();
    // 2nd and 3rd arguments are velocity and position iterations
    world.Step(timeStep, 10, 10);

    // for(var i = 0; i < balls.length; i++) {
    //     balls[i].update();
    // }

    // Engine.update(engine);
    if(start) {
        ball.update();
    }

    if(!start && mouseIsPressed && mouseY > 110 && mouseY < 245) {
        start = true;
        // hand.remove();
        ball = new Ball(mouseX, mouseY, false);
    }

    // if(start && !hasResult && ball.body.position.y >= 870) {
    //     hasResult = true;
    //     console.log(prizes[(Math.floor(ball.body.position.x / (canvas_width / result)))]);
    //     overlay = createSprite(canvas_width * 0.5, canvas_height * 0.5, canvas_width, canvas_height);
    //     overlay.addImage(overlay_key);
    // }

    for(var i = 0; i < obstacles.length; i++) {
        obstacles[i].update();
    }

    // for(var i = 0; i < blocks.length; i++) {
    //     blocks[i].update();
    // }

    // for(var i = 0; i < side_blocks.length; i++) {
    //     side_blocks[i].update();
    // }

    // ground.update();



    drawSprites();
    drawWords();
}

function drawWords() {
    fill("#ffff00");
    text(questions[question_ask], canvas_width * 0.5, 100);

    // for(var i = 0; i < result; i++) {
    //     fill("#ff0000");
    //     textSize(20);
    //     text(prizes[i], (i * (canvas_width / result)) + (canvas_width / result * 0.5), canvas_height * 0.965);
    // }

    if(hasResult) {
        textSize(100);
        text(prizes[(Math.floor(ball.body.position.x / (canvas_width / result)))] + " " + (prizes[(Math.floor(ball.body.position.x / (canvas_width / result)))] == "YES" ? ":D" : prizes[(Math.floor(ball.body.position.x / (canvas_width / result)))] == "NO" ? ":'(" : ";)"), canvas_width * 0.5, canvas_height * 0.535);
    }
}