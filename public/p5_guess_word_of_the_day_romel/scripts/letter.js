function Letter(i, letter) {
	this.letter = letter;
	this.included = false;
	this.done = false;
	this.x = (i < 20 ? 50 : 140) + ((i % 10) * 55);
	this.y = i < 10 ? canvas_height * 0.8 : i < 20 ? canvas_height * 0.875 : canvas_height * 0.95;

	this.draw = function() {
		if(!this.done) {
			fill(1);
			text(this.letter, this.x, this.y);
		}
		else {
			fill(!this.included ? "#ff0000" : "#00ff00");
			text(this.letter, this.x, this.y);
		}
	}
}