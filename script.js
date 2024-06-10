const cards = [
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

const high_score = document.getElementById('high-score')
const moves = document.getElementById('moves')
const reset = document.getElementById('reset-game')
let cards_selected = []
let moves_taken = 0

document.addEventListener('DOMContentLoaded', function() {
  assignValueToCards();
});

// assign a value to all cards
function assignValueToCards() {
  // create an array of values to assign to cards
  values = ['a','a','b','b','c','c','d','d','e','e','f','f','g','g','h','h']

  values.sort((a,b) => Math.random()-0.5)
  
  // assign these values to a card at random
  for (index in values) {
    cards[index].setAttribute('data-value', values[index])
    cards[index].classList.add('icon-' + values[index])
  }
}

// display a card value when clicked
cards.forEach(card => {
    // listen for the click
    card.addEventListener('click', () => {
      if (!card.classList.contains('matched')) {
        card.classList.add('visible');

        // add one to moves
        moves_taken += 1;
        console.log('moves: ' + moves_taken);
        moves.innerHTML=moves_taken

        setTimeout(() => {
          updateBoard()
        }, 500);
      
        // check if there are 2 cards in the array and call the comparison if so
      
        cards_selected.push({card_value: card.dataset.value, card_id: card.getAttribute('id')});
        console.log(cards_selected)
        if (cards_selected.length === 2) {
          let match = cards_selected[0].card_value === cards_selected[1].card_value
          let id_match = cards_selected[0].card_id === cards_selected[1].card_id 

        // reset the card innerhtml after half a second
        if (match && !id_match) {
          console.log('The selected cards are different but have a matching value');
          cards.forEach(card => {
            if (card.dataset.value === cards_selected[0].card_value) { 
              card.classList.add('matched')
              card.classList.add('visible');
            }
          });
        }

        cards_selected = [];
      }
    };
    console.log(isGameComplete())
    if (isGameComplete()) {
      updateHighScore()
    }
  });
});

function updateBoard() {
  cards.forEach(card => {
    if (card.classList.contains('visible') && !card.classList.contains('matched')) {
      card.classList.remove('visible')
    }
  });
}

function isGameComplete() {
  let not_all_matched = cards.some(card => {
    console.log('matched test:' + card.classList.contains('matched'))
    return !card.classList.contains('matched');
  })
  if (not_all_matched === false) {
    return true
  } else {
    return false
  }
};

function updateHighScore() {
    // update cookie with high score value if necessary
  console.log('Final moves count: ' + moves_taken);
}
