

      var objects = [];
      var images = [];
      var slotMachine;

      preload = function() {
        // var dir = 'static/games/slots_kmf/assets/';
        var dir = 'assets/'
        images.bg = loadImage(dir + 'bg_2slot.png');
        images.icon_friend = loadImage(dir + 'icon_friend.png');
        images.icon_skull = loadImage(dir + 'icon_skull.png');
        images.icon_love = loadImage(dir + 'icon_love.png');
        images.numbers = loadImage(dir + 'number_01.png');
        images.omg = loadImage(dir + 'omg.png');
        images.popup = loadImage(dir + 'popup.png');
        images.spin_ball = loadImage(dir + 'spin_ball.png'); 
      }
      setup = function() {
        const canvas = createCanvas(600, 900);
        // canvas.parent(self.$refs.canvas);
        
        slotMachine = new slotMachine();
        objects.push(slotMachine);
        imageMode(CENTER);
      }
      draw = function() {
        translate(0.5 * width, 0.5 * height);
        for(var object of objects){
          object.update();
          object.show();
        }
      }

      function slotMachine(){
        this.x = 0;
        this.y = 0;

        this.reels = [];
        this.maxReels = 3;
        
        this.spinning = false;
        this.showPopup = false;

        this.number = [];
        this.number.push([0, 0, 0, 0])    //placeholder for 0
        this.number.push([10, 0, 38, 84]) //1
        this.number.push([10, 0, 54, 84]) //2
        this.number.push([3, 0, 55, 84])  //3
        this.number.push([2, 0, 53, 84])  //4
        this.number.push([4, 0, 55, 84])  //5
        this.number.push([3, 0, 53, 84])  //6
        this.number.push([4, 0, 53, 84])  //7
        this.number.push([2, 0, 56, 84])  //8
        this.number.push([4, 0, 51, 84])  //9
        this.number.push([2, 0, 59, 84])  //0
        for(var i = 1; i < this.number.length; i++){
          this.number[i][0] += this.number[i-1][0] + this.number[i-1][2];
        }
        this.number[0] = this.number[this.number.length - 1];
        this.number.pop();

        var center = (this.maxReels + 1)/2;
        for(var i = 0; i < this.maxReels; i++){
          var r = new reel(1 - 2 * (i%2));
          r.x = 200 * (i - center + 1);
          r.y = 173;
          r.width = 150;
          r.number = this.number;
          this.reels.push(r);
        }
        this.headers = new headers();
        this.lever = new lever();
        this.popup = new popup();
        this.lever.x = 0.5 * width;
        this.lever.y = 5;
        this.lever.height = 560;
        this.lever.width = 200;
        this.lever.updateValues();
      }

      slotMachine.prototype.update = function(){
        if(this.spinning){
          if(millis() >= this.stopAt){
            this.spinning = false;
            this.showPopup = true;
            this.popup.updateValues(this.reels);
          }
        }
        else{
          if(this.lever.pulled){
            this.spinReels()
            this.lever.pulled = false;
            this.lever.pullable = false;
          }
          else{
            if(this.showPopup){
              this.popup.update();
            }
            else if(!(this.lever.grabbed || this.lever.retracting)){
              noLoop();
            }
          }
        }
        for(var reel of this.reels){
          reel.update();
        }
        this.headers.update(this.spinning, this.lever.crankAngle);
        this.lever.update();
      }

      slotMachine.prototype.show = function(){
        push();
        image(images.bg, 0, 0, width, height, 0, 0, images.bg.width, images.bg.height);
        pop();
        for(var reel of this.reels){
          reel.show();
        }
        this.headers.show();
        this.lever.show();
        if(this.showPopup){
          this.popup.show();
        }
      }

      slotMachine.prototype.spinReels = function(){
        if(this.spinning) return;
        this.spinning = true;
        var now = millis();
        var prevStopAt = now + 1000;
        for(var i = 1; i <= this.reels.length; i++){
          var stopAt = prevStopAt + 500 + 1000 * random(0, 0.8);
          prevStopAt = stopAt;
          this.reels[i - 1].spinReel(stopAt);
          if(i == this.reels.length){
            this.stopAt = stopAt + 200;
          }
        }
      }

      slotMachine.prototype.mousePressed = function(){
        if(this.spinning) return;
        if(this.showPopup){
          this.showPopup = false;
          return;
        }
        this.lever.mousePressed();
      }
      slotMachine.prototype.mouseDragged = function(){
        this.lever.mouseDragged();
      }
      slotMachine.prototype.mouseReleased = function(){
        this.lever.mouseReleased();
      }


      function reel(direction){
        if(direction === undefined) direction = 1;
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 240;
        this.direction = direction;
        this.idleSpinVal = 50 * this.direction;
        this.spin = 0;
        this.spinV = 1 * this.direction;
        this.spinA = random(0.5, 1) * this.direction;
        this.spinning = false;
        this.spinMinBound = this.direction > 0? 0: -99;
        this.spinMaxBound = this.direction > 0? 99: 0;

        this.faceWidth = 100;
        this.faceHeight = 200;
        this.maxVisibleFaces = 3;

        this.faces =        [[0, 0], [1, 1], [3, 3], [75, 7, 5], [100, 1, 0, 0], [123, 1, 2, 3]];
        this.faceWeights =  [3, 3, 3, 3, 3, 5];
        this.topFace = floor(random(this.faces.length));
        this.faceValue = this.faces[this.topFace];
        var faceValSum = this.faceWeights.reduce(
          function(t, n){
            return t + n;
          });
        var cumVal = 0;

        for(var i = 0; i < this.faceWeights.length; i++){
          this.faceWeights[i] = cumVal + this.faceWeights[i]/faceValSum;
          cumVal = this.faceWeights[i];
        }
        this.faceWeights[this.faceWeights.length - 1] = 1;
      }
      reel.prototype.update = function(){
        if(this.spinning){
          this.spin += this.spinV;
          if(this.spin >= 100){
            this.topFace = (this.topFace == 0? this.faces.length: this.topFace) - 1;
          }
          else if(this.spin <= -100){
            this.topFace = (this.topFace == this.faces.length - 1? -1: this.topFace) + 1;
          }
          this.faceValue = this.faces[this.topFace];
          this.spin = this.spin % 100;
          this.spinV = this.spinV + this.spinA;
          if(millis() >= this.stopAt){
            this.spinning = false;
            // uncomment to rig outcomes
            // var myVal = random();
            // for(var i = 0; i < this.faceWeights.length; i++){
            //   if(myVal <= this.faceWeights[i]){
            //     this.topFace = i;
            //     this.faceValue = this.faces[i];
            //     break;
            //   }
            // }
          }
        }
        else{
          if(this.spin != this.idleSpinVal){
            this.spin = this.idleSpinVal;
            this.spinV = 1 * this.direction;
          }
        }
        
      }
      reel.prototype.show = function(){
        push();
        stroke(10);
        strokeWeight(2);
        fill(255);
        rectMode(CENTER);
        textAlign(CENTER, CENTER);
        imageMode(CENTER);
        translate(this.x, this.y);
        push();
        fill(255, 0, 0);
        var y0 = map(this.spin, this.spinMinBound, this.spinMaxBound, -1, 1);
        var h = map(abs(this.spin - this.idleSpinVal), 0, 50, 84, 0, true);
        y0 *= 0.5 * this.height;
        var x0 = 0;
        for(var i = 1; i < this.faceValue.length; i++){
          x0 +=  this.number[this.faceValue[i]][2]; 
        }
        x0 *= -0.5;
        for(var i = 1; i < this.faceValue.length; i++){
          var nval = this.number[this.faceValue[i]];
          x0 += 0.5 * nval[2];
          image(images.numbers, x0, y0, nval[2], h, nval[0], nval[1], nval[2], nval[3]);
          x0 += 0.5 * nval[2];
        }
        pop();

        pop();
      }

      reel.prototype.getValue = function(){
        this.value = this.faces[(this.upperMostColor + 1)% this.faces.length];
        return this.value;
      }

      reel.prototype.spinReel = function(stopAt){
        this.spinning = true;
        this.stopAt = stopAt;
      }

      function imageRect(img, x, y, w, h){
        if(h == 0) return;
        rect(x - 0.5 * w, y - 0.5 * h, w, h);
        image(img, x - 0.5 * w, y - 0.5 * h, w, h, 0, 0);
        
      }

      function simplifiedQuad(x, y, w1, h1, w2, h2){
        if(h2 === undefined) h2 = h1;
        if(w2 === undefined) w2 = w1;

        quad(
          x - 0.5 * w1, y - 0.5 * h1, 
          x + 0.5 * w1, y - 0.5 * h2,
          x + 0.5 * w2, y + 0.5 * h2,
          x - 0.5 * w2, y + 0.5 * h1,
          );
      }

      function lever(){
        this.x = 0;
        this.y = 0;
        this.height = 200;
        this.width = 100;
        this.pullable = true;
        this.grabbed = false;
        this.retracting = false;
        this.retractSpeed = -10;
        this.pullSpeed = -this.retractSpeed;
        this.updateValues();
      }

      lever.prototype.updateValues = function(){
        this.minBallH = -0.5 * this.height;
        this.maxBallH = 0.5 * this.height;
        this.crankAngle = 0;
        this.dCrank = this.pullSpeed;
        this.pulled = false;
        this.pullable = true;
        this.grabRadius = 80;
        this.grabCenter = {
          x: this.x + 0.5 * width + 871/27, 
          y: this.y + 0.5 * height - 0.5 * this.height
        }
      }

      lever.prototype.update = function(){
        if(this.dCrank < 0){
          this.crankAngle += this.dCrank;
          if(this.crankAngle <= 0){
            this.crankAngle = 0;
            this.dCrank = 0;
            this.pullable = true;
            this.retracting = false;
          }
        }
      }

      lever.prototype.show = function(){
        push();
        translate(this.x, this.y);
        var ballH = map(this.crankAngle, 0, 100, this.minBallH, this.maxBallH);
        image(images.spin_ball, -0.5 * images.spin_ball.width, ballH);
        pop();
      }

      lever.prototype.mousePressed = function(){
        if(this.pullable){
          if(pow(this.grabCenter.x - mouseX, 2) + 
             pow(this.grabCenter.y - mouseY, 2) <= 
             pow(this.grabRadius, 2)){
            this.grabbed = true;
            this.minDragY = mouseY;
            this.maxDragY = this.minDragY + this.height;
            loop();
          }
        }

      }
      lever.prototype.mouseDragged = function(){
        if(this.grabbed){
          this.crankAngle = map(mouseY, this.minDragY, this.maxDragY, 0, 100, true);
        }
      }
      lever.prototype.mouseReleased = function(){
        if(this.grabbed){
          this.grabbed = false;
          this.pullable = false;
          this.retracting = true;
          this.dCrank = this.retractSpeed;
          if(this.crankAngle >= 50){
            this.pulled = true;
          }
        }
      }

      function headers(){
      }
      
      headers.prototype.update = function(isSpinning, leverAngle){

      }

      headers.prototype.show = function(){

        image(images.icon_love, -205, -100);
        image(images.icon_friend, 0, -100);
        image(images.icon_skull, 205, -100);
      }

      function popup(){
        this.values = [];
      }
      popup.prototype.updateValues = function(reels){
        this.values[0] = reels[0].faceValue[0];
        this.values[1] = reels[1].faceValue[0];
        this.values[2] = reels[2].faceValue[0];
      }

      popup.prototype.update = function(){
        push();
        angleMode(DEGREES);
        this.omgWidth = images.omg.width - (1 + sin(3 * frameCount)) * 5;
        this.omgHeight = images.omg.height - (1 + sin(3 * frameCount)) * 5;
        pop();
      }
      popup.prototype.show = function(){
        push();
        translate(0, -75);
        rectMode(CENTER);
        fill(0, 0, 0, 255 * 0.5);
        rect(0, 0, width, height);
        image(images.popup, 0, 0);
        image(images.omg, 
          0, 0.5 * images.popup.height + 0.5 * images.omg.height,
          this.omgWidth, this.omgHeight);

        textAlign(LEFT, CENTER);
        textStyle(BOLD);
        textSize(25);
        fill(0);

        var myText = 'There are ';
        var x0 = -180;
        var y = -170;
        text(myText, x0 , y);
        x0 += textWidth(myText);
        push();
        fill(229, 53, 54);
        textSize(50);
        myText = this.values[0].toString();
        text(myText, x0 , y);
        x0 += textWidth(myText);
        pop();
        text(' people who love you', x0, y);
        
        myText = 'There are ';
        x0 = -180;
        y = -20;
        text(myText, x0 , y);
        x0 += textWidth(myText);
        push();
        fill(74, 142, 235);
        textSize(50);
        myText = this.values[1].toString();
        text(myText, x0 , y);
        x0 += textWidth(myText);
        pop();
        text(' people who like you', x0, y);

        myText = 'There are ';
        x0 = -180;
        y = 110;
        text(myText, x0 , y);
        x0 += textWidth(myText);
        push();
        fill(0);
        textSize(50);
        myText = this.values[2].toString();
        text(myText, x0 , y);
        x0 += textWidth(myText);
        pop();
        text(' people who', x0, y);
        text('want to kill you', -180, y + 40);

        pop();
      }

      mousePressed = function(){
        slotMachine.mousePressed();
      }

      mouseReleased = function(){
        slotMachine.mouseReleased();
      }

      mouseDragged = function(){
        slotMachine.mouseDragged();
      }
