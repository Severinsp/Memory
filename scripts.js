const cards = document.querySelectorAll('.memory-card');



let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var count = 0;
var player1 = true;
var points1 = 0;
var points2 = 0;
var bot = false;
const cardarray = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];

updateScore();




window.onload = function() {
 
}

function BesteKartensuche() {
    var card1;
    var card2;
    var card3;
    var card4;
    var stop = false;
    if (document.getElementById("memory-game-big").style.visibility !== "visible") {
        for (var i = 1; i <= 6; i++) {
            var twocards = 0;
            for (var k = 0; k <= 11; k++) {
                if (!stop) {
                    if ("P" + i == cardarray[k]) {
                        twocards++;
                        if (twocards == 2) {
                            card2 = k;
                            stop = true;
                        } else {
                            card1 = k;
                        }
                    } else if (cardarray[k] == "0") {
                        if (card3 == undefined) {
                            card3 = k;
                        } else {
                            card4 = k;
                        }
                    }
                }
            }
        }
    } else {
        for (var i = 1; i <= 12; i++) {
            var twocards = 0;
            for (var k = 12; k <= 35; k++) {
                if (!stop) {
                    if ("P" + i == cardarray[k]) {
                        twocards++;
                        if (twocards == 2) {
                            card2 = k;
                            stop = true;
                        } else {
                            card1 = k;
                        }
                    } else if (cardarray[k] == "0") {
                        if (card3 == undefined) {
                            card3 = k;
                        } else {
                            card4 = k;
                        }
                    }
                }
            }
        }
    }
    var retur = card1 + " " + card2;
    if (card2 == undefined) { retur = card3 + " " + "Again"; }
    if (card1 == undefined) { retur = card3 + " " + card4; }
    return retur;
}

function BesteKartensuche2(card1) {
    var card2;
    var card3;
    var stop = false;
    if (document.getElementById("memory-game-big").style.visibility !== "visible") {
        var twocards = 0;
        for (var k = 0; k <= 11; k++) {
            firstCard = cards[card1];
            if (firstCard.dataset.framework == cardarray[k]) {
                if (card1 != k) {
                    card2 = k;
                }
            }
            if (cardarray[k] == "0") {
                card3 = k;
            }
        }
    } else {
        var twocards = 0;
        for (var k = 12; k <= 35; k++) {
            firstCard = cards[card1];
            if (firstCard.dataset.framework == cardarray[k]) {
                if (card1 != k) {
                    card2 = k;
                }
            }
            if (cardarray[k] == "0") {
                card3 = k;
            }
        }
    }
    var retur = card1 + " " + card2;
    if (card2 == undefined) { retur = card1 + " " + card3; }
    return retur;
}

function Bot() {
    var bestCards = BesteKartensuche();
    const bestCardsArray = bestCards.split(" ");
    if (bestCardsArray[1] == "Again") {
        setTimeout(() => {
            firstCard = cards[bestCardsArray[0]];
            firstCard.classList.add('flip');
            cardarray[bestCardsArray[0]] = firstCard.dataset.framework;
            setTimeout(() => {
                var bestCards2 = BesteKartensuche2(bestCardsArray[0]);
                const bestCardsArray2 = bestCards2.split(" ");
                firstCard = cards[bestCardsArray2[0]];
                secondCard = cards[bestCardsArray2[1]];
                secondCard.classList.add('flip');
                cardarray[bestCardsArray2[1]] = secondCard.dataset.framework;
                checkForMatch();
            }, 1500);
        }, 1500);
    } else {
        setTimeout(() => {
            firstCard = cards[bestCardsArray[0]];
            secondCard = cards[bestCardsArray[1]];
            firstCard.classList.add('flip');
            setTimeout(() => {
                secondCard.classList.add('flip');
                cardarray[bestCardsArray[0]] = firstCard.dataset.framework;
                cardarray[bestCardsArray[1]] = secondCard.dataset.framework;
                checkForMatch();
            }, 1500);
        }, 1500);
    }
    console.log(firstCard);
    console.log(secondCard);
}

function flipCard() {
    if (bot) return;
    if (lockBoard) return;
    if (this === firstCard) return;

    for (var i = 0; i <= 35; i++) {
        if (this == cards[i]) {
            cardarray[i] = this.dataset.framework;
        }
    }


    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // second click
    hasFlippedCard = false;
    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function checkCard(card) {
    return card == firstCard.dataset.framework;
}

function disableCards() {
    cardarray[cardarray.findIndex(checkCard)] = "OFF";
    cardarray[cardarray.findIndex(checkCard)] = "OFF";
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    if (player1) {
        points1++;
    } else {
        points2++;
    }
    updateScore();
    count++;
    if (document.getElementById("memory-game-big").style.visibility == "visible") {
        if (count >= 12) {
            endGame();
        }
    } else {
        if (count >= 6) {
            endGame();
        }
    }

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        player1 = !player1;
        if (localStorage.getItem("einzelspieler") == "true") {
            bot = !bot;
        }
        updateScore();
      
          
            // Set the class of the body element
            
        resetBoard();
    }, 1500);
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function endGame() {
    setTimeout(() => {
        if (points1 > points2) { document.getElementById("title").textContent = "Spieler 1 hat gewonnen"; 
        const hey = document.getElementById("title");
        document.getElementById("Canvas").style.visibility = "visible";
        hey.classList.remove("title")
        hey.classList.add("rainbow")
        hey.classList.add("rainbow_text_animated")
        
        document.getElementById("title").style.visibility = "visible";
        document.getElementById("memory-game").style.visibility = "hidden";
        document.getElementById("hide").style.visibility = "hidden";
        document.getElementById("visib").style.visibility = "visible";

       
            
            
          
        
        

        } else if (points1 < points2) { 
    
       
        if(bot == true){
            document.getElementById("endscreen").style.visibility = "visible";
            document.getElementById("title").textContent = "Bot hat gewonnen"; 
            document.getElementById("memory-game").style.visibility = "hidden";
            document.getElementById("title").style.visibility = "visible";
            document.getElementById("hide").style.visibility = "hidden";
            document.getElementById("Canvas").style.visibility = "hidden";
            document.getElementById("visib").style.visibility = "visible";


        }
        else{
        document.getElementById("title").textContent = "Spieler 2 hat gewonnen"; 
        const hey = document.getElementById("title");
        document.getElementById("Canvas").style.visibility = "visible";
        hey.classList.remove("title")
        hey.classList.add("rainbow")
        hey.classList.add("rainbow_text_animated")
        
        document.getElementById("title").style.visibility = "visible";
        document.getElementById("memory-game").style.visibility = "hidden";
        document.getElementById("hide").style.visibility = "hidden";
        document.getElementById("visib").style.visibility = "visible";

     }
    
    
    
    
        } else { document.getElementById("title").textContent = "Unentschieden";
    
    
        document.getElementById("endscreen").style.visibility = "visible";
        document.getElementById("memory-game").style.visibility = "hidden";
        document.getElementById("title").style.visibility = "visible";
        document.getElementById("hide").style.visibility = "hidden";
        document.getElementById("Canvas").style.visibility = "hidden";
    
    
    
    
    }

        
       

       
    }, 1500);
}

function resetGame() {
    cards.forEach(card => card.classList.remove('flip'));
    setTimeout(function() {
        window.location.reload();
    }, 200);
}

function changeBigGame() {
    //document.getElementById("memory-card").style.height = "15%";
    //document.getElementById("memory-card").style.backgroundColor = "red";
    document.getElementById("memory-game-big").style.visibility = "visible";
    document.getElementById("memory-game").style.visibility = "hidden";
    count = 0;
    points1 = 0;
    points2 = 0;
    player1 = true;
    updateScore();
}

function updateScore() {
    document.getElementById("LabelPoints").textContent = points1 + " - " + points2;
    if (player1) {
        document.getElementById("LabelWHO").textContent = "Spieler 1 ist am Zug";
       
        
    } else {
        if (localStorage.getItem("einzelspieler") == "true") {
            document.getElementById("LabelWHO").textContent = "Der Bot wird seinen Zug machen";
            bot = true;
            Bot();
        } else {
            document.getElementById("LabelWHO").textContent = "Spieler 2 ist am Zug";
        }
    }
}

function OpenIndex() {
    window.open("index.html", "_self");
}

function OpenGame(bool) {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        // Store
        if (bool) { localStorage.setItem("einzelspieler", "true"); } else { localStorage.setItem("einzelspieler", "false"); }

    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }
    window.open("Game.html", "_self");
    
    
}

//shuffle ausgeklammert um einfacher zu testen
/* (function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
})(); */





cards.forEach(card => card.addEventListener('click', flipCard));

function load(){
var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");

var cwidth, cheight;
var shells = [];
var pass= [];

var colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'];

window.onresize = function() { reset(); }
reset();
function reset() {

  cwidth = window.innerWidth;
	cheight = window.innerHeight;
	c.width = cwidth;
	c.height = cheight;
}

function newShell() {

  var left = (Math.random() > 0.5);
  var shell = {};
  shell.x = (1*left);
  shell.y = 1;
  shell.xoff = (0.01 + Math.random() * 0.007) * (left ? 1 : -1);
  shell.yoff = 0.01 + Math.random() * 0.007;
  shell.size = Math.random() * 6 + 3;
  shell.color = colors[Math.floor(Math.random() * colors.length)];

  shells.push(shell);
}

function newPass(shell) {

  var pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);

  for (i = 0; i < pasCount; i++) {

    var pas = {};
    pas.x = shell.x * cwidth;
    pas.y = shell.y * cheight;

    var a = Math.random() * 4;
    var s = Math.random() * 10;

	pas.xoff = s *  Math.sin((5 - a) * (Math.PI / 2));
  	pas.yoff = s *  Math.sin(a * (Math.PI / 2));

    pas.color = shell.color;
    pas.size = Math.sqrt(shell.size);

    if (pass.length < 1000) { pass.push(pas); }
  }
}

var lastRun = 0;
Run();
function Run() {

  var dt = 1;
  if (lastRun != 0) { dt = Math.min(50, (performance.now() - lastRun)); }
	lastRun = performance.now();

  //ctx.clearRect(0, 0, cwidth, cheight);
	ctx.fillStyle = "rgba(0,0,0,0.25)";
	ctx.fillRect(0, 0, cwidth, cheight);

  if ((shells.length < 10) && (Math.random() > 0.96)) { newShell(); }

  for (let ix in shells) {

    var shell = shells[ix];

    ctx.beginPath();
    ctx.arc(shell.x * cwidth, shell.y * cheight, shell.size, 0, 2 * Math.PI);
    ctx.fillStyle = shell.color;
    ctx.fill();

    shell.x -= shell.xoff;
    shell.y -= shell.yoff;
    shell.xoff -= (shell.xoff * dt * 0.001);
    shell.yoff -= ((shell.yoff + 0.2) * dt * 0.00005);

    if (shell.yoff < -0.005) {
      newPass(shell);
      shells.splice(ix, 1);
    }
  }

  for (let ix in pass) {

    var pas = pass[ix];

    ctx.beginPath();
    ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI);
    ctx.fillStyle = pas.color;
    ctx.fill();

    pas.x -= pas.xoff;
    pas.y -= pas.yoff;
    pas.xoff -= (pas.xoff * dt * 0.001);
    pas.yoff -= ((pas.yoff + 5) * dt * 0.0005);
    pas.size -= (dt * 0.002 * Math.random())

    if ((pas.y > cheight)  || (pas.y < -50) || (pas.size <= 0)) {
        pass.splice(ix, 1);
    }
  }
  
  requestAnimationFrame(Run);
}
}