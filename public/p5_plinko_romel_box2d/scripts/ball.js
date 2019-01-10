/*function Ball(x, y) {
	this.r = 28;
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
}*/

/*function Box(x, y) {
	this.x = x;
	this.y = y;
	this.w = 16;
	this.h = 16;

	let bd = new box2d.b2BodyDef();
	bd.type = box2d.b2BodyType.b2_dynamicBody;
	bd.position = scaleToWorld(x, y);

	let fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(scaleToWorld(this.w / 2), scaleToWorld(this.h / 2));

    fd.shape = new box2d.b2CircleShape();
    // fd.shape.m_p.Set(10, 10);
    fd.shape.m_radius = scaleToWorld(10);

    // Some physics
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    // Create the body
    this.body = world.CreateBody(bd);
    // Attach the fixture
    this.body.CreateFixture(fd);
}

  // Drawing the box
Box.prototype.update = function() {
    // Get the body's position
    let pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    let a = this.body.GetAngleRadians();

    // Draw it!
    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(127);
    stroke(200);
    strokeWeight(2);
    rect(0, 0, this.w, this.h);
    pop();
}*/

function Ball(x, y, obstacle) {
	this.x = x;
	this.y = y;
	this.obstacle = obstacle;
	this.r = obstacle ? 5 : 25;

	// console.log(this.x, this.y);

	let bd = new box2d.b2BodyDef();
	if(obstacle) {
		bd.type = box2d.b2BodyType.b2_staticBody;
	}
	else {
		bd.type = box2d.b2BodyType.b2_dynamicBody;
	}
	bd.position = scaleToWorld(x, y);

	let fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    fd.shape = new box2d.b2PolygonShape();
    fd.shape = new box2d.b2CircleShape();
    fd.shape.m_radius = scaleToWorld(this.r);

    // Some physics
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    // Create the body
    this.body = world.CreateBody(bd);
    // console.log(this.body);
    // Attach the fixture
    this.body.CreateFixture(fd);
}

Ball.prototype.update = function() {
	fill("#ffff00");
	stroke("#ffff00");
	push();
	let pos = scaleToPixels(this.body.GetPosition());
	translate(pos.x, pos.y);
	ellipse(0, 0, this.r * 2);
	pop();
}