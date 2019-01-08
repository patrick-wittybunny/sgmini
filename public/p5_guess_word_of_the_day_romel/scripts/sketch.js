var lines = [];
var letters = [];
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var words = ["courage", "stellar", "calm", "inspiration", "harmony"];
var indexes = [Math.floor(Math.random() * words.length)];
var meaning = ["(n.) the ability to control fear and to be willing to deal with something that is dangerous, difficult, or unpleasant",
                "(adj.) of the stars or being outstanding",
                "(adj.) peaceful, quiet, or relaxed",
                "(n.) someone or something that gives you ideas for doing something",
                "(n.) to be in agreement or together"]
var word = words[indexes]; // max is 9 (size: 50)
var canvas_width = 600;
var canvas_height = 900;
var correct_letters = 0;
var guess_done = false;

function preload() {
    overlay_key = loadImage('images/overlay.png');
}

function setup() {
    preload();
    createCanvas(canvas_width, canvas_height);
    // engine = Engine.create();
    // world = engine.world;
    // world.gravity.y = 1.5;
    console.log(word.length);
    // for(var i = 0; i < word.length; i++) {
       createLine(); 
    // }

    textAlign(CENTER);
    
    createInputLetters();
    hoverLetter();

    // var linea = line(0, 100, 0 + 30, 100);
    // var linea = line(100, 100, 100 + 30, 100);

    // createObstacles();
    // createResultBlocks();
    // createSideBlocks();
    // ground = new Ground();

    // for(var i = 0; i < result; i++) {
    //     prizes.push(Math.floor(Math.random() * 500) + 100);
    // }

    // hand = createSprite(canvas_width * 0.85, 75, 96, 89);
    // hand.addAnimation("animate", 'images/hand1.png', 'images/hand2.png');
    // hand.animation.frameDelay = 8;

    // textAlign(CENTER);
    // textSize(75);
}

function createInputLetters() {
    for(var i = 0; i < 26; i++) {
        var letter = new Letter(i, alphabet[i]);/*text(alphabet[i], (i < 20 ? 50 : 140) + ((i % 10) * 55), i < 10 ? canvas_height * 0.8 : i < 20 ? canvas_height * 0.875 : canvas_height * 0.95);*/
        letters.push(letter);
    }
}

function createLine() {
    var size = word.length > 9 ? (550 / word.length) - 10 : 50;
    var start = (canvas_width - (word.length * (size + 15))) / 2;
    console.log(word.length);
    for(var i = 0; i < word.length; i++) {
        var line = new Line(i, word[i], start, size);
        lines.push(line);
        console.log("ASDSA");
    }
}

// function createResultBlocks() {
//     for(var i = 0; i < result + 1; i++) {
//         var res = new Block(i * (canvas_width / result), i == 0 || i == result ? canvas_height * 0.569 : canvas_height * 0.955, i == 0 || i == result ? true : false);
//         blocks.push(res);
//     }
// }

// function createObstacles() {
//     var adjust = 0;
//     for(var i = 0; i < 9; i++) {
//         for(var j = 0; j < ((i % 2 == 1) ? 6 : 7); j++) {
//             var obs = new Obstacle(90 + (j * 70) + (adjust * 35), 185 + (i * 70));
//             obstacles.push(obs);
//         }
//         adjust += 1;
//         adjust = adjust > 1 ? 0 : 1;
//     }
// }

// function createSideBlocks() {
//     for(var i = 0; i < 8; i++) {
//         if(i < 4) {
//             var blck = new SideBlock(canvas_width * 0.00525, canvas_height * 0.285 + (i * 140), false);
//             side_blocks.push(blck);
//         }
//         else {
//             var blck = new SideBlock(canvas_width * 0.9915, canvas_height * 0.285 + ((i % 4) * 140), true);
//             side_blocks.push(blck);
//         }
//     }
// }

function hoverLetter() {
    for(var i = 0; i < 26; i++) {
        if(((letters[i].x - 25) < mouseX && (letters[i].x + 25) > mouseX) && ((letters[i].y - 50) < mouseY && (letters[i].y) > mouseY) && !letters[i].done) {
            console.log(letters[i].letter);
            letters[i].done = true;
            checkWord(letters[i].letter, letters[i]);
            return true;
            break;
        }
    }
    return false;
}

function checkWord(letter, lets) {
    console.log(lines.length);
    for(var i = 0; i < lines.length; i++) {
        // console.log(i, lines[i].values, letter);

        if(lines[i].values.toLowerCase() == letter.toLowerCase() && !lines[i].done) {
            lets.included = true;
            console.log(i, lines[i].done);
            lines[i].done = true;
            correct_letters += 1;
            console.log(correct_letters, word.length);
            if(correct_letters == word.length) {
                guess_done = true;
                console.log("GUESSSSSSSSSSED");
            }
        }
    }
}

function draw() {
    background(245);
    

    // Engine.update(engine);
    // if(start) {
    //     ball.update();
    // }
    // else {
    //     // animation(hand_animation, canvas_width * 0.85, 75);
    // }

    if(mouseIsPressed && !guess_done) {
        hoverLetter();
    }

    // x = createP("Ronel");
    // x.class("asnwer");

    // if(!start && mouseIsPressed) {
    //     start = true;
    //     hand.remove();
    //     ball = new Ball(/*Math.floor(Math.random() * (canvas_width - 100)) + 50*/mouseX, 50);
    // }

    // if(start && !hasResult && ball.body.position.y >= 870) {
    //     hasResult = true;
    //     console.log(prizes[(Math.floor(ball.body.position.x / (canvas_width / result)))]);
    //     // start = false;

    //     // overlay = createSprite(0, 0);
    //     // overlay.addImage(overlay_key);
    //     overlay = createSprite(canvas_width * 0.5, canvas_height * 0.5, canvas_width, canvas_height);
    //     overlay.addImage(overlay_key);
    // }

    fill(0);
    textSize(35);
    text("GUESS YOUR", canvas_width * 0.5, 115);
    textSize(45);
    text("WORD OF THE DAY", canvas_width * 0.5, 150);
    textSize(70);

    // text("FDSGDFHFDG HHDHDGJS DJUGJRHVJ EHRGBHRGJB", 0, 500, 100, 400);

    for(var i = 0; i < letters.length; i++) {
        letters[i].draw();
    }

    for(var i = 0; i < lines.length; i++) {
        // console.log("adfd");
       lines[i].draw();
    }

    if(guess_done) {
        strokeWeight(5);
        // console.log(lines);
        line(lines[0].x, 350, lines[lines.length - 1].x + lines[lines.length - 1].size_width + 7.5, 350);
        
    }

    textSize(35);
    // rectMode(CENTER);
    textAlign(CENTER);
    text(meaning[indexes], 25, 450, 550);

    // for(var i = 0; i < blocks.length; i++) {
    //     blocks[i].update();
    // }

    // for(var i = 0; i < side_blocks.length; i++) {
    //     side_blocks[i].update();
    // }

    // ground.update();

    // drawSprites();
    // drawWords();
}

// function drawWords() {
//     fill("#ffff00");
//     text("PLINKO", canvas_width * 0.5, 100);

//     for(var i = 0; i < result; i++) {
//         fill("#ff0000");
//         textSize(25);
//         text("$" + prizes[i], (i * (canvas_width / result)) + (canvas_width / result * 0.5), canvas_height * 0.965);
//     }

//     if(hasResult) {
//         textSize(50);
//         text("YOU WON", canvas_width * 0.5, canvas_height * 0.475);
//         text("$" + prizes[(Math.floor(ball.body.position.x / (canvas_width / result)))] + "", canvas_width * 0.5, canvas_height * 0.535);
//     }
// }