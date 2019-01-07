let base = {};
let icons = [];
let items = [
  [[], []],
  [[], []],
  [[], []],
];
let types = [];
let avatarPosition = { x: 0, y: 0 };
let img = {};
let current = { row: -1, column: -1 };
let equip = [
  [-1, -1],
  [-1, -1],
  [-1, -1],
];

function setup() {
  createCanvas(600, 900);
  base = loadImage("images/base1.png");
  icons = [
    [loadImage("images/fringeicon.png"), loadImage("images/backicon.png")],
    [loadImage("images/eyesicon.png"), loadImage("images/mouthicon.png")],
    [loadImage("images/topicon.png"), loadImage("images/bottomicon.png")],
  ];
  types = [
    ['fringe', 'back'],
    ['eyes', 'mouth'],
    ['topa', 'bottom'],
  ];

  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items[i].length; j++) {
      for (let k = 0; k < 3; k++) {
        items[i][j].push(loadImage(`images/${types[i][j]}${k+1}.png`));
      }
    }
  }
}

function draw() {
  background("white");
  avatarPosition.x = (width - base.width) / 2;
  avatarPosition.y = (height - base.height) / 2 - 100;
  if (equip[0][1] >= 0) {
    image(items[0][1][equip[0][1]], avatarPosition.x, avatarPosition.y);
  }
  image(base, avatarPosition.x, avatarPosition.y);
  if (equip[1][0] >= 0) {
    image(items[1][0][equip[1][0]], avatarPosition.x, avatarPosition.y);
  }
  if (equip[1][1] >= 0) {
    image(items[1][1][equip[1][1]], avatarPosition.x, avatarPosition.y);
  }
  if (equip[0][0] >= 0) {
    image(items[0][0][equip[0][0]], avatarPosition.x, avatarPosition.y);
  }
  if (equip[2][0] >= 0) {
    image(items[2][0][equip[2][0]], avatarPosition.x, avatarPosition.y);
  }
  if (equip[2][1] >= 0) {
    image(items[2][1][equip[2][1]], avatarPosition.x, avatarPosition.y);
  }

  for (let row = 0; row < icons.length; row++) {
    for (let column = 0; column < icons[0].length; column++) {
      image(icons[row][column], (2 / 3 * width) * column, icons[row][column].height * row);
    }
  }

  if (current.row >= 0 & current.column >= 0) {
    let item = items[current.row][current.column];
    let scale = 0.6;
    image(item[0], (width - item[0].width * scale) / 2 - (width / 3), height * 2 / 3, item[0].width * scale, item[0].height  * scale);
    image(item[1], (width - item[1].width * scale) / 2, height * 2 / 3, item[1].width * scale, item[1].height  * scale);
    image(item[2], (width - item[2].width * scale) / 2 + (width / 3), height * 2 / 3, item[2].width * scale, item[2].height  * scale);
  }
}

function mousePressed() {
  if ((mouseX < width / 3 || mouseX > width * 2 / 3) && (mouseY < height * 2 / 3)) {
    current.row = Math.floor(mouseY / icons[0][0].height);
    current.column = (mouseX < width / 3) ? 0 : 1;
  }
  else if (mouseY > height * 2 / 3) {
    let itemNumber = Math.floor(mouseX / (width / 3));
    equip[current.row][current.column] = itemNumber;
    console.log(JSON.stringify(equip));
  }
}

