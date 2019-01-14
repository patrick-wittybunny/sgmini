
let content = null;
let btn_1 = null;
let btn_1_default = null;
let btn_1_pressed = null;
let btn_2_default = null;
let btn_2_pressed = null;

let cookie_uncracked = null;
let cookie_cracked = null;
let cookie_gif = null;

let bg = null;
let cookie = null;

let text_font = null;


function preload() {
    content = loadJSON('content.json');
    btn_1_default = loadImage('assets/open_cookie.png');
    btn_1_pressed = loadImage('assets/open_cookie_pressed.png');
    btn_2_default = loadImage('assets/another_cookie.png');
    btn_2_pressed = loadImage('assets/another_cookie_pressed.png');
    cookie_uncracked = loadImage('assets/fortunecookie_frame1.png');
    cookie_cracked = loadImage('assets/fortunecookie_last_frame.png');
    bg = loadImage('assets/background.jpg');
    
    cookie_gif = new Gif('assets/cookie_animation');
    cookie_gif.preload(5);

    text_font = loadFont('assets/Young.ttf');
}

function setup() {
    createCanvas(600, 900);
    content = content.fortunes[`${0}`];
    cookie_gif.ready = true;
    cookie_gif.x = width/2;
    cookie_gif.y = height / 2 + 50;

    cookie = new Cookie(width / 2, height / 2 + 50, cookie_uncracked, cookie_cracked, cookie_gif);
    let self = this;
    btn_1 = new Button(width / 2, cookie.y + 250,  btn_1_default, btn_1_pressed, function () {
        cookie.crack(function() {
            btn_1.hide = true;
            btn_2.hide = false;
            btn_2.reset();
        }, self);
    }, this);

    btn_2 = new Button(width / 2, cookie.y + 250, btn_2_default, btn_2_pressed, function () {
        setTimeout(function() {
            cookie.reset();
            btn_1.hide = false;
            btn_2.hide = true;
            btn_1.reset();
        }, 200);
    }, this);
    btn_2.hide = true;

    textFont(text_font);
    // cookie_gif2 = createImg('assets/fortunecookie_animated.gif');
}

function draw() {
    background(255);
    push();
    imageMode(CENTER);
    translate(width/ 2, height / 2);
    image(bg, 0, 0, width, height);
    pop();

    // cookie_gif.display();
    cookie.display();

    if(!btn_1.hide) {
        btn_1.display();
    }
    if(!btn_2.hide) {
        btn_2.display();
    }
}

function mousePressed(e) {
    if (!btn_1.hide) {
        btn_1.checkPressed();
    }
    if (!btn_2.hide) {
        btn_2.checkPressed();
    }
    // btn_2.checkPressed();

}

function scale() {
    // console.log("scaling");
}

function windowResized() {
    // console.log("here");
    // resizeCanvas(windowWidth, windowHeight);
    // console.log(width,height);
}
