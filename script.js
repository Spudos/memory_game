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



// assign a value to all cards
function assignValueToCards() {
  // create an array of values to assign to cards
  values = ['a','a','b','b','c','c','d','d','e','e','f','f','g','g','h','h']

  values.sort((a,b) => Math.random()-0.5)
  console.log(values)
  
  // assign these values to a card at random
  for (index in values) {
    cards[index].setAttribute('data-value', values[index])
  }
}

// display a card value when clicked
// check if two cards match
// hide cards when two clicked
// keep track of number of moves
// write the high score to a file
// reset the current game



