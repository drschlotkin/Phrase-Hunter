let game;

// Create new game object and start game on button click
document.getElementById('btn__reset').addEventListener('click', () => {
  game = new Game();  
  game.startGame();   
});


// Listen for virtual keyboard event
document.addEventListener('click', (e) => {
  let letter = e.target.textContent;
  if (e.target.value === '') game.handleInteraction(letter);  
});


// Listen for physical keyboard event once game is visible
document.addEventListener('keypress', (e) => {
  if (document.getElementById('overlay').style.visibility == 'hidden') {
    let letter = String.fromCharCode(e.keyCode);
    let reg = /[a-z]+/;
    if (reg.test(letter)) game.handleInteraction(letter);
  };
});


