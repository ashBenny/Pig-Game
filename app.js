/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


let player;
let playingStatus;
let currentScore;
let totalScore;

// START NEW GAME / SETTING INITIAL CONDITION

document.querySelector(".btn-new").addEventListener("click", startGame);

function startGame() {

  player = 0;
  playingStatus = true;
  currentScore = 0;
  totalScore = [0,0];
  

  // Reseting text contents to zero
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".dice").style.display = "none";

  // Removing classes
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.add("active");
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  // Disabling the buttons
  document.getElementsByClassName("btn-hold").disabled = false;
  document.getElementsByClassName("btn-roll").disabled = false;
}

startGame();


// CHANGE PLAYER FUNCTION

function changePlayer() {

  // Checking for the current player
  player == 1 ? (player = 0) : (player = 1);
  currentScore = 0;

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}


// WHILE ROLLING DICE 

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (playingStatus == true) {
    
    // Random digits genaration
    let count = Math.floor(Math.random() * 6) + 1;

    let diceImage = document.querySelector(".dice");
    diceImage.style.display = "inline";

    // Checking for the count values
    if (count == 1) {
      diceImage.src = "dice-1.png"
      setTimeout(function(){
        changePlayer();
      },1000)
      
    } else {
      if (count == 2){
        diceImage.src = "dice-2.png"
      } else if (count == 3){
        diceImage.src = "dice-3.png"
      } else if (count == 4){
        diceImage.src = "dice-4.png"
      } else if (count == 5){
        diceImage.src = "dice-5.png"
      } else {
        diceImage.src = "dice-6.png"
      }

      currentScore += count;
      document.getElementById("current-" + player).textContent = currentScore;
    }
  }
});


// WHILE HOLDING BUTTON
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (playingStatus == true) {

    // Adding total current score value to the totalScore array
    totalScore[player] += currentScore;

    // Displaying the values in UI
    if(player == 0) {
      document.querySelector("#score-0").textContent = totalScore[player];
    } else {
      document.querySelector("#score-1").textContent = totalScore[player];
    }

    // Checking for the Winner score 
    if (totalScore[player] >= 30) {

      if(player == 0){
        document.querySelector("#name-0").textContent = `Player-1 is the winner`;
        document.querySelector(".player-0-panel").classList.remove("active");
        document.querySelector(".player-0-panel").classList.add("winner");
      } else {
        document.querySelector("#name-1").textContent = `Player-2 is the winner`;
        document.querySelector(".player-1-panel").classList.remove("active");
        document.querySelector(".player-1-panel").classList.add("winner");
      }

      document.querySelector(".dice").style.display = "none";
      playingStatus = false;

      document.getElementsByClassName("btn-hold").disabled = true;
      document.getElementsByClassName("btn-roll").disabled = true;

    } else {
      changePlayer();
    }
  }
});




