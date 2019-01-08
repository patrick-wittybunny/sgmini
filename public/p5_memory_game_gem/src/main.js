var background;
var health_icon;
var health_icon_w = 50;
var end_text = "LOSE!"
var neutral_card;  // Declare variable 'img'.
var cardA;
var cardB;
var cardC;
var cardD;
var cardE;
var cardF;
var cardG;
var cardH;

var pg;
var button;
var screen_width = 600;
var screen_height = 900;

var trial_score = 0;
var pair_score = 0;
var lives = 6;

var mouse_clicked = false
var wrong_guess = false;
var open_card = "";
var opened_card = "";
var card1;
var random_keys = []
var random_option = [0,1,2,3,4,
					 5,6,7,8,
					 9,10,11,12,
					 13,14,15]
var keys = ['a1', 'a2', 'b1', 'b2', 
			'c1', 'c2', 'd1', 'd2',
			'e1', 'e2', 'f1', 'f2',
			'g1', 'g2', 'h1', 'h2']

function resetGame() {
	trial_score = 0;
	pair_score = 0;
	lives = 6;

	mouse_clicked = false
	wrong_guess = false;
	open_card = "";
	opened_card = "";
	card1;
	random_keys = []
	random_option = [0,1,2,3,4,
						 5,6,7,8,
						 9,10,11,12,
						 13,14,15]
	keys = ['a1', 'a2', 'b1', 'b2', 
				'c1', 'c2', 'd1', 'd2',
				'e1', 'e2', 'f1', 'f2',
				'g1', 'g2', 'h1', 'h2']

	for (let i = 0; i < keys.length; i++) {
		let rand_num = Math.floor(Math.random() * random_option.length)
		random_keys.push(random_option[rand_num])
		random_option.splice(rand_num, 1)
	}

	card1.resetCard(keys[random_keys[0]])
	card2.resetCard(keys[random_keys[1]])
	card3.resetCard(keys[random_keys[2]])
	card4.resetCard(keys[random_keys[3]])

	card5.resetCard(keys[random_keys[4]])
	card6.resetCard(keys[random_keys[5]])
	card7.resetCard(keys[random_keys[6]])
	card8.resetCard(keys[random_keys[7]])

	card9.resetCard(keys[random_keys[8]])
	card10.resetCard(keys[random_keys[9]])
	card11.resetCard(keys[random_keys[10]])
	card12.resetCard(keys[random_keys[11]])

	card13.resetCard(keys[random_keys[12]])
	card14.resetCard(keys[random_keys[13]])
	card15.resetCard(keys[random_keys[14]])
	card16.resetCard(keys[random_keys[15]])
}

function setup(){
	createCanvas(screen_width, screen_height);

	background = loadImage("assets/bg1.png");
	health_icon = loadImage("assets/health_icon.png");
	neutral_card = loadImage("assets/card.png");
	cardA = loadImage("assets/cardA.png");
	cardB = loadImage("assets/cardB.png");
	cardC = loadImage("assets/cardC.png");
	cardD = loadImage("assets/cardD.png");
	cardE = loadImage("assets/cardE.png");
	cardF = loadImage("assets/cardF.png");
	cardG = loadImage("assets/cardG.png");
	cardH = loadImage("assets/cardH.png");

	// textFont(font);
	textSize(40);
	textAlign(CENTER, CENTER);
	 
	for (let i = 0; i < keys.length; i++) {
		let rand_num = Math.floor(Math.random() * random_option.length)
		random_keys.push(random_option[rand_num])
		random_option.splice(rand_num, 1)
	}

	card1 = new Card(35, 134, keys[random_keys[0]]);
	card2 = new Card(172, 134, keys[random_keys[1]]);
	card3 = new Card(310, 134, keys[random_keys[2]]);
	card4 = new Card(448, 134, keys[random_keys[3]]);

	card5 = new Card(35, 296, keys[random_keys[4]]);
	card6 = new Card(172, 296, keys[random_keys[5]]);
	card7 = new Card(310, 296, keys[random_keys[6]]);
	card8 = new Card(448, 296, keys[random_keys[7]]);

	card9 = new Card(35, 459, keys[random_keys[8]]);
	card10 = new Card(172, 459, keys[random_keys[9]]);
	card11 = new Card(310, 459, keys[random_keys[10]]);
	card12 = new Card(448, 459, keys[random_keys[11]]);

	card13 = new Card(35, 621, keys[random_keys[12]]);
	card14 = new Card(172, 621, keys[random_keys[13]]);
	card15 = new Card(310, 621, keys[random_keys[14]]);
	card16 = new Card(448, 621, keys[random_keys[15]]);

	button = createButton('RESET');
	button.position(270, 850);
	button.mousePressed(resetGame);
}

function draw(){
	image(background, 0, 0);
	for (let i = 0; i < lives; i++){
		image(health_icon, (health_icon_w*i)+10, 10);
	}
	

	image(card1.card, card1.x, card1.y);
	image(card2.card, card2.x, card2.y);
	image(card3.card, card3.x, card3.y);
	image(card4.card, card4.x, card4.y);

	image(card5.card, card5.x, card5.y);
	image(card6.card, card6.x, card6.y);
	image(card7.card, card7.x, card7.y);
	image(card8.card, card8.x, card8.y);

	image(card9.card, card9.x, card9.y);
	image(card10.card, card10.x, card10.y);
	image(card11.card, card11.x, card11.y);
	image(card12.card, card12.x, card12.y);

	image(card13.card, card13.x, card13.y);
	image(card14.card, card14.x, card14.y);
	image(card15.card, card15.x, card15.y);
	image(card16.card, card16.x, card16.y);

	if (lives <= 0 || (pair_score >= 8)) {
		text(end_text, 450, 40);
	}

}

function Card(new_x, new_y, key_name) {
	this.card = neutral_card
	this.x = new_x;
	this.y = new_y;
	this.xx = new_x + 100;
	this.yy = new_y + 125;
	this.w = 100
	this.h = 125
	this.key = key_name
	this.actual_card = getCard(key_name)

	this.in_play = true;

	this.resetCard = function (new_key) {
		this.card = neutral_card
		this.key = new_key
		this.actual_card = getCard(new_key)

		this.in_play = true;
	}

	this.check = function () {
		// console.log(lives, this.in_play, this.key)
		if (lives > 0 && this.in_play && mouseX >= this.x && mouseX <= this.xx && mouseY >= this.y && 
			mouseY <= this.yy ) {
			if (wrong_guess) {
				wrong_guess = false
				opened_card.card = neutral_card
				if (open_card.key != this.key) {
					open_card.card = neutral_card
				}
				open_card = this
			}
			else if (open_card == "") {
				open_card = this
			}
			else if (open_card.key[0] != this.key[0]) {
				wrong_guess = true
				opened_card = open_card
				open_card = this
				if (lives > 0) {
					lives -= 1
				}
				else{
					end_text = "LOSE!"
				}
			}
			else if (open_card.key[0] == this.key[0] && open_card.key[1] != this.key[1]) {
				pair_score += 1
				open_card.in_play = false
				this.in_play = false
				open_card = ""
				opened_card = ""
			}
			trial_score += 1;
			this.card = this.actual_card

			// console.log("TRIES: ", trial_score, "| SCORE: ", pair_score)
			if (pair_score >= 8){
				end_text = "WIN!"
			}
		}
	}

}

function getCard(key_name) {
	let new_card = neutral_card
	if (key_name[0] == 'a') {
		new_card = cardA
	}
	else if (key_name[0] == 'b') {
		new_card = cardB
	}
	else if (key_name[0] == 'c') {
		new_card = cardC
	}
	else if (key_name[0] == 'd') {
		new_card = cardD
	}
	else if (key_name[0] == 'e') {
		new_card = cardE
	}
	else if (key_name[0] == 'f') {
		new_card = cardF
	}
	else if (key_name[0] == 'g') {
		new_card = cardG
	}
	else if (key_name[0] == 'h') {
		new_card = cardH
	}
	return new_card;
}

function mouseReleased() {
	mouse_clicked = false
}


function mousePressed() {
	if (mouseIsPressed && mouse_clicked != true) {
		mouse_clicked = true
		card1.check()
		card2.check()
		card3.check()
		card4.check()

		card5.check()
		card6.check()
		card7.check()
		card8.check()

		card9.check()
		card10.check()
		card11.check()
		card12.check()

		card13.check()
		card14.check()
		card15.check()
		card16.check()
	}
}
