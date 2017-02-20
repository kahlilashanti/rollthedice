/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;

init();

//getter
//var x = document.querySelector('#score-0').textContent;

document.querySelector('.btn-roll').addEventListener('click', function(){
  //what happens when someone clicks the button?
  //first we need a random number
  var dice = Math.floor(Math.random() *6) + 1

  //then we need to display the result
  var diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';


  //then update round score but only if the rolled number was not a 1

  if(dice !== 1){//if dice is different from 1
    //add score
    roundScore += dice;
    //then display the score
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    //next player
    nextPlayer();
  }


});

document.querySelector('.btn-hold').addEventListener('click', function(){
  //add current score to players global score
  scores[activePlayer] += roundScore;

  //update UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  //check if player won the game?
  if (scores[activePlayer] >= 20){
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  } else {
    nextPlayer();
  }

  // //next player
  // nextPlayer();



});

function nextPlayer(){
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');


  document.querySelector('.dice').style.display = 'none'
}

//start a new game
document.querySelector('.btn-new').addEventListener('click', init);

//this starts the game
function init(){
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;

  document.querySelector('.dice').style.display = 'none'
  //sets all current values to zero
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  //sets all current values to zero
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');
}
