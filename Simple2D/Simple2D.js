document.onkeydown = checkKey;

var feld = 
[
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 1, 0, 0, 0, 0, 0],
[0, 1, 1, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 1, 0, 0, 0, 0, 0, 0],
[0, 1, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0]

];
var figurX = 1;
var figurY = 2;
feld[figurY][figurX] = 2;

var kachel = new Image();
var stein = new Image();
var figur = new Image();
kachel.src = "green.gif";
stein.src = "blue.gif";
figur.src = "Onix.png";
var offsetX = 0;
var offsetY = 0;
var canvas, context;
Simple2D.addEventListener('');

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        moveUp();
    }
    else if (e.keyCode == '40') {
        moveDown();
    }
    else if (e.keyCode == '37') {
       moveLeft();
    }
    else if (e.keyCode == '39') {
       moveRight();
    }

}

function moveUp() {
	if (figurY > 0 && feld[figurY - 1][figurX] == 0) {
		feld[figurY][figurX] = 0;
		figurY--; //bewege die Figur ein Feld nach oben
		feld[figurY][figurX] = 2;
		zeichneFeld();
	}
	else if(feld[figurY - 1][figurX] == 1 && feld[figurY - 2][figurX] == 0) {
		feld[figurY - 1][figurX] = 0;
		feld[figurY - 2][figurX] = 1;
		moveUp();
	}
}
function moveDown() {
	if (figurY < feld.length -1 && feld[figurY + 1][figurX] == 0) {
		feld[figurY][figurX] = 0;
		figurY++;
		feld[figurY][figurX] = 2;
		zeichneFeld();
	}
	else if (feld[figurY + 1][figurX] == 1 && feld[figurY + 2][figurX] == 0) {
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
	}
	else if (feld[figurY][figurX - 1] == 1 && feld[figurY][figurX - 2] == 0) {
		feld[figurY][figurX - 1] = 0;
		feld[figurY][figurX - 2] = 1;
		moveLeft();
	}
}
function moveRight() {
	if (figurX < feld[0].length -1 && feld[figurY][figurX + 1] == 0) {
		feld[figurY][figurX] = 0;
		figurX++;
		feld[figurY][figurX] = 2;
		zeichneFeld();
	}
	else if (feld[figurY][figurX + 1] == 1 && feld[figurY][figurX + 2] == 0) {
		feld[figurY][figurX + 1] = 0;
		feld[figurY][figurX + 2] = 1;
		moveRight();
	}
}


function init() {
	canvas = document.getElementById("spielfeld");
	context = canvas.getContext("2d");
}


function zeichneFeld() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < feld.length; i++)
		for (let j = 0; j < feld[i].length; j++) {
			let x = j * kachel.width + offsetX;
			let y = i * kachel.height + offsetY;
			if (feld[i][j] == 0)	//normale Kachel
			{
				context.drawImage(kachel, x, y, kachel.width, kachel.height);
			}
			if (feld[i][j] == 1) //Hindernis
			{
				context.drawImage(stein, x, y, stein.width, stein.height);
			}
			if (feld[i][j] == 2) //Spielfigur
			{
				context.drawImage(figur, x, y, figur.width, figur.height);
			}
		}
}

