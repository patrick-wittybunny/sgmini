var worldObjects = [];
var gachaMachine;
var images = {};
function setup(){
  // img = loadImage(source)
  createCanvas(600, 900, WEBGL);

  images.up = loadImage('assets/up.png');
  images.down = loadImage('assets/down.png');
  images.wow = loadImage('assets/wow.png');

  images.balls = [];
  images.balls.push(loadImage('assets/balls/jolteon.png'));
  images.balls.push(loadImage('assets/balls/piplup.png'));
  images.balls.push(loadImage('assets/balls/vulpix.png'));
  images.balls.push(loadImage('assets/balls/jigglypuff.png'));

  gachaMachine = new gachaMachine();
  customCamera = new customCamera();
  worldObjects.push(gachaMachine);
  // worldObjects.push(customCamera);
}
function draw(){
  background(255);
  for(var object of worldObjects){
    object.update();
    object.show();
  }
}

function gachaMachine(){
  this.buttonKey = images.down;
  this.buttonPressed = false;
  this.buttonInput = true;

  this.initX = 900;
  this.initZ = -900;

  this.x = this.initX;
  this.y = 0;
  this.z = this.initZ;

  this.gachaBalls = [];
  
  this.angle = 0.5;

  this.width = width;
  this.height = height;
  this.depth = width;

  var r = 100;
  var maxX = Math.floor(0.8 * this.width / (2 * r));
  var maxY = Math.floor(0.8 * this.height / (2 * r));
  var maxZ = Math.floor(0.8 * this.depth / (2 * r));
  for(var x = 0; x < maxX; x++){
    for(var y = 0; y < maxY; y++){ 
      for(var z = 0; z < maxZ; z++){ 
        if(random() < 0.9){
          var ball = new gachaBall();
          ball.r = 100;
          ball.x = -0.4 * this.width + (x + 0.5) * 0.8 * this.width/maxX + random(ball.r - 0.5 * 0.8 * this.width/maxX, 0.5 * 0.8 * this.width/maxX - ball.r);
          ball.y = -0.4 * this.height + (y + 0.5) * 0.8 * this.height/maxY + random(ball.r - 0.5 * 0.8 * this.height/maxY, 0.5 * 0.8 * this.height/maxY - ball.r) + random(0.5 * ball.r, 1.5 * ball.r);
          ball.z = -0.4 * this.depth + (z + 0.5) * 0.8 * this.depth/maxZ + random(ball.r - 0.5 * 0.8 * this.depth/maxZ, 0.5 * 0.8 * this.depth/maxZ - ball.r);
          this.gachaBalls.push(ball);

          // if(random() < 0.9){
          //   var attempts = 0;
          //   var valid = true;
          //   var tempX = 0;
          //   var tempY = 0.4 * this.height - random(100, 300) - y * 500;
          //   var tempZ = 0;
          //   do{
          //     attempts++;
          //     if(attempts > 50){
          //       break;
          //     }
          //     tempX = random(-0.4 * this.width + 100, 0.4 * this.width - 100);
          //     tempZ = random(-0.4 * this.depth + 100, 0.4 * this.depth - 100);
          //     for(var otherBall of this.gachaBalls){
          //       if((tempX - otherBall.x) ** 2 + (tempY - otherBall.y) ** 2  + (tempZ - otherBall.z) ** 2 < 100 ** 2){
          //         valid = false;
          //         break;
          //       }
          //     }
          //   } while(!valid)
          //   if(valid){
          //     var ball = new gachaBall();
          //     ball.r = 100;
          //     ball.x = tempX;
          //     ball.y = tempY;
          //     ball.z = tempZ;
          //     this.gachaBalls.push(ball);
          //   }
          // }
        }
      }
    }
  }
  this.ready = false;
  this.releasingBall = false;

  this.update = function(){
    if(!this.ready){
      this.x -= 0.025 * this.initX;
      this.z -= 0.025 * (this.initZ + 0.1 * this.depth);
      this.angle -= 0.025 * 0.5;
      if(this.x <= 0 ){
        this.ready = true;
      }
    }
    if(this.releasingBall){
      this.releasingBall.update();
      if(this.releasingBall.finished){
        this.releasingBall = false;
        this.buttonInput = true;
      }
    }
  } 

  this.show = function(){
    rotateY(this.angle);
    
    for(var ball of this.gachaBalls){
      if(this.shakesToDo > 0){
        ball.shakeX = random(-15, 5);
        ball.shakeY = random(-15, 5);
        ball.shakeZ = random(-15, 5);
      }
      ball.update();
      ball.show(this.x, this.y, this.z);
    }

    if(this.shakesToDo > 0){
      this.shakesToDo--;
      if(this.shakesToDo == 0){
        for(var ball of this.gachaBalls){
          ball.shakeX = 0;
          ball.shakeY = 0;
          ball.shakeZ = 0;
        } 
        this.releasingBall = new gachaBall(true);
        this.releasingBall.x = -0.15 * this.width;
        this.releasingBall.y = 0.2 * this.height;
        this.releasingBall.z = 0.41 * this.depth;
      }
    }

    if(!this.ready){
      //BOTTOM PART
      push();
      stroke(0);
      fill(255, 255, 0);
      
      beginShape();
      vertex(this.x - 0.4 * this.width, this.y + 0.4 * this.height, this.z - 0.4 * this.depth);
      vertex(this.x - 0.4 * this.width, this.y + 0.4 * this.height, this.z + 0.4 * this.depth);
      vertex(this.x + 0.4 * this.width, this.y + 0.4 * this.height, this.z + 0.4 * this.depth);
      vertex(this.x + 0.4 * this.width, this.y + 0.4 * this.height, this.z - 0.4 * this.depth);
      endShape(CLOSE);

      beginShape();
      vertex(this.x - 0.5 * this.width, this.y + 0.5 * this.height, this.z - 0.5 * this.depth);
      vertex(this.x - 0.5 * this.width, this.y + 0.5 * this.height, this.z + 0.5 * this.depth);
      vertex(this.x + 0.5 * this.width, this.y + 0.5 * this.height, this.z + 0.5 * this.depth);
      vertex(this.x + 0.5 * this.width, this.y + 0.5 * this.height, this.z - 0.5 * this.depth);
      endShape(CLOSE);

      beginShape();
      vertex(this.x - 0.5 * this.width, this.y + 0.5 * this.height, this.z - 0.5 * this.depth);
      vertex(this.x - 0.4 * this.width, this.y + 0.4 * this.height, this.z - 0.4 * this.depth);
      vertex(this.x - 0.4 * this.width, this.y + 0.4 * this.height, this.z + 0.4 * this.depth);
      vertex(this.x - 0.5 * this.width, this.y + 0.5 * this.height, this.z + 0.5 * this.depth);
      endShape();

      beginShape();
      vertex(this.x - 0.5 * this.width, this.y + 0.5 * this.height, this.z + 0.5 * this.depth);
      vertex(this.x - 0.4 * this.width, this.y + 0.4 * this.height, this.z + 0.4 * this.depth);
      vertex(this.x + 0.4 * this.width, this.y + 0.4 * this.height, this.z + 0.4 * this.depth);
      vertex(this.x + 0.5 * this.width, this.y + 0.5 * this.height, this.z + 0.5 * this.depth);
      endShape();


      beginShape();
      vertex(this.x + 0.5 * this.width, this.y + 0.5 * this.height, this.z + 0.5 * this.depth);
      vertex(this.x + 0.4 * this.width, this.y + 0.4 * this.height, this.z + 0.4 * this.depth);
      vertex(this.x + 0.4 * this.width, this.y + 0.4 * this.height, this.z - 0.4 * this.depth);
      vertex(this.x + 0.5 * this.width, this.y + 0.5 * this.height, this.z - 0.5 * this.depth);
      endShape();


      beginShape();
      vertex(this.x + 0.5 * this.width, this.y + 0.5 * this.height, this.z - 0.5 * this.depth);
      vertex(this.x + 0.4 * this.width, this.y + 0.4 * this.height, this.z - 0.4 * this.depth);
      vertex(this.x - 0.4 * this.width, this.y + 0.4 * this.height, this.z - 0.4 * this.depth);
      vertex(this.x - 0.5 * this.width, this.y + 0.5 * this.height, this.z - 0.5 * this.depth);
      endShape();
      
      //TOP PART
      
      beginShape();
      vertex(this.x - 0.5 * this.width, this.y - 0.5 * this.height, this.z - 0.5 * this.depth);
      vertex(this.x - 0.5 * this.width, this.y - 0.5 * this.height, this.z + 0.5 * this.depth);
      vertex(this.x + 0.5 * this.width, this.y - 0.5 * this.height, this.z + 0.5 * this.depth);
      vertex(this.x + 0.5 * this.width, this.y - 0.5 * this.height, this.z - 0.5 * this.depth);
      endShape(CLOSE);

      beginShape();
      vertex(this.x - 0.5 * this.width, this.y - 0.5 * this.height, this.z - 0.5 * this.depth);
      vertex(this.x - 0.5 * this.width, this.y - 0.4 * this.height, this.z - 0.5 * this.depth);
      vertex(this.x - 0.5 * this.width, this.y - 0.4 * this.height, this.z + 0.5 * this.depth);
      vertex(this.x - 0.5 * this.width, this.y - 0.5 * this.height, this.z + 0.5 * this.depth);
      endShape();

      beginShape();
      vertex(this.x - 0.5 * this.width, this.y - 0.5 * this.height, this.z + 0.5 * this.depth);
      vertex(this.x - 0.5 * this.width, this.y - 0.4 * this.height, this.z + 0.5 * this.depth);
      vertex(this.x + 0.5 * this.width, this.y - 0.4 * this.height, this.z + 0.5 * this.depth);
      vertex(this.x + 0.5 * this.width, this.y - 0.5 * this.height, this.z + 0.5 * this.depth);
      endShape();
      
      pop();
    }
    
    //MIDDLE PART
    push();
    stroke(0);
    fill(255, 255, 0);
    
    beginShape();
    vertex(this.x - 0.5 * this.width, this.y - 0.4 * this.height, this.z - 0.5 * this.depth);
    vertex(this.x - 0.5 * this.width, this.y - 0.4 * this.height, this.z + 0.5 * this.depth);
    vertex(this.x + 0.5 * this.width, this.y - 0.4 * this.height, this.z + 0.5 * this.depth);
    vertex(this.x + 0.5 * this.width, this.y - 0.4 * this.height, this.z - 0.5 * this.depth);
    endShape(CLOSE);

    beginShape();
    vertex(this.x - 0.4 * this.width, this.y + 0.4 * this.height, this.z - 0.4 * this.depth);
    vertex(this.x - 0.4 * this.width, this.y - 0.4 * this.height, this.z - 0.4 * this.depth);
    vertex(this.x - 0.4 * this.width, this.y - 0.4 * this.height, this.z + 0.4 * this.depth);
    vertex(this.x - 0.4 * this.width, this.y + 0.4 * this.height, this.z + 0.4 * this.depth);
    endShape();

    beginShape();
    vertex(this.x + 0.4 * this.width, this.y + 0.4 * this.height, this.z - 0.4 * this.depth);
    vertex(this.x + 0.4 * this.width, this.y - 0.4 * this.height, this.z - 0.4 * this.depth);
    vertex(this.x + 0.4 * this.width, this.y - 0.4 * this.height, this.z + 0.4 * this.depth);
    vertex(this.x + 0.4 * this.width, this.y + 0.4 * this.height, this.z + 0.4 * this.depth);
    endShape();

    beginShape();
    vertex(this.x - 0.4 * this.width, this.y + 0.4 * this.height, this.z + 0.4 * this.depth);
    vertex(this.x - 0.4 * this.width, this.y + 0.1 * this.height, this.z + 0.4 * this.depth);
    vertex(this.x + 0.4 * this.width, this.y + 0.1 * this.height, this.z + 0.4 * this.depth);
    vertex(this.x + 0.4 * this.width, this.y + 0.4 * this.height, this.z + 0.4 * this.depth);
    endShape();

    fill(200);
    beginShape();
    vertex(this.x - 0.4 * this.width, this.y + 0.4 * this.height, this.z - 0.4 * this.depth);
    vertex(this.x - 0.4 * this.width, this.y - 0.4 * this.height, this.z - 0.4 * this.depth);
    vertex(this.x + 0.4 * this.width, this.y - 0.4 * this.height, this.z - 0.4 * this.depth);
    vertex(this.x + 0.4 * this.width, this.y + 0.4 * this.height, this.z - 0.4 * this.depth);
    endShape();

    pop();

    push();
    texture(this.buttonKey);
    translate(this.x + 0.2 * this.width, this.y + 0.25 * this.height, this.z + 0.41 * this.depth);
    this.playButton = plane(150); 
    pop(); 

    push();
    fill(0);
    noStroke();
    translate(this.x - 0.15 * this.width, this.y + 0.25 * this.height, this.z + 0.41 * this.depth);
    plane(200);
    pop();

    if(this.releasingBall){
      this.releasingBall.show(this.x, this.y, this.z);
    }
  }

  this.mousePressed = function(){
    if(this.buttonInput && abs(mouseY - 745.5) < 100 && abs(mouseX - 457.5) < 97.5){
      this.buttonKey = images.up;
      this.buttonPressed = true;
    }
    else if(
      this.releasingBall && 
      this.releasingBall.banner && 
      this.releasingBall.banner.closeReady && 
      abs(mouseX - 300) <= 79 && abs(mouseY - 728) <= 79){
      this.releasingBall.banner.buttonPressed = true;
      this.releasingBall.banner.buttonImage = images.up;
    }
  }
  this.mouseReleased = function(){
    if(this.buttonPressed){
      this.buttonKey = images.down;
      this.buttonPressed = false;
      this.buttonInput = false;
      this.buttonPressed = false;
      this.shakesToDo = 15;
    }
    else if(
      this.releasingBall && 
      this.releasingBall.banner && 
      this.releasingBall.banner.buttonPressed){
        this.releasingBall.banner.close();
      }
  }
}

function customCamera(){

  this.fov = 2;
  this.cameraZ = (height/2.0) / tan(this.fov/2.0);

  this.d = 0;
  this.update = function(){
    // if(this.fov >= 0.02 && this.fov >= 1) {
    //   this.fov -= 0.01;
    // }
    // perspective(
    //   this.fov, 
    //   float(width)/float(height), 
    //   this.cameraZ/10.0, 
    //   this.cameraZ*10.0
    //   );
    // var cameraY = height/2.0;
    // var fov = mouseX/float(width) * PI/2;
    // var cameraZ = cameraY / tan(fov / 2.0);
    // var aspect = float(width)/float(height);
    // perspective(fov, aspect, cameraZ/10.0, cameraZ*10.0);
  }
  this.show = function(){

  }
}

function mousePressed(){
  if(gachaMachine && gachaMachine.ready){
    gachaMachine.mousePressed();
  }
}

function mouseReleased(){
  if(gachaMachine && gachaMachine.ready){
    gachaMachine.mouseReleased();
  }
}

function gachaBall(active){
  this.active = active? active: false;

  this.x = 0;
  this.y = 0;
  this.z = 0;

  this.r = 10;
  this.angle = 0;

  this.angleX = random(0, 180);
  this.angleY = random(0, 180);
  this.angleZ = random(0, 180);

  this.shakeX = 0;
  this.shakeY = 0;
  this.shakeZ = 0;

  if(this.active){
    this.finished = false;
    this.banner = false;
  }
  this.texture = random(images.balls);
  
  this.color = [
    [255, 0, 0], [0, 255, 0], [0, 0, 255],
    [0, 255, 255], [255, 0, 255], [255, 255, 0]
  ]
  this.color = this.color[Math.floor(Math.random() * this.color.length)];

  this.update = function(){
    if(this.active){
      if(this.r < 100){
        this.y+= 2;
        this.r+= 2; 
        this.angle-= 0.05;
        if(this.r >= 100){
          this.banner = new banner();
          this.banner.z = this.z + this.r + 1;
        }
      }
      else if(this.banner){
        this.banner.update();
        if(this.banner.finished){
          this.finished = true;
        }
      }
    }
  }
  this.show = function(parentX, parentY, parentZ){
    push();
    translate(this.x + parentX + this.shakeX, this.y + parentY + this.shakeY, this.z + parentZ + this.shakeZ);
    
    if(this.active){
      rotateX(this.angle);
    }
    else{
      rotateX(this.angleX);
    }
    rotateY(this.angleY);
    rotateZ(this.angleZ);
    stroke(10);
    texture(this.texture);
    sphere(this.r);
    pop();
    if(this.banner){
      this.banner.show(parentX, parentY, parentZ);
    }
  }
}

function banner(){
  this.x = 0;
  this.y = -75;
  this.z = 0;
  this.w = 0;
  this.finished = false;
  this.closeReady = false;
  this.buttonPressed = false;

  this.buttonImage = images.down;
  this.update = function(){
    if(this.w < 300){
      this.w+= 50;
      if(this.w >= 300){
        this.closeReady = true;
      }
    }
  }
  this.show = function(parentX, parentY, parentZ){
    push();
    translate(this.x + parentX, this.y + parentY, this.z + parentZ);

    push();
    noStroke();
    fill(0, 0, 0, 255 * 0.9);
    plane(height);
    pop();

    push();
    texture(images.wow);
    plane(this.w);
    pop();

    pop();
    if(this.w >= 300){
      push();
      translate(this.x + parentX, this.y + parentY + 250, this.z + parentZ);
      texture(this.buttonImage);
      plane(100);
      pop();
    }
  }
  this.close = function(){
    this.finished = true;
  }
}