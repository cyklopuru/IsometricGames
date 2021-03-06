document.onkeydown = checkKey;

var feld = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
var textureOffsetX = 191;
var textureOffsetY = 287;
var textureHeight = 65;
var textureLength = 130;
var figurX = 6;
var figurY = 6;
var gegnerX = 3;
var gegnerY = 4;

feld[figurY][figurX] = 2;
feld[gegnerY][gegnerX] = 3;
var item;
var kachel = new Image();
var stein = new Image();
var figur = new Image();
var gegner = new Image();
gegner.src = "./Charakter/slime_right.png";
kachel.src = "./Assets/kenney_natureKit_2.1/Isometric/ground_pathOpen_SE.png";
stein.src = "./Assets/kenney_natureKit_2.1/Isometric/cliff_block_stone_NW.png";
figur.src = "./2.png";
var offsetX = 400;
var offsetY = 100;
var canvas, context;
Simple2D.addEventListener("");

function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == "39") {
    //figur.src = "./Charakter/slime_back.png";
    moveUp();
  } else if (e.keyCode == "37") {
    //figur.src = "./Charakter/slime_left.png";
    moveDown();
  } else if (e.keyCode == "38") {
    //figur.src =	"./Charakter/slime_back.png";
    moveLeft();
  } else if (e.keyCode == "40") {
    //figur.src = "./Charakter/slime_right.png";
    moveRight();
  }
}
function offsetCheck() {
  if (figurX && figurY > 5 && figurX && figurY < feld.length - 5) {
    return true;
  }
  return false;
}
/* Geht alle richtungen ab und checkt ob es den Kurs korrigieren muss */
function pathfinding() {
  if (gegnerX < figurX) {
    feld[gegnerY][gegnerX] = 0;
    gegnerX++;
    feld[gegnerY][gegnerX] = 3;
  }
  if (gegnerX > figurX) {
    feld[gegnerY][gegnerX] = 0;
    gegnerX--;
    feld[gegnerY][gegnerX] = 3;
  }
  if (gegnerY < figurY) {
    feld[gegnerY][gegnerX] = 0;
    gegnerY++;
    feld[gegnerY][gegnerX] = 3;
  }
  if (gegnerY > figurY) {
    feld[gegnerY][gegnerX] = 0;
    gegnerY--;
    feld[gegnerY][gegnerX] = 3;
  }
}

function bewegeGegner() {
  pathfinding();
}
function moveUp() {
  if (figurY > 0 && feld[figurY - 1][figurX] == 0) {
    feld[figurY][figurX] = 0;
    figurY--; //bewege die Figur ein Feld nach oben
    feld[figurY][figurX] = 2;
    zeichneFeld();
  } else if (feld[figurY - 1][figurX] == 1 && feld[figurY - 2][figurX] == 0) {
    feld[figurY - 1][figurX] = 0;
    feld[figurY - 2][figurX] = 1;
    moveUp();
  }
}
function moveDown() {
  if (figurY < feld.length - 1 && feld[figurY + 1][figurX] == 0) {
    feld[figurY][figurX] = 0;
    figurY++;
    feld[figurY][figurX] = 2;
    zeichneFeld();
  } else if (feld[figurY + 1][figurX] == 1 && feld[figurY + 2][figurX] == 0) {
    feld[figurY + 1][figurX] = 0;
    feld[figurY + 2][figurX] = 1;
    moveDown();
  }
}
function moveLeft() {
  if (figurX > 0 && feld[figurY][figurX - 1] == 0) {
    feld[figurY][figurX] = 0;
    figurX--;
    feld[figurY][figurX] = 2;
    zeichneFeld();
  } else if (feld[figurY][figurX - 1] == 1 && feld[figurY][figurX - 2] == 0) {
    feld[figurY][figurX - 1] = 0;
    feld[figurY][figurX - 2] = 1;
    moveLeft();
  }
}
function moveRight() {
  if (figurX < feld[0].length - 1 && feld[figurY][figurX + 1] == 0) {
    feld[figurY][figurX] = 0;
    figurX++;
    feld[figurY][figurX] = 2;
    pathfinding();
    zeichneFeld();
  } else if (feld[figurY][figurX + 1] == 1 && feld[figurY][figurX + 2] == 0) {
    feld[figurY][figurX + 1] = 0;
    feld[figurY][figurX + 2] = 1;
    moveRight();
  }
}

function resize(newRows, newCols) {
  newRows = newRows + feld.length - 1;
  newCols = newCols + feld.length - 1;
  for (var i = 0; i < newRows; i++) {
    item = feld[i] || (feld[i] = []);
    for (var k = item.length; k < newCols; k++)
      item[k] = Math.floor(Math.random() * 1);
  }
  zeichneFeld();
}
function init() {
  canvas = document.getElementById("spielfeld");
  context = canvas.getContext("2d");
}

function zeichneFeld() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = figurY - 5; i < figurY + 6; i++)
    for (let j = figurX - 5; j < figurX + 6; j++) {
      if (i < 0) i = 0;

      if (j < 0) j = 0;

      let x = j * 65;
      let y = i * 65;
      let isoX = x - y + offsetX;
      let isoY = (x + y) / 2 + offsetY;

      switch (feld[i][j]) {
        case 0:
          context.drawImage(
            kachel,
            textureOffsetX,
            textureOffsetY,
            130,
            65,
            isoX,
            isoY,
            130,
            65
          );
          break;
        case 1:
          isoY -= stein.height - kachel.height;
          context.drawImage(
            stein,
            textureOffsetX,
            textureOffsetY,
            130,
            65,
            isoX,
            isoY,
            130,
            65
          );
          break;
        case 2:
          /* isoY -= figur.height - kachel.height; */
          context.drawImage(
            kachel,
            textureOffsetX,
            textureOffsetY,
            130,
            65,
            isoX,
            isoY,
            130,
            65
          );
          context.drawImage(figur, 0, 0, 124, 124, isoX, isoY - 65, 124, 124);
          break;
        case 3:
          context.drawImage(
            kachel,
            textureOffsetX,
            textureOffsetY,
            130,
            65,
            isoX,
            isoY,
            130,
            65
          );
          context.drawImage(
            gegner,
            0,
            0,
            124,
            124,
            isoX + 10,
            isoY - 45,
            124,
            124
          );
        default:
          break;
      }
    }
  update();
  setTimeout(pathfinding, 1000);
  setTimeout(zeichneFeld, 10);
}
function update() {
  counter++;
}
