function UI(parent) {
  this.parent = parent;
  this.isNext = true;
  this.answering = false;
  this.correct = null;
  this.choicesUI = [];
  this.answered = false;
  this.choices = [];
  this.correct = 0;
  this.correctSound = '';
  this.wrongSound = '';

  this.preload = function() {
    this.correctSound = loadSound('correct.m4a');
    this.wrongSound = loadSound('error.wav');
  }

  this.drawCategoryPanel = function(category) {
    category = atob(category);
    rectMode(CENTER);
    fill(255);
    strokeWeight(1);
    rect(width / 2, 100, width - 300, 40);

    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(category, width / 2, 100);
  };


  this.drawQuestionPanel = function(question) {
    question = atob(question);
    rectMode(CENTER);
    fill(255);
    strokeWeight(1);
    rect(width / 2, 200, width - 100, 80);

    fill(0);
    textSize(17);
    textAlign(CENTER, CENTER);
    text(question, width / 2, 200, width - 130, 80);

  }

  this.drawAnswersPanel = function(entry) {

    this.choices = ["True", "False"];

    this.correct = atob(entry.correct_answer);

    if (entry.incorrect_answers.length != 1) {
      // console.log(atob(entry.correct_answer));
      this.choices = this.getMultipleChoice(entry);
    }

    for (var i = 0; i < this.choices.length; i++) {
      // console.log(this.choices);
      // console.log(Answer);
      this.choicesUI[i] = new Answer(i);
      // console.log('hree11');
      this.choicesUI[i].text = this.choices[i];
      this.choicesUI[i].x = width / 2;
      this.choicesUI[i].y = 300 + (50 * i);
      this.choicesUI[i].display();
    }

    // console.log(this.choices);
    // this.choices[0].fill(
  }

  this.draw = function(entry) {
    this.drawCategoryPanel(entry.category);

    this.drawQuestionPanel(entry.question);


    if (!this.isNext && this.answering) {
      for (var i = 0; i < this.choices.length; i++) {
        this.choicesUI[i].display();
      }
    }

    if (this.isNext) {
      this.choicesUI = [];
      this.choices = [];
      this.drawAnswersPanel(entry);

      // this.shuffle(entry);
      this.isNext = false;
      this.answering = true;
    }

  }

  this.getMultipleChoice = function(entry) {
    // console.log(entry);
    // let arr = entry.correct_answer
    let arr = entry.incorrect_answers;
    arr.push(entry.correct_answer);

    arr = this.shuffle(arr);

    for (var i = 0; i < arr.length; i++) {
      arr[i] = atob(arr[i]);
    }

    return arr;
  }

  this.shuffle = function(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  this.clicked = function(x, y) {

    if (!this.answered) {
      let answer = null;

      for (var i = 0; i < this.choicesUI.length; i++) {
        if (this.choicesUI[i].inside(x, y)) answer = this.choicesUI[i];
      }

      // console.log(answer);
      if (answer) {
        this.checkAnswer(answer);
        this.answered = true;
      }
    }

  }

  this.checkAnswer = function(answer) {
    answer.clicked();
    let me = this;
    setTimeout(function() {
      // this.
      let index = me.choices.indexOf(me.correct);
      if (answer.index == index) {
        // console.log('here1');
        me.correct++;
				me.correctSound.play();
        answer.correct();
      } else {
        console.log('here2');
				me.wrongSound.play();
        answer.error();
        me.choicesUI[index].correct();
      }


      setTimeout(function() {
        console.log(me.parent);
        me.parent.nextQuestion();
      }, 2000);


    }, 1000);
  }



}