function Ball(x, y) {
	this.r = 25;
	var options = {
		restitution: 0.5,
		friction: 0,
	}
	this.body = Bodies.circle(x, y, this.r, options);
	World.add(world, this.body);
}

Ball.prototype.update = function() {
	fill("#ffff00");
	stroke("#ffff00");
	push();
	translate(this.body.position.x, this.body.position.y);
	ellipse(0, 0, this.r * 1.85);
	pop();
}