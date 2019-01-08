var start_drawX = 0;
var start_drawY = 0;
var name1_location_array = [];
var name2_location_array = [];
var name_size;
var longer_string;
var input, input2, button;
var isFinished = true;
var isOverBox = false;

function preload() {
    handwritten_font = loadFont("assets/Handwritten_Nat29_Font.otf");
    calligraphy_font = loadFont("assets/March Calligraphy - OTF.otf");
    background_image = loadImage("assets/notebook2.png");
    try_button = loadImage("assets/try_button.png");
}

function setup() {
    createCanvas(600, 900);
    image(background_image, 0, 0);

    flames_array = ["Friends", "Lovers", "Admirers", "Married", "Enemies", "Soulmates"];

    textAlign(CENTER);
    textSize(120);
    textFont(calligraphy_font);

    text('Flames', 300, 120);

    // textFont('Arial');
    textSize(24);
    text('Name', 55, 170);
    text('Name', 55, 205);

    image(try_button, 250, 220);

    input = createInput();
    input.style('font-size', '24px');
    input.position(100, 150);
    input.elt.maxLength = 24;

    input2 = createInput();
    input2.style('font-size', '24px');
    input2.position(100, 185);
    input2.elt.maxLength = 24;

    // button = createButton('Try');
    // button.style('font-size', '24px');
    // button.style('font', 'Verdana');
    // button.position(250, 220);
    // console.log(button);
    // button.mousePressed(flames);
}

function draw() {
    if(mouseX >= 250 && mouseX <= 350 && mouseY >= 220 && mouseY <= 250) {
        isOverBox = true;
    } else {
        isOverBox = false;
    }
}

function mousePressed() {
    if(isOverBox && isFinished) {
        flames();
    }
}

function flames() {
    if(input.value() != '' && input2.value() != '') {
        isFinished = false;
        clear();
        image(background_image, 0, 0);

        textSize(120);
        textFont(calligraphy_font);
        text('Flames', 300, 120);

        textSize(24);
        text('Name', 55, 170);
        text('Name', 55, 205);

        image(try_button, 250, 220);

        input.elt.disabled = true;
        input2.elt.disabled = true;
        // button.elt.disabled = true;
        name1_location_array = [];
        name2_location_array = [];

        var name1 = input.value().replace(/\s+/g,' ').trim();
        var name2 = input2.value().replace(/\s+/g,' ').trim();

        longer_string = max(name1.length, name2.length);

        fill(0);
        // textFont(handwritten_font);
        // name_size = 70;
        // name_size = (longer_string < 37) ? 180 - 7.875 * longer_string + 0.109375 * longer_string * longer_string : -3.16 * longer_string + 141;
        name_size = (244.0257 - 16.64318*longer_string + 0.5184363*longer_string*longer_string - 0.007493937*longer_string*longer_string*longer_string + 0.00004059786*longer_string*longer_string*longer_string*longer_string) * (600/720);
        textSize(name_size);
        // strokeWeight(1);
        var x_position = name_size * 0.5;
        for(let i = 0; i < name1.length; i++) {
            setTimeout(function () {
                textFont(handwritten_font);
                text(name1.charAt(i), x_position, 420);
                x_position += name_size * 0.5;
                if(i == name1.length - 1) {
                    x_position = name_size * 0.5;
                    for(let j = 0; j < name2.length; j++) {
                        setTimeout(function () {
                            text(name2.charAt(j), x_position, 420 + name_size);
                            x_position += name_size * 0.5;
                            if(j == name2.length - 1) {
                                setTimeout(function () {
                                    name1 = name1.toLowerCase();
                                    name2 = name2.toLowerCase();

                                    var array = [];

                                    var counter1 = 0;
                                    for(let i = 0; i < name2.length; i++) {
                                        if(!name1.includes(name2.charAt(i))) {
                                            array.push(name2.charAt(i));
                                        } else if(name2.charAt(i) == " ") {
                                            counter1++;
                                        } else {
                                            name2_location_array.push(name_size * 0.5 * (i + 1));
                                        }
                                        counter1++;
                                    }

                                    var counter2 = 0;
                                    for(let i = 0; i < name1.length; i++) {
                                        if(!name2.includes(name1.charAt(i))) {
                                            array.push(name1.charAt(i));
                                        } else if(name1.charAt(i) == " ") {
                                            counter2++;
                                        } else {
                                            name1_location_array.push(name_size * 0.5 * (i + 1));
                                        }
                                        counter2++;
                                    }

                                    name1 = name1.replace(/ /g, "");
                                    name2 = name2.replace(/ /g, "");

                                    if(array.length > 6) {
                                        if(array.length % 6 == 0) {
                                            var result = 5;
                                        } else {
                                            var result = (array.length % 6) - 1;
                                        }
                                    } else {
                                        var result = array.length - 1;
                                    }


                                    textSize(180);
                                    // text("Soulmates", 300, 420+name_size+180);
                                    text(flames_array[result], 300, 420+name_size+180);

                                    cancelLetters();

                                }, 100 * name2.length);
                            }
                        }, 100 * j);
                    }
                }
            }, 100 * i);
        }
    }
}

function keyPressed() {
    if(keyCode == ENTER && isFinished) {
        flames();
    }
}

function cancelLetters() {
    strokeWeight(4);
    // console.log(name_size);
    let height_factor = (20 * name_size)/100;
    let width_factor = (40 * name_size)/100;
    // for(let i = 0; i < name1_location_array.length; i++) {
    //     line(name1_location_array[i] + round(random(width_factor)), round(random(360 - height_factor, 360 + height_factor)), name1_location_array[i] - round(random(width_factor)), round(random(460 - height_factor, 460 + height_factor)));
    // }
    // for(let j = 0; j < name2_location_array.length; j++) {
    //     line(name2_location_array[j] + round(random(width_factor)), round(random(460 - height_factor, 460 + height_factor)), name2_location_array[j] - round(random(width_factor)), round(random(560 - height_factor, 560 + height_factor)));
    // }
    let first_name = name1_location_array;
    let second_name = name2_location_array;
    for(let i = 0; i < first_name.length; i++) {
        // line(first_name[i] + 30, 410 - height_factor, first_name[i] - 30, 410 + height_factor);
        line(first_name[i] + name_size/10, 420 - name_size/2, first_name[i] - name_size/10, 420);
    }
    for(let i = 0; i < second_name.length; i++) {
        line(second_name[i] + name_size/10, 420+name_size-(name_size/2), second_name[i] - name_size/10, 420+name_size);
        // line(second_name[i] + 30, 470, second_name[i] - 30, 550);
    }
    input.elt.disabled = false;
    input2.elt.disabled = false;
    // button.elt.disabled = false;
    isFinished = true;
}
