// const quiz = new QuizGenerator();
// const ui = new UI(this);
let questions = null;
let currentQuestion = 0;

let advices = [];
let colors = [];

function preload() {
    // ui.preload();
}

function getAdvice() {
    return new Promise(function(resolve, reject) {
        httpGet(`https://api.adviceslip.com/advice`, 'json',false, function(res) {
            console.log(res);
            resolve(res.slip.advice);
        });
    });

}


function setup() {
    createCanvas(600, 900);

    colors.push(this.getRandomColor());
    colors.push(this.getRandomColor());
    colors.push(this.getRandomColor());

    this.getAdvice().then(function(res) {
        advices.push(res);  
        this.getAdvice().then(function (res) {
            advices.push(res);
                this.getAdvice().then(function (res) {
                    advices.push(res);
                    console.log(advices);
                });
        });
    });

 
    // console.log(advices);

    // quiz.getQuiz().then(res => {
    //     questions = res;
    // });
}

function draw() {

    background(211, 211, 211);

    // console.log(advices);



    if(advices.length == 3) {
                // fill(0);
        textSize(30);
                // textAlign(CENTER, CENTER);
        text(`DAILY RANDOM ADVICES`, width / 2, 125, width - 130, 70);
        for(var i = 0; i < advices.length; i++) {

            rectMode(CENTER, CENTER);
            // fill(colors[i].r, colors[i].g, colors[i].b);
            // fill(colors[i].r, colors[i].g, colors[i].b);
            fill(255);
            strokeWeight(1);
            rect(width / 2, 200 + i * 75,  width-100, 60);

            fill(0);
            textSize(15);
            textAlign(CENTER, CENTER);
            text(advices[i], width/2, 200 + i * 75, width - 130, 50);

            // rectMode(CENTER);
            // fill(255);
            // strokeWeight(1);
            // rect(width / 2, 200, width - 100, 80);

            // fill(0);
            // textSize(17);
            // textAlign(CENTER, CENTER);
            // text(advices[i], width / 2, 200, width - 130, 80);
        }
    }


    // if(advices.length)
    // background(211, 211, 211);w

    // if (questions) {
    //     ui.draw(questions[currentQuestion]);
    // }
}

function mousePressed(e) {
    // ui.clicked(e.x, e.y);
}

function getRandomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    // return Color(r,g,b);
    return {r:r,g:g,b:b};
}