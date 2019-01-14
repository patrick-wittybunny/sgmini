
function Cookie(x,y, frame0, frame1, gif) {
    this.x  = x;
    this.y = y;
    this.frame0 = frame0;
    this.frame1 = frame1;
    this.gif = gif;
    this.cracked = false;
    this.cracking = false;
    this.text = null;

    this.display = function() {
        this.gif.display();

        if(this.text) {
            push();
            translate(this.x, this.y);
            rectMode(CENTER,TOP);
            textAlign(CENTER, CENTER);
            // textStyle('Arial Narrow')
            // textFont('Arial Narrow');
            textSize(20);
            fill(0, 0, 0);
            text(this.text, 0, -10, 255, this.frame1.height);
            pop();
        }
        if(!this.cracking && this.cracked) {
            if(!this.text) {
                this.text = content[floor(random(content.length))];
            }
        }
    }

    this.crack = function(callback,context) {
        this.cracking = true;
        let self = this;
        this.gif.play(20, false, function() {
            self.cracking = false;
            if(callback) {
                callback.bind(context);
                callback();
            }
        }, this);
        this.cracked = true;
    }

    this.addText = function(string){

    }

    this.reset = function() {
        this.gif.reset();
        this.text = null;
        this.cracked = false;
    }
}