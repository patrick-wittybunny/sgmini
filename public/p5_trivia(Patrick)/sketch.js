const quiz = new QuizGenerator();
const ui = new UI(this);
let questions = null;
let currentQuestion = 0;


function preload() {
    ui.preload();
}

function setup() {
    createCanvas(600, 900);
    background(211, 211, 211);

    // var url = 'https://opentdb.com/api.php?amount=10&category=27&difficulty=easy';
    // httpGet(url, 'json', false, function(response) {
    // console.log(response);  
    // });
    // let url = `${base_url}?${generateConfig()}`;
    // console.log(url);
    //   httpGet(url, 'json', false, function(res) {
    //   		console.log(res);  
    //   		// console.log(result);
    //     if(!res.response) {
    //     }

    //   });
    // getToken();
    // console.log(p5.SoundFile);

    quiz.getQuiz().then(res => {
        // console.log(res); 
        // category = res[0].category;
        questions = res;
    });


}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        ui.answered = false;
        ui.isNext = true;
        ui.answering = false;
    }
}

function draw() {
    background(211, 211, 211);

    if (questions) {
        ui.draw(questions[currentQuestion]);
    }

    //   rectMode(CENTER);
    //   fill(255);
    //   strokeWeight(1);
    //   rect(width/2, 100, width - 300, 40);

    //   if(category) {
    //     fill(0);
    //     textSize(20);
    //     textAlign(CENTER, CENTER);
    //   	text(category, width/2, 100);
    //   }

    //   rectMode(CENTER);
    //   fill(255);
    //   strokeWeight(1);
    //   rect(width/2, 200, width - 100, 80);
}

function mousePressed(e) {
    ui.clicked(e.x, e.y);
    // console.log(e.x);
    // console.log(mouseButton);
}