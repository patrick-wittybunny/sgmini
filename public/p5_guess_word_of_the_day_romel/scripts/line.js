function Line(i, val, start, size) {
	this.done = false;
	this.values = val;
	this.size_width = size;

	this.x = (start + 7.5) + (i * (size + 15));
	this.y = 340;
	this.draw = function() {
		if(!this.done) {
			strokeWeight(5);
    		line(this.x, this.y, this.x + this.size_width, this.y);
		}
		else {
			fill("#000000");
			textAlign(CENTER);
			textSize(65);
			text(this.values.toUpperCase(), this.x + (this.size_width * 0.5), this.y);
		}
	}
}


// Ball.prototype.update = function() {
// 	fill("#ffff00");
// 	stroke("#ffff00");
// 	push();
// 	translate(this.body.position.x, this.body.position.y);
// 	ellipse(0, 0, this.r * 1.85);
// 	pop();
// }