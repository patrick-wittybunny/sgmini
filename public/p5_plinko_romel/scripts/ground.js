function Ground() {
	// console.log("NEW BLOCK");
	var options = {
		isStatic: true,
	}
	this.body = Bodies.rectangle(canvas_width * 0.5, canvas_height, canvas_width, 10, options);
	World.add(world, this.body);
}

Ground.prototype.update = function() {
	fill("#76ba66");
	stroke("#76ba66");
	push();
	translate(this.body.position.x, this.body.position.y);
	rectMode(CENTER);
	rect(0, 0, canvas_width, 10);
	pop();
}