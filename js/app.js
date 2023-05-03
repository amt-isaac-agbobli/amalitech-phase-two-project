class RockPaperScissors {
    constructor() {
        this.scoreLabel = document.querySelector('.value');
        this.gameOptions = document.querySelector('.game-options');
        this.resultContainer = document.querySelector('.result-container');
        this.resetBtn = document.querySelector('.play-again');
        this.userImg = document.getElementById('user');
        this.compImg = document.getElementById('machine');
        this.buttons = document.querySelectorAll('.button');
        this.player = document.getElementById('player');
        this.computer = document.getElementById('computer');
        this.resultBox = document.querySelector('.result-title');
        this.hideComputerChoice = document.querySelector('.invisible');
        this.gameResult = document.getElementById('status');
        this.userChoice = undefined;
        this.computerChoice = undefined;
        this.winner = undefined;
        this.score = localStorage.getItem("score") ? Number(localStorage.getItem("score")) : 0;
        this.init();
    }

    init() {
        this.buttons.forEach((button) => {
            button.addEventListener('click', () => {
                this.userChoice = button.id;
                this.computerChoice = this.computerGen();
                this.checkWinner();
                this.displayResult();
            });
        });

        this.resetBtn.addEventListener('click', () => this.reset());
        this.scoreLabel.innerText = this.score;

        document.querySelector('.rules').addEventListener('click', () => {
            document.querySelector('.rules-overlay').classList.add('active');
        });

        document.querySelector('.cross-btn').addEventListener('click', () => {
            document.querySelector('.rules-overlay').classList.remove('active');
        });
    }

    computerGen() {
        const choices = ['paper', 'scissors', 'rock'].filter(choice => choice !== this.userChoice);
        return choices[Math.floor(Math.random() * choices.length)];
    }

    updateScore(value) {
        this.score += value;
        this.scoreLabel.innerHTML = this.score;
        localStorage.setItem("score", `${this.score}`);
    }

    checkWinner() {
        if (
            (this.userChoice === 'rock' && this.computerChoice === 'scissors') ||
            (this.userChoice === 'paper' && this.computerChoice === 'rock') ||
            (this.userChoice === 'scissors' && this.computerChoice === 'paper')
        ) {
            this.gameResult.innerText = "you win";
            this.winner = this.userChoice;
            this.updateScore(1);
        } else {
            this.gameResult.innerText = "you lose";
            this.winner = this.computerChoice;
            this.updateScore(0);
        }
    }

    displayResult() {
        this.gameOptions.classList.add('active');
        this.resultContainer.classList.add('active');
        this.player.classList.add(this.userChoice);
        this.computer.classList.add(this.computerChoice);

        this.userImg.src = `images/icon-${this.userChoice}.svg`;
        this.compImg.src = `images/icon-${this.computerChoice}.svg`;

        setTimeout(() => {
            this.load();
            this.showComputerChoice();
        }, 3500);
    }

    load() {
        this.resultContainer.classList.add('load');
        this.resultBox.classList.add('active');
        if (this.winner === this.userChoice) {
            this.player.classList.add('effect-left');
        } else {
            this.computer.classList.add('effect-right');
        }
    }

    showComputerChoice() {
        this.hideComputerChoice.classList.add('active');
   
    }
    reset() {
        this.gameOptions.classList.remove('active');
        this.resultContainer.classList.remove('active');
        this.player.classList.remove(this.userChoice);
        this.computer.classList.remove(this.computerChoice);
        this.player.classList.remove('effect-left');
        this.computer.classList.remove('effect-right');
        this.resultContainer.classList.remove('load');
        this.resultBox.classList.remove('active');
        this.hideComputerChoice.classList.remove('active');
    }
}

// Instantiate the RockPaperScissors game on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => new RockPaperScissors());
