let front = {};
let back = {};

function preload() {
  front = loadImage('https://images-na.ssl-images-amazon.com/images/I/61QWr3PEUTL.jpg');
  back = loadImage('https://vignette.wikia.nocookie.net/yugioh/images/e/e5/Back-EN.png/revision/latest?cb=20100726082133');
}

function setup() {
  createCanvas(600, 900, WEBGL);
}

function draw() {
  background("white");

  push();
  let rotation = (frameCount * 0.01) % (2 * PI);
  if ((rotation > HALF_PI) && (rotation < (3 * HALF_PI))) {
    rotateY(rotation + PI);
    texture(back);
  }
  else {
    rotateY(rotation);
    texture(front);
  }
  plane(342, 500);
  pop();
}
