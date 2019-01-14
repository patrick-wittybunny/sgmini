
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
            textFont('Arial Narrow Regular');
            textSize(20);
            fill(0, 0, 0);
            text(this.text, 0, -10, 275, this.frame1.height);
            pop();
        }
        if(!this.cracking && this.cracked) {
            // console.log('heree');
            if(!this.text) {
                // console.log('here');
                this.text = content[floor(random(content.length))];
                console.log(this.text);
            
            }
            //     console.log(this.text);
            // }
        }
        // push();
        // translate(this.x, this.y);
        // imageMode(CENTER);
        // if(!this.cracking) {

            // if(this.cracked) {
                // image(gif, 0,0);
            // }
            // else {
                // image(gif, 0, 0);
            // }
        // }
        // pop();
    }

    this.crack = function(callback,context) {
        this.cracking = true;
        let self = this;
        this.gif.play(18, false, function() {
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