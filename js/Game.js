class Game {
    
  // Game state variables and create phrase objects
  constructor() {
    this.missed = 0;
    this.activePhrase = null;
    this.phrases = [new Phrase('The ship has sailed'),
                    new Phrase('Time is money'), 
                    new Phrase('Weather the storm'), 
                    new Phrase('Fit as a fiddle'),
                    new Phrase('Live and Learn')];             
  };
  

  // Show keyboard screen and select random phrase to be displayed on screen
  startGame() {
    document.getElementById('overlay').style.visibility = 'hidden';
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay(); 
  };


  // Display user selected letter and send to "checkLetter" method in phrase object
  handleInteraction(letter) {
    let key = document.querySelectorAll('.key');
    for (let i = 0; i < key.length; i++){
      if (letter === key[i].textContent) {
        key[i].disabled = true;
        if (this.activePhrase.checkLetter(key[i].textContent)) {
            key[i].className = 'chosen';
            if (this.checkForWin()) this.gameOver();
        } else {
            key[i].className = 'wrong';
            this.removeLife();
        };    
      };
    };
  };


  // Return a random phrase from phrase array
  getRandomPhrase() {
    return this.phrases[Math.ceil(Math.random() * 5) - 1];   
  };


  // Remove heart if there is a wrong guess and end game if there are no hearts left
  removeLife() {
    let headerWarning = document.querySelector('.header');
    document.querySelectorAll('img')[this.missed].src = "images/lostHeart.png";
    this.missed++;
    if (this.missed == 5) this.gameOver();

    // Last life warning
    if (this.missed == 4) {
      headerWarning.innerHTML = "One heart left!";
      headerWarning.style.color = '#f5785f';
    }
  };


  // Return result if phrase has been successfully guessed
  checkForWin() {
    if (document.querySelectorAll('.hide').length == 0) return true;
  };
    

  // End game and call 'fadeIn' method to display win or lose message
  gameOver() {
    this.missed == 5 ? this.fadeIn('lose', 'Sorry, try again next time!') : this.fadeIn('win', 'You Win!');
    this.gameReset();
  };


  // Display game result message
  fadeIn(result, message) {
    let title = document.getElementById('overlay');
    title.style.visibility = '';
    title.style.opacity = '0';
    title.className = result;
    document.querySelector('#game-over-message').textContent = message;
    let op = parseFloat(title.style.opacity);
    let timer = setInterval( () => {
      if (op >= 1.0) clearInterval(timer);
      op += 0.1;
      title.style.opacity = op;
    }, 30);
  };


  // Prepare for next game by resetting all styles back to original
  gameReset() {
    let mainHeader = document.querySelector('.header');
    mainHeader.innerHTML = 'Phrase Hunter';
    mainHeader.style.color = '#fff';
    this.missed = 0;
    document.querySelector('#phrase ul').innerHTML = '';
    document.querySelectorAll('img').forEach(img => img.src = 'images/liveHeart.png');
    document.querySelectorAll('button').forEach(key => {
      if (key.id !== 'btn__reset') {
          key.className = 'key';
          key.disabled = false;
      };
    });
  };
};