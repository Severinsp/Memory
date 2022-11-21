const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var count = 0;
var player1 = true;

if (player1) {
    //document.getElementById("endscreen").style.visibility = "visible";
    document.getElementById("LabelWHO").style.visibility == "hidden"
}

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
    console.log(count);
    setTimeout(() => {
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
    document.getElementById("memory-game-big").style.visibility = "visible";
    document.getElementById("memory-game").style.visibility = "hidden";
    count = 0;
}

//shuffle ausgeklammert um einfacher zu testen
(function shuffle() {
    /* cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    }); */
})();


cards.forEach(card => card.addEventListener('click', flipCard));