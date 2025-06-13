
class RockPaperScissors {
  constructor() {
    this.score = 12;
    this.choices = ['rock', 'paper', 'scissors'];
    this.rules = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper'
    };

    this.loadScore();
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateScore();
  }

  bindEvents() {
    // Choice buttons
    document.querySelectorAll('.choice').forEach(button => {
      button.addEventListener('click', (e) => {
        const choice = e.currentTarget.dataset.choice;
        this.playGame(choice);
      });
    });

    // Play again button
    document.getElementById('playAgainBtn').addEventListener('click', () => {
      this.resetGame();
    });

    // Rules modal
    document.getElementById('rulesBtn').addEventListener('click', () => {
      this.showRules();
    });

    document.getElementById('closeBtn').addEventListener('click', () => {
      this.hideRules();
    });

    document.getElementById('modalOverlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.hideRules();
      }
    });

    // Keyboard events
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideRules();
      }
    });
  }

  playGame(playerChoice) {
    const houseChoice = this.getHouseChoice();
    const result = this.determineWinner(playerChoice, houseChoice);

    this.showResult(playerChoice, houseChoice, result);
    this.updateScore(result);
  }

  getHouseChoice() {
    const randomIndex = Math.floor(Math.random() * this.choices.length);
    return this.choices[randomIndex];
  }

  determineWinner(playerChoice, houseChoice) {
    if (playerChoice === houseChoice) {
      return 'tie';
    }

    if (this.rules[playerChoice] === houseChoice) {
      return 'win';
    }

    return 'lose';
  }

  showResult(playerChoice, houseChoice, result) {
    // Hide selection phase
    document.getElementById('selectionPhase').classList.add('hidden');

    // Show result phase
    const resultPhase = document.getElementById('resultPhase');
    resultPhase.classList.remove('hidden');

    // Set player choice
    const playerChoiceDisplay = document.getElementById('playerChoiceDisplay');
    const playerChoiceIcon = document.getElementById('playerChoiceIcon');
    playerChoiceDisplay.className = `choice-display ${playerChoice}`;
    playerChoiceIcon.src = `icon-${playerChoice}.svg`;
    playerChoiceIcon.alt = playerChoice;

    // Set house choice
    const houseChoiceDisplay = document.getElementById('houseChoiceDisplay');
    const houseChoiceIcon = document.getElementById('houseChoiceIcon');
    houseChoiceDisplay.className = `choice-display ${houseChoice}`;
    houseChoiceIcon.src = `icon-${houseChoice}.svg`;
    houseChoiceIcon.alt = houseChoice;

    // Set result text
    const resultText = document.getElementById('resultText');
    if (result === 'win') {
      resultText.textContent = 'YOU WIN';
    } else if (result === 'lose') {
      resultText.textContent = 'YOU LOSE';
    } else {
      resultText.textContent = 'TIE';
    }
  }

  resetGame() {
    // Hide result phase
    document.getElementById('resultPhase').classList.add('hidden');

    // Show selection phase
    document.getElementById('selectionPhase').classList.remove('hidden');
  }

  updateScore(result) {
    if (result === 'win') {
      this.score++;
    } else if (result === 'lose') {
      this.score--;
    }

    // Ensure score doesn't go below 0
    this.score = Math.max(0, this.score);

    document.getElementById('score').textContent = this.score;

    // Store score in localStorage only if result is provided
    if (result) {
      localStorage.setItem('rpsScore', this.score.toString());
    }
  }

  loadScore() {
    const savedScore = localStorage.getItem('rpsScore');
    if (savedScore !== null) {
      this.score = parseInt(savedScore, 10);
    }
  }

  showRules() {
    document.getElementById('modalOverlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  hideRules() {
    document.getElementById('modalOverlay').classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const game = new RockPaperScissors();
});
