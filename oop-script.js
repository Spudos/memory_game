class App {
  constructor() {
    this.resetButton = document.getElementById("reset-game");
    this.high_score = document.getElementById('high-score')
    this.showHighScore();
    resetButton.addEventListener("click", resetGame);
  }
  
  resetGame() {
    cards.forEach(card => {
        card.classList.remove('visible')
        card.classList.remove('matched')
    });
    moves_taken = 0
    moves.innerHTML=moves_taken
    cards_selected = []
    assignValueToCards()
  }

  updateHighScore(moves_taken) {
    if (moves_taken < getCookie() || getCookie() == 0 ) {
      document.cookie='high_score=' + moves_taken + '; expires=Mon, 23 Jun 2025 12:00:00 UTC';
      showHighScore();
    }
  }

  showHighScore() {
    let saved_high_score = getCookie()
  
    console.log(saved_high_score)
    this.high_score.innerHTML=saved_high_score
  }
  
  getCookie() {
    if (document.cookie.indexOf('high_score') >= 0) {
      return document.cookie.split('=').pop()
    } else {
      return 0
    }
  }
}

class Game {
  constructor() {
    this.difficultyButton = document.getElementById("set-difficulty");
    this.moves = document.getElementById('moves')
    this.trophy = document.getElementById('trophy')
    this.cards_selected = []
    this.moves_taken = 0
    this.difficulty = 'easy'
    this.assignValueToCards();
    this.difficultyButton.addEventListener("click", this.setDifficulty);

    this.cards = [
      document.getElementById('card-1'),
      document.getElementById('card-2'),
      document.getElementById('card-3'),
      document.getElementById('card-4'),
      document.getElementById('card-5'),
      document.getElementById('card-6'),
      document.getElementById('card-7'),
      document.getElementById('card-8'),
      document.getElementById('card-9'),
      document.getElementById('card-10'),
      document.getElementById('card-11'),
      document.getElementById('card-12'),
      document.getElementById('card-13'),
      document.getElementById('card-14'),
      document.getElementById('card-15'),
      document.getElementById('card-16')
    ]
  }

  setDifficulty() {
    if (difficulty == 'easy') {
      difficulty = 'hard'
      difficultyButton.innerHTML='Hard'
    } else {
      difficulty = 'easy'
      difficultyButton.innerHTML='Easy'
    }
  }

  assignValueToCards() {
    // create an array of values to assign to cards
    values = ['a','a','b','b','c','c','d','d','e','e','f','f','g','g','h','h']
  
    values.sort((a,b) => Math.random()-0.5)
  
    // assign these values to a card at random
    for (index in values) {
      this.cards[index].setAttribute('data-value', values[index])
      this.cards[index].classList.remove('hard', 'easy')
      if (difficulty == 'easy') {
        this.cards[index].classList.add('easy')
      } else {
        this.cards[index].classList.add('hard')
      }
    }
  }

  addEventListenerToCards() {
    // display a card value when clicked
    this.cards.forEach(card => {
      // listen for the click
      card.addEventListener('click', () => {
        if (!card.classList.contains('matched')) {
          card.classList.add('visible');

          // add one to moves
          this.moves_taken += 1;
          console.log('moves: ' + this.moves_taken);
          this.moves.innerHTML=this.moves_taken

          setTimeout(() => {
            this.updateBoard()
          }, 500);
        
          // check if there are 2 cards in the array and call the comparison if so
          this.cards_selected.push({card_value: card.dataset.value, card_id: card.getAttribute('id')});
          console.log(this.cards_selected)
          if (this.cards_selected.length === 2) {
            let match = this.cards_selected[0].card_value === this.cards_selected[1].card_value
            let id_match = this.cards_selected[0].card_id === this.cards_selected[1].card_id 

            // reset the card innerhtml after half a second
            if (match && !id_match) {
              console.log('The selected cards are different but have a matching value');
              this.cards.forEach(card => {
                if (card.dataset.value === this.cards_selected[0].card_value) { 
                  card.classList.add('matched')
                  card.classList.add('visible');
                }
              });
            }

            this.cards_selected = [];
          }
        };
        console.log(this.isGameComplete())
        if (this.isGameComplete()) {
          this.displayResults(this.moves_taken)
          this.updateHighScore()
        }
      });
    });
  }

  updateBoard() {
    this.cards.forEach(card => {
      if (card.classList.contains('visible') && !card.classList.contains('matched')) {
        card.classList.remove('visible')
      }
    });
  }

  isGameComplete() {
    let not_all_matched = this.cards.some(card => {
      console.log('matched test:' + card.classList.contains('matched'))
      return !card.classList.contains('matched');
    })
    if (not_all_matched === false) {
      return true
    } else {
      return false
    }
  };

  displayResults(moves_taken) {
    this.trophy.classList.add('visible')
    if (moves_taken <= 30) {
      this.trophy.setAttribute('data-value', 'gold')
    } else if (moves_taken <= 40) {
      this.trophy.setAttribute('data-value', 'silver')
    } else {
      this.trophy.setAttribute('data-value', 'bronze')
    }
  }
}
