function Answer(index) {

  this.x = 0;
  this.y = 0;
  this.color = color(255);
  this.text = '';
  this.index = index;
  this.rect = null;
  this.width = width - 100;
  this.height = 40;

  this.display = function() {
    // console.log('here');
    
    rectMode(CENTER, CENTER);
    fill(this.color);
    strokeWeight(1);
    this.rect = rect(this.x, this.y, this.width, this.height);

    fill(0);
    textSize(15);
    textAlign(LEFT, CENTER);
    text(this.text, this.x, this.y, width - 130, this.height);
    // this.t = text(this.text, this.x, this.y, width - 130, this.height);
    // console.log('--------');
    // console.log(this.index);
    // console.log(this.x - this.width / 2,this.x + this.width / 2);
    // console.log(this.y - this.height / 2,this.y + this.height / 2);
  }

  this.clicked = function() {
		// console.log(this.t);
    
    this.color = color(66, 244, 238);
  }

  this.reset_click = function() {
    this.color = color(255);
  }

  this.correct = function() {
    this.color = color(66, 244, 72);
  }

  this.error = function() {
    this.color = color(244, 66, 66);
  }

  this.inside = function(x, y) {
    // console.log(x, y);ww
    // console.log(this.x, this.y);
    if (x >= this.x - this.width / 2 && x <= this.x + this.width / 2) {
      if (y >= this.y - this.height / 2 && y <= this.y + this.height / 2) {
        return true;
      } else return false;
    } else return false;
  }

}