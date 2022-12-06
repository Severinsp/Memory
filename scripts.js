const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var count = 0;
var player1 = true;
var points1 = 0;
var points2 = 0;
var einzelspieler = true;


updateScore();


window.onload = function() {
    console.log('Dokument geladen');
    //document.getElementById('memory-game').innerHTML = ``;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

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

function disableCards() {
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
        updateScore();
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
        if (points1 > points2) { document.getElementById("title").textContent = "Spieler 1 hat gewonnen"; } else if (points1 < points2) { document.getElementById("title").textContent = "Spieler 2 hat gewonnen"; } else { document.getElementById("title").textContent = "Unentschieden"; }

        document.getElementById("endscreen").style.visibility = "visible";
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
        if (einzelspieler == true) {
            document.getElementById("LabelWHO").textContent = "Der Bot wird seinen Zug machen";
        } else {
            document.getElementById("LabelWHO").textContent = "Spieler 2 ist am Zug";
        }
    }
}

function OpenIndex() {
    window.open("index.html", "_self");
}

function OpenGameE() {
    window.open("Game.html", "_self");
}

function OpenGameM() {
    window.open("Game.html", "_self");
    einzelspieler = false;
    console.log(einzelspieler);
}

//shuffle ausgeklammert um einfacher zu testen
(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
})();


cards.forEach(card => card.addEventListener('click', flipCard));