
function Gif(frame_url){
    this.x = 0;
    this.y = 0;
    this.frame_url = frame_url;
    this.frames = [];
    this.currentFrame = 0;
    this.ready = false;
    this.counter = 0;
    this.frame_count = 0;
    this.interval = null;

    this.preload = function(frame_count) {
        this.frame_count = frame_count;
        for(let i = 0; i < frame_count; i++){
            const img = loadImage(`${this.frame_url}/${i}.png`);
            this.frames.push(loadImage(`${this.frame_url}/${i}.png`));
        }
    }

    this.display = function() {
        push();
        translate(this.x,this.y);
        imageMode(CENTER);
        image(this.frames[this.currentFrame], 0, 0);
        pop();
    }

    this.play = function(fps, looped, callback, context) {
        callback.bind(context);
        fps = Math.min(fps, 60);
        let self = this;
        if(this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(function() {
            self.currentFrame++;
            if(self.currentFrame >= self.frame_count) {
                if(looped) self.currentFrame = 0;
                else {
                    self.currentFrame = self.frame_count - 1;
                    clearInterval(self.interval);
                    callback();
                }
            }

        }, 1000/fps);
    }

    this.reset = function() {
        this.currentFrame = 0;
    }

}