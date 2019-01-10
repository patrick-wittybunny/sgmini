let front = {};
let back = {};
let swipe = {};
let rotation = 0.0;
let baseX = 0;
let baseRotation = 0.0;
let showSwipeIcon = true;

function preload() {
  front = loadImage('https://images-na.ssl-images-amazon.com/images/I/61QWr3PEUTL.jpg');
  back = loadImage('https://vignette.wikia.nocookie.net/yugioh/images/e/e5/Back-EN.png/revision/latest?cb=20100726082133');
  swipe = loadImage('https://static.thenounproject.com/png/145048-200.png');
}

function setup() {
  createCanvas(600, 900, WEBGL);
}

function draw() {
  background("white");

  push();
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


  if (showSwipeIcon) {
    push();
    texture(swipe);
    translate(0, 250, 200);
    plane(100);
    pop()
  }
}

function mousePressed() {
  showSwipeIcon = false;
  baseX = mouseX;
  baseRotation = rotation;
}

function mouseDragged() {
  const scaleFactor = PI / 400.0;
  const tolerance = 0.0001;
  rotation = (baseRotation + (mouseX - baseX) * scaleFactor) % (2 * PI);
  if (rotation < 0.0) {
    rotation += 2 * PI;
  }
  if (Math.abs(rotation - HALF_PI) < tolerance || Math.abs(rotation - (3 * HALF_PI)) < tolerance) {
    rotation += 0.01;
  }
}

function mouseReleased() {
  baseX = 0;
  baseRotation = 0.0;
  showSwipeIcon = true;
}
