
//gentle mode array with easier words:
const easyWords = ["action", "advice", "agency", "agenda", "amount", "animal", "answer", "anyone", "appeal", "artist", "aspect", "attack", "author", "avenue", "battle", "beauty", "belief", "bishop", "border", "bottle", "bottom", "branch", "breath", "bridge", "budget", "burden", "bureau", "button", "camera", "cancer", "carbon", "career", "castle", "center", "chance", "change", "charge", "choice", "church", "circle", "client", "coffee", "column", "combat", "copper", "corner", "couple", "course", "credit", "crisis", "damage", "danger", "dealer", "debate", "decade", "defeat", "degree", "demand", "deputy", "desert", "design", "desire", "detail", "device", "dinner", "doctor", "dollar", "domain", "driver", "editor", "effect", "effort", "eleven", "empire", "energy", "engine", "entity", "equity", "escape", "estate", "excess", "expert", "export", "extent", "fabric", "factor", "family", "father", "fellow", "figure", "finger", "finish", "flight", "forest", "format", "friend", "future", "garden", "gender", "ground", "growth", "handle", "health", "height", "holder", "impact", "import", "income", "injury", "intent", "island", "junior", "launch", "lawyer", "leader", "league", "leaves", "legacy", "length", "lesson", "letter", "lights", "liquid", "luxury", "manner", "manual", "margin", "market", "master", "matter", "member", "memory", "merger", "method", "middle", "miller", "minute", "mirror", "module", "moment", "mother", "motion", "murder", "museum", "nation", "nature", "nights", "nobody", "notice", "notion", "number", "object", "office", "option", "orange", "origin", "output", "palace", "parent", "patent", "people", "period", "permit", "person", "phrase", "planet", "player", "pocket", "police", "policy", "prince", "prison", "profit", "public", "rating", "reader", "reason", "recall", "record", "reform", "regard", "regime", "region", "relief", "report", "rescue", "resort", "result", "retail", "return", "review", "reward", "safety", "salary", "sample", "scheme", "school", "screen", "search", "season", "second", "secret", "sector", "seller", "senior", "series", "server", "signal", "silver", "sister", "source", "speech", "spirit", "spring", "square", "stable", "status", "strain", "stream", "street", "stress", "strike", "string", "studio", "summer", "summit", "supply", "survey", "switch", "symbol", "system", "talent", "target", "tenant", "tender", "tennis", "theory", "thirty", "threat", "ticket", "tissue", "travel", "treaty", "twelve", "twenty", "update", "valley", "vendor", "victim", "vision", "volume", "walker", "wealth", "weight", "window", "winner", "winter", "wonder", "worker", "writer", "yellow"]

//************************* GENTLE MODE START STATE *************************

//create an array clone for this game session (to avoid repeat words):
let easyMode = [...easyWords]

//word randomly chosen from wordsArray:
function chooseEasy() {
    return easyMode[Math.floor(Math.random() * easyMode.length)];
}

function gentleSetup() {
    gameWord = chooseEasy()
    console.log("the game word is: " + gameWord)
    letterCount = gameWord.length
    // display underscores for every letter of the game word:
    hideWord = Array.from({ length: letterCount }, () => ("_"))
    //create a clone of gameWord to prevent repeat hints:
    hintWord = [...gameWord]
    playerLetters = [];
    playerGuesses = Array(26);
    lives = 100;
    //display information on page:
    document.getElementById("game-word").innerText = hideWord.join("")
    document.getElementById("guesses").innerText = "(Press any letter to begin.)"
    document.getElementById("lives").style = "color: green"
    document.getElementById("lives").innerText = lives
    document.getElementById("games-played").innerText = totalPlays
    document.getElementById("games-won").innerText = totalWins
    return
}

gentleSetup()

    //********** GENTLE GAME LOOP **********

