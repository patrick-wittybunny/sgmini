function SideBlock(x, y, reverse) {
	var options = {
		isStatic: true,
	}
	this.reverse = reverse;
	this.sides = [];
	// this.y_values = [0, 75, 75*2, 75*3, 75*4, 75*5, 75*6];
	this.x = x;
	this.y = y;
	this.render_sides = [0, 0];
	console.log(this.sides);
	this.addSides();
	this.body = Bodies.fromVertices(x, y, /*[{x: x, y: y + 75}, {x: x + (this.reverse ? -77.5 : 77.5), y: y}, {x: x, y: y - 75}]*/this.sides, options);
	// console.log(this.body);
	World.add(world, this.body);
}

SideBlock.prototype.addSides = function() {
	var x, y;
	for(var i = 0; i < 6; i++) {
		if(i % 2 != 0) {
			x = this.x + (this.reverse ? -77.5 : 77.5);
		}
		else {
			x = this.x;
		}

		y = this.y + (i * 75);
		this.sides.push({x: x, y: y});
		this.render_sides.push(x);
		this.render_sides.push(y);
	}
}

SideBlock.prototype.update = function() {
	fill("#76ba66");
	stroke("#76ba66");
	push();
	translate(this.body.position.x, this.body.position.y);
	// triangle(/*this.render_sides*/0, 0, 77.5, 75 * 1, 0, 75 * 2, 77.5, 75 * 3, 0, 75 * 4, 77.5, 75 * 5, 0, );

	// rectMode(CENTER);
	triangle(0 - (77.5 * 0.5), 0 - (75 * 0.5), 77.5 - (77.5 * 0.5), 75 * 1 - (75 * 0.5), 0 - (77.5 * 0.5), 75 * 2 - (75 * 0.5));
	triangle(0 - (77.5 * 0.5), 75 * 2 - (75 * 0.5), 77.5 - (77.5 * 0.5), 75 * 3 - (75 * 0.5), 0 - (77.5 * 0.5), 75 * 4 - (75 * 0.5));
	triangle(0 - (77.5 * 0.5), 75 * 4 - (75 * 0.5), 77.5 - (77.5 * 0.5), 75 * 5 - (75 * 0.5), 0 - (77.5 * 0.5), 75 * 6 - (75 * 0.5));
	// for(var i = 0; i < 3; i++) {
	// 	triangle(0, 75 * ((i * 3), 77.5, 75 * ((i * 3 + 1), 0, 75 * ((i * 3 + 2)))));
	// }
	pop();
}