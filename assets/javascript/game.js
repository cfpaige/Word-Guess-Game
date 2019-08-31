/*
TODO: how to use http://randomword.setgetgo.com/ for random word selection
TODO: research game design using game states and game loop:
    // JS game anatomy: https://developer.mozilla.org/en-US/docs/Games/Anatomy
    // using HTML5 canvas element as game board?
    // setInterval vs requestAnimationFrame()?
TODO: research using "which" instead (for keyCodes) for cross-browser compatibility;
TODO: how to pull only distinct values out of an array: https://codeburst.io/javascript-array-distinct-5edc93501dc4;
*/

/*
TODO: 

Set up game start state.

Set up all functions necessary for the game loop to run:
1: choose random word,
2: display letters of the word as underscores,
3: allow user interaction (keys and buttons - nested functions),
4: next interaction, check it's a new letter (prevent repeat selection),
5: update button display with guessed letters (highlight and disable),
6: check if the guess is correct (nested; if not correct, increase wrong guesses count and update lives left display),
7: update the display with correctly guessed letters,
8: check if game is over (won or lost),
9: if game over, disable user interaction,

Then:
Track user guesses (push to empty array - keep the function below main game loop functions, or it will mess it up).
Bundle game loop functions that are to run on individual click/keypress (keep below main game loop so it can see all the functions above it).

Set up game reset state (keep plays and wins)
*/

//********** GAME START STATE **********

//wait until jQuery and JavaScript loaded before executing:
$(document).ready(function () {

  // array literal ("fixed values, not variables, that you literally provide in your script" - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types):
  const wordsArray = ["abruptly", "absurd", "abyss", "affix", "askew", "avenue", "awkward", "axiom", "azure", "bagpipes", "bandwagon", "banjo", "bayou", "beekeeper", "bikini", "blitz", "blizzard", "boggle", "bookworm", "boxcar", "boxful", "buckaroo", "buffalo", "buffoon", "buxom", "buzzard", "buzzing", "buzzwords", "caliph", "cobweb", "cockiness", "croquet", "crypt", "curacao", "cycle", "daiquiri", "dirndl", "disavow", "dizzying", "duplex", "dwarves", "embezzle", "equip", "espionage", "exodus", "faking", "fishhook", "fixable", "fjord", "flapjack", "flopping", "fluffiness", "flyby", "foxglove", "frazzled", "frizzled", "fuchsia", "funny", "gabby", "galaxy", "galvanize", "gazebo", "giaour", "gizmo", "glowworm", "glyph", "gnarly", "gnostic", "gossip", "grogginess", "haiku", "haphazard", "hyphen", "iatrogenic", "icebox", "injury", "ivory", "ivy", "jackpot", "jaundice", "jawbreaker", "jaywalk", "jazziest", "jazzy", "jelly", "jigsaw", "jinx", "jiujitsu", "jockey", "jogging", "joking", "jovial", "joyful", "juicy", "jukebox", "jumbo", "kayak", "kazoo", "keyhole", "khaki", "kilobyte", "kiosk", "kitsch", "kiwifruit", "klutz", "knapsack", "larynx", "lengths", "lucky", "luxury", "lymph", "marquis", "matrix", "megahertz", "microwave", "mnemonic", "mystify", "naphtha", "nightclub", "nowadays", "numbskull", "nymph", "onyx", "ovary", "oxidize", "oxygen", "pajama", "peekaboo", "phlegm", "pixel", "pizazz", "pneumonia", "polka", "pshaw", "psyche", "puppy", "puzzling", "quartz", "queue", "quips", "quixotic", "quiz", "quizzes", "quorum", "razzmatazz", "rhubarb", "rhythm", "rickshaw", "schnapps", "scratch", "shiv", "snazzy", "sphinx", "spritz", "squawk", "staff", "strength", "strengths", "stretch", "stronghold", "stymied", "subway", "swivel", "syndrome", "thriftless", "thumbscrew", "topaz", "transcript", "transgress", "transplant", "triphthong", "twelfth", "twelfths", "unknown", "unworthy", "unzip", "uptown", "vaporize", "vixen", "vodka", "voodoo", "vortex", "voyeurism", "walkway", "waltz", "wave", "wavy", "waxy", "wellspring", "wheezy", "whiskey", "whizzing", "whomever", "wimpy", "witchcraft", "wizard", "woozy", "wristwatch", "wyvern", "xylophone", "yachtsman", "yippee", "yoked", "youthful", "yummy", "zephyr", "zigzag", "zigzagging", "zilch", "zipper", "zodiac", "zombie"];

  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  //word randomly chosen from wordsArray:
  function chooseWord() {
    return wordsArray[Math.floor(Math.random() * wordsArray.length)];
  }

  let gameWord = []
  let letterCount = 0
  let hideWord = []
  let playerLetters = []
  let playerGuesses = []
  let lives = 10
  let totalPlays = 0
  let totalWins = 0

  function setup() {
    gameWord = chooseWord()
    console.log("the gameword is: " + gameWord)
    letterCount = gameWord.length
    // display underscores for every letter of the game word:
    hideWord = Array.from({ length: letterCount }, () => ("_"))
    document.getElementById("game-word").innerText = hideWord.join("")
    playerLetters = Array(parseInt(letterCount))
    playerGuesses = Array(26)
    lives = 10
    document.getElementById("guesses").innerText = "(Press any letter to begin.)"
    document.getElementById("lives").style = "color: green"
    document.getElementById("lives").innerText = lives
    document.getElementById("games-played").innerText = totalPlays
    document.getElementById("games-won").innerText = totalWins
  }

  setup()

  function playAgain () {
    document.getElementById("give-up").style = "display: none"
    document.getElementById("get-hint").style = "display: none"
    document.getElementById("new-game").style = "display: inline"
  }

  function quitGame () {
    document.getElementById("new-game").style = "display: none"
    document.getElementById("give-up").style = "display: inline"
    document.getElementById("get-hint").style = "display: inline"
  }

function checkStatus() {
    //check if game already lost:
    if (lives === 0 && hideWord.indexOf("_") !== -1) {
      document.getElementById("lives").style = "color: red"
      document.getElementById("lives").innerText = "YOU LOST! " + String.fromCodePoint(0x1F62D)
      document.getElementById("game-word").innerText = gameWord.toUpperCase();
      totalPlays++
      playAgain()
    } else if (lives > 3 && hideWord.indexOf("_") !== -1) {
      document.getElementById("lives").innerText = lives
    } else if (lives > 0 && lives < 4 && hideWord.indexOf("_") !== -1) {
      document.getElementById("lives").style = "color: red"
      document.getElementById("lives").innerText = lives
      //check if game already won:
    } else if (hideWord.indexOf("_") === -1 && lives > 0) {
      document.getElementById("lives").style = "color: darkgreen"
      document.getElementById("lives").innerText = "YOU WON! " + String.fromCodePoint(0x1F60E)
      totalPlays++
      totalWins++
      playAgain()
      // console.log("totalPlays" + totalPlays)
      // console.log("totalWins: " + totalWins)
    } else if (hideWord.indexOf("_") === -1 && lives === 1) {
      document.getElementById("lives").style = "color: green"
      document.getElementById("lives").innerText = "YOU WON! (Just... " + String.fromCodePoint(0x1F605)
      totalPlays++
      totalWins++
      playAgain()
      // console.log(totalPlays)
      // console.log(totalWins)
    }
  }

//********** GAME LOOP **********

  document.onkeyup = function (event) {
    let letterGuess = event.key;
    let caps = letterGuess.toUpperCase()
    let firstInst = gameWord.indexOf(letterGuess)
    let lastInst = gameWord.lastIndexOf(letterGuess)

    //if the key pressed is not a letter, alert:
    if (alphabet.indexOf(caps) === -1) {
      document.getElementById("guesses").innerText = "NOT A LETTER. TRY AGAIN."
    }

    //if the letter has not been selected in this gameplay:
    if (playerLetters.indexOf(caps) === -1) {
      playerLetters.push(caps)
      // console.log(playerLetters)
      //then add that letter to the playerGuesses array at the right place in the alphabet (so they can be displayed in order): 
      playerGuesses.splice((alphabet.indexOf(caps)), 1, caps)
      // console.log(playerGuesses)
      //to display, filter out null values and join with a comma:
      let notNull = playerGuesses.filter(letter => letter)
      document.getElementById("guesses").innerText = notNull.join(", ")
    }

    function checkUnique() {
      if (firstInst === lastInst) {
        //replace lodash with capitalized letterGuess at the same index as the occurrence of that letter in the gameWord:
        hideWord.splice(firstInst, 1, caps)
        document.getElementById("game-word").innerText = hideWord.join("");
      } else {
        for (let i = firstInst; i < lastInst + 1; i++) {
          if (letterGuess === gameWord[i]) {
            hideWord.splice(i, 1, caps)
            document.getElementById("game-word").innerText = hideWord.join("");
          }
        }
      }
    }

    //if the key pressed is a letter, but not one present in the gameWord:
      if (firstInst === -1) {
        lives--
        checkStatus()
      } else {
        checkUnique()
        checkStatus()
      }
  }

  document.getElementById("give-up").onclick = function () {
    document.getElementById("game-word").innerText = gameWord.toUpperCase();
    lives = 0
    document.getElementById("lives").style = "color: red"
    document.getElementById("lives").innerText = lives
    document.getElementById("guesses").innerText = "Q, U, I, T, T, E, R!  " + String.fromCodePoint(0x1F61C)
    totalPlays++
    playAgain()
  }

//   function thesHint () {
//     let queryURL = "https://dictionaryapi.com/api/v3/references/thesaurus/json/" + gameWord + "?key=" + process.env.THES_KEY

//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function (response) {  
//       console.log(response)

//   })
// }

  document.getElementById("get-hint").onclick = function () {
      let hint = gameWord[Math.floor(Math.random() * letterCount)]
      document.getElementById("hint-letter").style = "display: block"
      document.getElementById("hint-letter").innerText = hint.toUpperCase()
      $("#hint-letter").fadeOut(1500)
      lives--
      checkStatus()
  }

  document.getElementById("new-game").onclick = function () {
    quitGame()
    setup()
  }
})


// var topics = ["Monday", "Tuesday", "Thursday", "Wednesday", "Friday", "Sunday", "Saturday"];

// var myFavs = [];

// function displayGifInfo() {

  // let queryURL = "https://www.dictionaryapi.com/api/v3/references/sd4/json/" + gameWord + "?key=" + process.env.THES_KEY

  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).then(function (response) {

  //   console.log(response)

//     var results = response.data;

//     for (var i = 0; i < results.length; i++) {
//       var gifCard = $("<div class='card'>");
//       var imageURL = results[i].images.fixed_width_still.url;
//       var image = $("<img>").attr("src", imageURL);
//       image.attr("data-state", "still")
//       image.addClass("gif");
//       image.addClass("card-img-top");
//       gifCard.append(image);
//       var cardBody = $("<div class='card-body'>");
//       gifCard.append(cardBody);
//       var rated = results[i].rating;
//       var faHeart = $("<span class='far fa-heart'>");
//       var pMuted = $("<p>").text("#" + gif + " | Rated: " + rated);
//       pMuted.addClass("card-text");
//       pMuted.addClass("text-muted");
//       pMuted.attr("font-size", "small");
//       pMuted.append(faHeart);
//       cardBody.append(pMuted);
//       $(".card-columns").prepend(gifCard);
//     }
//   })
// };
        
// function renderButtons() {

//   $("#buttons-view").empty();

//   for (var i = 0; i < topics.length; i++) {

//     var a = $("<button>");
//     a.addClass("btn btn-outline-secondary");
//     a.addClass("gif-btn");
//     a.attr("type", "button");
//     a.attr("data-name", topics[i]);
//     a.text(topics[i]);
//     $("#buttons-view").append(a);
//   }
// };

// $("#gif-search-btn").on("click", function (event) {
//   event.preventDefault();
//   var gif = $("#add-topic").val().trim();
//   if (gif == "") {
//     renderButtons();
//   }
//   else {
//     topics.push(gif);
//     renderButtons();
//     $("#add-topic").val("")
//   }
// });

// $(document).on("click", ".gif-btn", displayGifInfo);

// renderButtons();

// document.onkeydown = function () {
//   let new-game = confirm("Play again?")
//   if (new-game === true) {
//     setup()
//   } else {
//     // document.getElementById("game-word").innerText = "GOODBYE!"
//     alert("Good-bye!")
//     window.close()
//   }

// object literal using Unicode character codes as keys, to create buttons and check against user guesses:
// const keyCodes = {
//   65: "a", 
//   66: "b", 
//   67: "c", 
//   68: "d", 
//   69: "e", 
//   70: "f", 
//   71: "g", 
//   72: "h", 
//   73: "i", 
//   74: "j", 
//   75: "k", 
//   76: "l", 
//   77: "m", 
//   78: "n", 
//   79: "o", 
//   80: "p", 
//   81: "q", 
//   82: "r", 
//   83: "s", 
//   84: "t", 
//   85: "u", 
//   86: "v", 
//   87: "w", 
//   88: "x", 
//   89: "y", 
//   90: "z" 
// };

// //variable for managing letter buttons:
// let letterButtons = $(".hov");



/*
.map finds every instance in the returned array (splitWord);
e and i are .map's arguments; e is a splitWord item, and i is its index;
.filer(Boolean) skips over any falsy items in creating a new array (Boolean constructor is also a function, it returns either true for ‘truthy’ argument or false for ‘falsy’ argument--so if the item doesn't match, the argument is falsy);
.map alone returns an array of the same length as gameWord, but with the letters that didn't match 'undefined'; with .filer(Boolean) attached, it returns an array with only the correct items (listed as "#letter_index"), or an empty array if no letters match;
#key_index is a jQuery syntax for finding a value in an array at a particular index
*/


//************************************************

// function checkResult() {
//   let lettersNeeded = gameWord.length;
//   var correctCount = correctSum();
//   console.log(correctCount);
//   gameOver = false;
  
//   if (lettersNeeded === correctCount) {
//     // alert("You Won!");
//     gameOver = true;
//     userWin = true;
    
//   } else if (wrongGuesses > 6) {
//     // alert("You lost!");
//     gameOver = true;
//     userLoss = true;
//   }
  
//   if (gameOver) {
//     removeEventHandlers();
//     updateTotals();
//   }
// }

// function updateTotals() {
//   if (gameOver = true) {
//     if (userWin = true) {
//       totalPlays++;
//       totalWins++;
//     } else {
//       totalPlays++;
//     }
//   }
// };
// console.log(totalPlays);
// console.log(totalWins);

// function removeEventHandlers() {
//   $(document).off("keyup");
//   letterButtons.off("click");
// }

// function trackLetters(keyCode) {
//   playerLetters.push(keyCode);
// }
// console.log(playerLetters);

// function checkGuess(letter) {
//   if (guessedCorrectly(letter)) {
//     // updateWord(letter);
//   } else {
//     wrongGuesses++;
//     // updateHangman(frames[wrongGuesses]);
//   }
// }

////********** INITIATE **********
// function handleKeyPress(keyCode) {
//   if (keyCode < 64 || keyCode > 91 || keyAlreadyPressed(keyCode)) {
//     return;
//   }

//   let letter = keyCodes[keyCode];
//   //because keys in the object keyCodes correspond to the Unicode character codes, using keyCode as index returns the right letter;
//   //naming the variable here because this function will run first in game order;

//   trackLetters(keyCode);
//   highlightPressedKey(letter);
//   checkGuess(letter);
//   checkResult();
// }

// function handleClick(letterClicked) {
//   if (keyAlreadyPressed(keyCode)) {
//     return;
//   }
  
//   let letter = letterClicked.attr("id");
//   //because the id of each letter button is a letter, using button id returns the right letter;
//   //naming the variable here because this function will run first in game order (alternative input path, hence same variable name, as following functions will use either in the same way);
  
//   //Object.keys(keyCodes) lists the properties in their raw (original) form. Then .filter finds the keys allowed by the game.
//   keyCode = Object.keys(keyCodes).filter(function(key) {
//     return keyCodes[key] === letter})[0]; //the use of [key] limits output to one, and [0] does the same to the function, else it will run over all the values; 

//   trackLetters(keyCode);
//   highlightPressedKey(letter);
//   checkGuess(letter);
//   checkResult();
// }