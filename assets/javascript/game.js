//********** GAME START STATE **********

//wait until jQuery and JavaScript loaded before executing:
$(document).ready(function () {

  //array literal ("fixed values, not variables, that you literally provide in your script" - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types):
  const wordsArray = ["abruptly", "absurd", "abyss", "affix", "askew", "avenue", "awkward", "axiom", "azure", "bagpipes", "bandwagon", "banjo", "bayou", "beekeeper", "bikini", "blitz", "blizzard", "boggle", "bookworm", "boxcar", "boxful", "buckaroo", "buffalo", "buffoon", "buxom", "buzzard", "buzzing", "buzzwords", "caliph", "cobweb", "cockiness", "croquet", "crypt", "curacao", "cycle", "daiquiri", "dirndl", "disavow", "dizzying", "duplex", "dwarves", "embezzle", "equip", "espionage", "exodus", "faking", "fishhook", "fixable", "fjord", "flapjack", "flopping", "fluffiness", "flyby", "foxglove", "frazzled", "frizzled", "fuchsia", "funny", "gabby", "galaxy", "galvanize", "gazebo", "giaour", "gizmo", "glowworm", "glyph", "gnarly", "gnostic", "gossip", "grogginess", "haiku", "haphazard", "hyphen", "iatrogenic", "icebox", "injury", "ivory", "ivy", "jackpot", "jaundice", "jawbreaker", "jaywalk", "jazziest", "jazzy", "jelly", "jigsaw", "jinx", "jiujitsu", "jockey", "jogging", "joking", "jovial", "joyful", "juicy", "jukebox", "jumbo", "kayak", "kazoo", "keyhole", "khaki", "kilobyte", "kiosk", "kitsch", "kiwifruit", "klutz", "knapsack", "larynx", "lengths", "lucky", "luxury", "lymph", "marquis", "matrix", "megahertz", "microwave", "mnemonic", "mystify", "naphtha", "nightclub", "nowadays", "numbskull", "nymph", "onyx", "ovary", "oxidize", "oxygen", "pajama", "peekaboo", "phlegm", "pixel", "pizazz", "pneumonia", "polka", "pshaw", "psyche", "puppy", "puzzling", "quartz", "queue", "quips", "quixotic", "quiz", "quizzes", "quorum", "razzmatazz", "rhubarb", "rhythm", "rickshaw", "schnapps", "scratch", "shiv", "snazzy", "sphinx", "spritz", "squawk", "staff", "strength", "strengths", "stretch", "stronghold", "stymied", "subway", "swivel", "syndrome", "thriftless", "thumbscrew", "topaz", "transcript", "transgress", "transplant", "triphthong", "twelfth", "twelfths", "unknown", "unworthy", "unzip", "uptown", "vaporize", "vixen", "vodka", "voodoo", "vortex", "voyeurism", "walkway", "waltz", "wave", "wavy", "waxy", "wellspring", "wheezy", "whiskey", "whizzing", "whomever", "wimpy", "witchcraft", "wizard", "woozy", "wristwatch", "wyvern", "xylophone", "yachtsman", "yippee", "yoked", "youthful", "yummy", "zephyr", "zigzag", "zigzagging", "zilch", "zipper", "zodiac", "zombie"];

  const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  let gameWord = [];
  let letterCount = 0;
  let hideWord = [];
  let playerLetters = [];
  let playerGuesses = [];
  let lives = 10;
  let totalPlays = 0;
  let totalWins = 0;

  //word randomly chosen from wordsArray:
  function chooseWord() {
    return wordsArray[Math.floor(Math.random() * wordsArray.length)];
  }

  function setup() {
    gameWord = chooseWord();
    // console.log("The gameword is: " + gameWord.toUpperCase())
    letterCount = gameWord.length;
    //display underscores for every letter of the game word:
    hideWord = Array.from({ length: letterCount }, () => ("_"));
    document.getElementById("game-word").innerText = hideWord.join("");
    playerLetters = [];
    playerGuesses = Array(26);
    lives = 10;
    document.getElementById("guesses").innerText = "(Press any letter to begin.)";
    document.getElementById("lives").style = "color: green";
    document.getElementById("lives").innerText = lives;
    document.getElementById("games-played").innerText = totalPlays;
    document.getElementById("games-won").innerText = totalWins;
    return;
  }

  function playAgain() {
    document.getElementById("give-up").style = "display: none";
    document.getElementById("get-hint").style = "display: none";
    document.getElementById("new-game").style = "display: inline";
    document.getElementById("games-played").innerText = totalPlays;
    document.getElementById("games-won").innerText = totalWins;
    return;
  }

  function quitGame() {
    document.getElementById("new-game").style = "display: none";
    document.getElementById("give-up").style = "display: inline";
    document.getElementById("get-hint").style = "display: inline";
    document.getElementById("games-played").innerText = totalPlays;
    document.getElementById("games-won").innerText = totalWins;
    return;
  }

  function checkStatus() {

    if (hideWord.indexOf("_") === -1 && lives === 1) {
      totalPlays++;
      totalWins++;
      document.getElementById("lives").style = "color: green";
      document.getElementById("lives").innerText = "YOU WON! (Just... " + String.fromCodePoint(0x1F605) + ")";
      playAgain();
      return;
    } else if (hideWord.indexOf("_") === -1 && lives > 1) {
      totalPlays++;
      totalWins++;
      document.getElementById("lives").style = "color: darkgreen";
      document.getElementById("lives").innerText = "YOU WON! " + String.fromCodePoint(0x1F60E);
      playAgain();
      return;
    } else if (lives > 3) {
      document.getElementById("lives").innerText = lives;
    } else if (lives > 0 && lives < 4) {
      document.getElementById("lives").style = "color: red";
      document.getElementById("lives").innerText = lives;
    } else {
      totalPlays++;
      document.getElementById("lives").style = "color: red";
      document.getElementById("lives").innerText = "YOU LOST! " + String.fromCodePoint(0x1F62D);
      document.getElementById("game-word").innerText = gameWord.toUpperCase();
      playAgain();
      return;
    }
  }

  setup();

  //********** GAME LOOP **********

  document.onkeyup = function (event) {

    //toLowerCase() will prevent errors if Caps Lock is on:
    let keyPressed = event.key.toLowerCase();
    let letterGuess = [];
    let firstInst = -1;
    let lastInst = -1;

    //check if the key pressed is a letter:
    if (alphabet.indexOf(keyPressed) !== -1 && hideWord.indexOf("_") !== -1 && lives > 0) {
      letterGuess = keyPressed;
      firstInst = gameWord.indexOf(letterGuess);
      lastInst = gameWord.lastIndexOf(letterGuess);
      //if the key pressed is not a letter, alert:
    } else if (hideWord.indexOf("_") !== -1 && lives > 0) {
      document.getElementById("guesses").innerText = "NOT A LETTER. TRY AGAIN.";
    } else {
      return;
    }

    //if the letter has not been selected in this gameplay:
    if (alphabet.indexOf(keyPressed) !== -1 && playerLetters.indexOf(keyPressed) === -1 && hideWord.indexOf("_") !== -1 && lives > 0) {
      playerLetters.push(letterGuess);
      //then add that letter to the playerGuesses array at the right place in the alphabet (so they can be displayed in order): 
      playerGuesses.splice((alphabet.indexOf(letterGuess)), 1, letterGuess.toUpperCase());
      //to display, filter out null values and join with a comma:
      let notNull = playerGuesses.filter(letter => letter);
      document.getElementById("guesses").innerText = notNull.join(", ");
    } else {
      return;
    }

    function checkUnique() {
      if (firstInst === lastInst) {
        //replace lodash with letterGuess at the same index as the occurrence of that letter in the gameWord:
        hideWord.splice(firstInst, 1, letterGuess.toUpperCase());
        document.getElementById("game-word").innerText = hideWord.join("");
      } else {
        for (let i = firstInst; i < lastInst + 1; i++) {
          if (letterGuess === gameWord[i]) {
            hideWord.splice(i, 1, letterGuess.toUpperCase());
            document.getElementById("game-word").innerText = hideWord.join("");
          }
        }
      }
    }

    //check if the letter occurs in the word:
    if (alphabet.indexOf(keyPressed) !== -1 && firstInst === -1) {
      lives--;
      checkStatus();
      //if it does occur in the word, check if there are multiples:
    } else if (alphabet.indexOf(keyPressed) !== -1 && firstInst !== -1) {
      checkUnique();
      checkStatus();
    }
  }

  document.getElementById("give-up").onclick = function () {
    lives = 0;
    totalPlays++;
    document.getElementById("game-word").innerText = gameWord.toUpperCase();
    document.getElementById("lives").style = "color: red";
    document.getElementById("lives").innerText = lives;
    document.getElementById("guesses").innerText = "Q, U, I, T, T, E, R!  " + String.fromCodePoint(0x1F61C);
    playAgain();
  }

  document.getElementById("get-hint").onclick = function () {
    lives--;
    let hint = gameWord[Math.floor(Math.random() * letterCount)];
    document.getElementById("hint-letter").style = "display: block";
    document.getElementById("hint-letter").innerText = hint.toUpperCase();
    $("#hint-letter").fadeOut(2000);
    checkStatus();
  }

  document.getElementById("new-game").onclick = function () {
    quitGame();
    setup();
  }
})

//pulling distinct values out of an array: https://codeburst.io/javascript-array-distinct-5edc93501dc4;