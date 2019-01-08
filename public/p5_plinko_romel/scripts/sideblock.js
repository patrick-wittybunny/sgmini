function SideBlock(x, y, reverse) {
	var options = {
		isStatic: true,
	}
	this.reverse = reverse;
	this.body = Bodies.fromVertices(x, y, [{x: x, y: y + 75}, {x: x + (this.reverse ? -75 : 75), y: y}, {x: x, y: y - 75}], options);
	// console.log(this.body);
	World.add(world, this.body);
}

SideBlock.prototype.update = function() {
	fill("#76ba66");
	stroke("#76ba66");
	push();
	translate(this.body.position.x, this.body.position.y);
	triangle(0, 0 + 75, 0 + (this.reverse ? -40 : 40), 0, 0, 0 - 75);
	pop();
}