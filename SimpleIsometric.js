document.onkeydown = checkKey;

var feld =
	[
		[1, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
var figurX = 1;
var figurY = 2;
feld[figurY][figurX] = 2;
var item;
var kachel = new Image();
var stein = new Image();
var figur = new Image();
kachel.src = "./Assets/IsometricTRPGAssetPack/Layer 1_Isometric tiles030.png";
stein.src = "./Assets/IsometricTRPGAssetPack/Layer 1_Isometric tiles035.png";
figur.src = "./2.png";
var offsetX = 400;
var offsetY = 100;
var canvas, context;
Simple2D.addEventListener('');

function checkKey(e) {

	e = e || window.event;

	if (e.keyCode == '39') {
		//figur.src = "./Charakter/slime_back.png";
		moveUp();
	}
	else if (e.keyCode == '37') {
		//figur.src = "./Charakter/slime_left.png";
		moveDown();
	}
	else if (e.keyCode == '38') {
		//figur.src =	"./Charakter/slime_back.png";  
		moveLeft();
	}
	else if (e.keyCode == '40') {
		//figur.src = "./Charakter/slime_right.png";
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
	else if (feld[figurY - 1][figurX] == 1 && feld[figurY - 2][figurX] == 0) {
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
	if (figurX < feld[0].length - 1 && feld[figurY][figurX + 1] == 0) {
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

function resize(newRows, newCols) {
	newRows = newRows + feld.length-1;
	newCols = newCols + feld.length-1;
	for (var i = 0; i < newRows; i++) {
		item = feld[i] || (feld[i] = []);
	
		for (var k = item.length; k < newCols; k++)
			item[k] = 0;    
	}
	zeichneFeld();
}
function init() {
	canvas = document.getElementById("spielfeld");
	context = canvas.getContext("2d");
}

function zeichneFeld() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < 10; i++)
		for (let j = 0; j < 10; j++) {
			let x = j * kachel.height;
			let y = i * kachel.height;
			let isoX = x - y + offsetX;
			let isoY = (x + y) / 2 + offsetY;

			switch (feld[i][j]) {
				case 0:
					context.drawImage(kachel, isoX, isoY, kachel.width, kachel.height);
					break;
				case 1:
					isoY -= stein.height - kachel.height;
					context.drawImage(stein, isoX, isoY, stein.width, stein.height);
					break;
				case 2:
					isoY -= figur.height - kachel.height;
					context.drawImage(figur, isoX, isoY, figur.width, figur.height);
					break;

				default:
					break;
			}
		}
}

