function Obstacle(x, y) {
	this.r = 10;
	var options = {
		isStatic: true,
		restitution: 0.5,
		friction: 0,
	}
	this.body = Bodies.circle(x, y, this.r, options);
	World.add(world, this.body);
}

Obstacle.prototype.update = function() {
	fill("#76ba66");
	stroke("#76ba66");
	push();
	translate(this.body.position.x, this.body.position.y);
	ellipse(0, 0, this.r * 2);
	pop();
}