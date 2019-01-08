function Block(x, y, side) {
	// console.log("NEW BLOCK");
	this.side = side;
	var options = {
		isStatic: true,
	}
	this.body = Bodies.rectangle(x, y, 10, this.side ? canvas_height * 0.85 : 70, options);
	World.add(world, this.body);
}

Block.prototype.update = function() {
	fill("#76ba66");
	stroke("#76ba66");
	push();
	translate(this.body.position.x, this.body.position.y);
	rectMode(CENTER);
	rect(0, 0, 10, this.side ? canvas_height * 0.85 : 70);
	pop();
}