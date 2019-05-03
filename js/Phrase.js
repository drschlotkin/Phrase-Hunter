class Phrase {

  // Assign active phrase to object
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  };


  // Display phrase on screen and hide letters
  addPhraseToDisplay() {
    let phraseString = this.phrase.split('');
    let letterCount = 0;
    phraseString.map((e) => {
      let listItem = document.createElement('li');
      if (e !== ' ') {
          let letter = document.createTextNode(phraseString[letterCount]);
          listItem.className = `hide letter ${letter.textContent}`;
          listItem.appendChild(letter);
      }else {
          listItem.className = 'space';
      };
      document.querySelector('#phrase ul').appendChild(listItem);
      letterCount++;;
    });
  };


  // Check for letter in phrase
  checkLetter(letter) {  
    let foundLetter = 0;
    for (let i = 0; i < this.phrase.length; i++) {
      if(this.phrase[i] === letter) {
        foundLetter++;
        this.showMatchedLetter(letter);
      };
    };
    return foundLetter > 0 ? true : false;
  };


  // Reveal letter in phrase
  showMatchedLetter(letter){ 
    document.querySelector(`.${letter}`).className = 'show';
  };
 };
