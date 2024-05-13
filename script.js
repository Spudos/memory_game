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
  }
}

// display a card value when clicked
cards.forEach(card => {
    // listen for the click
    card.addEventListener('click', () => {
      card.innerHTML = card.dataset.value;
      card.style.backgroundColor = 'lightblue';

      // add one to moves
      moves_taken += 1;
      console.log('moves: ' + moves_taken);
      
      // check if there are 2 cards in the array and call the comparison if so
      if (cards_selected.length < 2) {
        cards_selected.push(card.dataset.value);
        if (cards_selected.length > 1) {
         checkCardsSelected() 
        }
      }

      // reset the card innerhtml after half a second
      setTimeout(() => {
        card.innerHTML = '';
        card.style.backgroundColor = '';
    }, 500);
    });
});

// check if two cards match
function checkCardsSelected() {
  console.log(cards_selected)

  // compare the two elements of the array
  if (cards_selected[0] === cards_selected[1]) {
    console.log('The selected cards are equal');
  } else {
    console.log('The selected cards are not equal');
  }

  // clear the array once the two selected cards have been checked
  cards_selected = [];
}

// hide cards when two clicked
// keep track of number of moves
// write the high score to a file
// reset the current game



