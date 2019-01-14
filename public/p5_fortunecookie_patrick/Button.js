
function Button(x, y, frame0, frame1, callback, context) {

    this.x = x;
    this.y = y;
    this.callback = callback;
    this.frame0 = frame0;
    this.frame1 = frame1;
    this.pressed = false;
    this.didCallback = false;
    this.context = context;
    this.first = true;

    this.display = function() {
        push();
        translate(this.x, this.y);
        imageMode(CENTER);
        image(this.pressed ? this.frame1 : this.frame0,0,0);
        pop();
    }

    this.changePressedState = function() {
        this.callback.bind(this.context);
        this.pressed = !this.pressed;
        if(this.pressed && !this.didCallback) {
            this.didCallback = true;
            this.callback();
        }
    }

    this.checkPressed = function() {
        if(mouseX >= this.x - this.frame0.width/2 && mouseX <= this.x + this.frame0.width/2 &&
        mouseY >= this.y - this.frame0.height / 2 && mouseY <= this.y + this.frame0.height / 2){
            this.changePressedState();
        }
    }

    this.reset = function() {
        this.pressed = false;
        this.didCallback = false;
    }
}