class Card {
    constructor(suit, value, points) {
        this.value = value;
        this.suit = suit;
        this.points = points;
    }
}

class Deck {
    constructor() {
        this.cards = [];
    }
    createDeck() {
        let suits = [{name: 'Spades', symbol: '♠'}, {name: 'Clubs', symbol: '♣'}, {name: 'Diamonds', symbol: '♦'}, {name: 'Hearts', symbol: '♥'}];
        let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
        let points = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < values.length; j++) {
                this.cards.push(new Card (suits[i], values[j], points[j]));
            }
        }
    }
}

let player = [];
let computer = [];
let winnerName = '';
let winnerArray = [];

const shuffleBtn = document.querySelector('.shuffle-button');

const warBtn = document.querySelector('.war-button');
warBtn.style.display = 'none';

const tieBtn = document.querySelector('.tie-button');
tieBtn.style.display = 'none';

const resetBtn = document.querySelector('.reset-button');
resetBtn.style.display = 'none';

const tableP = document.querySelector('.table-P');
const tableC = document.querySelector('.table-C');

let cStats = document.querySelector('.c-stats');
let pStats = document.querySelector('.p-stats');
cStats.innerText = 'Cards in hand: ' + computer.length;
pStats.innerText = 'Cards in hand: ' + player.length;

let banner = document.querySelector('.text-banner');
banner.innerText = 'shuffle to begin...';

function checkWin() {
    if (computer.length === 0 || player.length === 0) {
        warBtn.style.display = 'none';
        if (computer.length === 0) {
            banner.innerText = 'GAME OVER, PLAYER WINS!'
        } else if (player.length === 0) {
            banner.innerText = 'GAME OVER, COMPUTER WINS!'
        }
        resetBtn.style.display = 'inline';
    }
}

function tieBreaker() {
    banner.innerText = '';
    if (computer.length >= 4 && player.length >= 4) {
        winnerArray.push(computer[0], computer[1], computer[2], computer[3], player[0], player[1], player[2], player[3]);
        computer = computer.slice(4);
        player = player.slice(4);
        roundWinner();
        if (winnerName === 'Computer') {
            computer.push(...winnerArray);
            winnerArray = [];
            tieBtn.style.display = 'none';
            warBtn.style.display = 'inline';
        }else if (winnerName === 'Player') {
            player.push(...winnerArray);
            winnerArray = [];
            tieBtn.style.display = 'none';
            warBtn.style.display = 'inline';
        };
    } else if (computer.length < 4) {
        let a = computer.length - 1;
        for (i = 0; i < a; i++) {
            winnerArray.push(computer[i]);
            computer.shift();
        };
        winnerArray.push(player[0], player[1], player[2], player[3]);
        player = player.slice(4);
        if (computer[0].points > player[3].points) {
            computer.push(...winnerArray);
            computer.push(player[0], player[1], player[2], player[3]);
            player = player.slice(4);
            winnerArray = [];
            tieBtn.style.display = 'none';
            warBtn.style.display = 'inline';
        } else if (computer[0].points < player[3].points) {
            player.push(...winnerArray);
            player.push(computer[0]);
            computer = [];
            tieBtn.style.display = 'none';
            warBtn.style.display = 'inline';
        } else { 
            winnerArray.push(player[0], player[1], player[2], player[3]);
            player = player.slice(4);
            roundWinner();
        };
    } else if (player.length < 4) {
        let a = player.length - 1;
        for (i = 0; i < a; i++) {
            winnerArray.push(player[i]);
            player.shift();
        };
        winnerArray.push(computer[0], computer[1], computer[2], computer[3]);
        computer = computer.slice(4);
        if (player[0].points > computer[3].points) {
            player.push(...winnerArray);
            player.push(computer[0], computer[1], computer[2], computer[3]);
            computer = computer.slice(4);
            winnerArray = [];
            tieBtn.style.display = 'none';
            warBtn.style.display = 'inline';
        } else if (player[0].points < computer[3].points) {
            computer.push(...winnerArray);
            computer.push(computer[0]);
            player = [];
            tieBtn.style.display = 'none';
            warBtn.style.display = 'inline';
        } else {
            winnerArray.push(computer[0], computer[1], computer[2], computer[3]);
            computer = computer.slice(4);
            roundWinner();
        };
    }
}

function roundWinner() {
    if (computer.length >= 4 && player.length >=4) {
        if (computer[3].points > player[3].points) {
            for (let i=0; i < 4; i++) {
                computer.push(computer.shift())
            };
            computer.push(player[0], player[1], player[2], player[3]);
            player = player.slice(4);
            winnerName = 'Computer';
            banner.innerText = 'Computer wins!'
        } else if (computer[3].points < player[3].points) {
            for (let i=0; i < 4; i++) {
                player.push(player.shift())
            };
            player.push(computer[0], computer[1], computer[2], computer[3]);
            computer = computer.slice(4);
            winnerName = 'Player';
            banner.innerText = 'Player wins!';
        } else {
            warBtn.style.display = 'none';
            tieBtn.style.display = 'inline';
            banner.innerText = 'it`s a tie!';
        } 
    }else if (computer.length < 4) {
        let a = computer.length - 1;
        if (computer[a].points > player[3].points) {
            computer.push(player[0], player[1], player[2], player[3]);
            for (let i = 0; i < computer.length; i++) {
                computer.push(computer.shift())
            };
            player = player.slice(4);
            winnerName = 'Computer';
            banner.innerText = 'Computer wins!'
        } else if (computer[a].points < player[3].points) {
            for (let i = 0; i < 4; i++) {
                player.push(player.shift())
            };
            player.push(...computer);
            computer = [];
            winnerName = 'Player';
            banner.innerText = 'Player wins!';
        } else {
            warBtn.style.display = 'none';
            tieBtn.style.display = 'inline';
            banner.innerText = 'it`s a tie!';
        }
    }else if (player.length < 4) {
        let a = player.length - 1;
        if (player[a].points > computer[3].points) {
            player.push(computer[0], computer[1], computer[2], computer[3]);
            for (let i = 0; i < player.length; i++) {
                player.push(player.shift())
            };
            computer = computer.slice(4);
            winnerName = 'Player';
            banner.innerText = 'Player wins!';
        } else if (player[a].points < computer[3].points) {
            for (let i = 0; i < 4; i++) {
                computer.push(computer.shift())
            };
            computer.push(...player);
            player = [];
            winnerName = 'Computer';
            banner.innerText = 'Computer wins!'
        } else {
            warBtn.style.display = 'none';
            tieBtn.style.display = 'inline';
            banner.innerText = 'it`s a tie!';
        }
    }
}

function renderCard(item) {
    let cardDrawn = document.createElement('div');
    cardDrawn.className = 'card';
    let topNumber = document.createElement('div');
    topNumber.innerText = item.value.toString().charAt(0);
    topNumber.className = 'top';
    let bottomNumber = document.createElement('div');
    bottomNumber.innerText = item.value.toString().charAt(0);
    bottomNumber.className = 'right';
    let suit = document.createElement('div');
    suit.innerText = item.suit.symbol;
    suit.className = 'suit'; 
    cardDrawn.append(topNumber);
    cardDrawn.append(bottomNumber);
    cardDrawn.append(suit);
    return cardDrawn;
}

shuffleBtn.addEventListener('click', () => {
    let deck = new Deck;
    deck.createDeck();
    deck.cards.sort(() => Math.random() - 0.5);
        for (let i = 0; i < deck.cards.length; i++) {
            if (i % 2 === 0) player.push(deck.cards[i]);
            else computer.push(deck.cards[i]);
        }
        shuffleBtn.style.display = 'none';
        warBtn.style.display = 'inline';
        banner.innerText = '';
        cStats.innerText = 'Cards in hand: ' + computer.length;
        pStats.innerText = 'Cards in hand: ' + player.length;
});

warBtn.addEventListener('click', (e) => {
    tableC.firstElementChild.remove();
    tableP.firstElementChild.remove();
    if (computer.length >= 4) {
        tableC.appendChild(renderCard(computer[3]));
    } else if (computer.length < 4) {
        let a = computer.length - 1;
        tableC.appendChild(renderCard(computer[a]));
    };
    if (player.length >= 4) {
        tableP.appendChild(renderCard(player[3]));
    } else if (player.length < 4) {
        let a = player.length - 1;
        tableP.appendChild(renderCard(player[a]));
    };
    roundWinner();
    cStats.innerText = 'Cards in hand: ' + computer.length;
    pStats.innerText = 'Cards in hand: ' + player.length;
    checkWin();
})

tieBtn.addEventListener('click', (e) => {
    tableC.firstElementChild.remove();
    tableP.firstElementChild.remove();
    if (computer.length >= 8) {
        tableC.appendChild(renderCard(computer[7]));
    } else if (computer.length < 8) {
        let a = computer.length - 1;
        tableC.appendChild(renderCard(computer[a]));
    };
    if (player.length >= 8) {
        tableP.appendChild(renderCard(player[7]));
    } else if (player.length < 8) {
        let a = player.length - 1;
        tableP.appendChild(renderCard(player[a]));
    };
    tieBreaker();
    cStats.innerText = 'Cards in hand: ' + computer.length;
    pStats.innerText = 'Cards in hand: ' + player.length;
    checkWin();
})

resetBtn.addEventListener('click', (e) => {
    player = [];
    computer = [];
    cStats.innerText = 'Cards in hand: ' + computer.length;
    pStats.innerText = 'Cards in hand: ' + player.length;
    resetBtn.style.display = 'none';
    shuffleBtn.style.display = 'inline';
    tableC.firstElementChild.remove();
    tableP.firstElementChild.remove();
    tableC.appendChild(document.createElement('div'));
    tableP.appendChild(document.createElement('div'));
    banner.innerText = 'let`s get started...';
})

