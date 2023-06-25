$(document).ready(function() {
    row = 0;
    col = 0;
    randomWord = words[Math.floor(Math.random() * words.length)];
    console.log(randomWord);
});


// function to check if the guess is correct
function checkGuess(guess) {
    // split word into array
    let guessArray = guess.split("");
    let randomWordArray = randomWord.split("");

    console.log(guessArray);
    console.log(randomWordArray);

    let counts = {};

    for (var i = 0; i < 5; i++) {
        counts[randomWord.split("")[i]] = 1 + (counts[randomWord.split("")[i]] || 0);
    }

    for (var i = 0; i < 5; i++) {
        if (guessArray[i] == randomWordArray[i]) {
            $('#' + row + '-' + i).css("background-color", "green");
            $("#key-" + guessArray[i]).css("background-color", "green");            
            counts[randomWordArray[i]]--;
        } else {
            $('#' + row + '-' + i).css("background-color", "grey");
        }
    }
    
    for (var i = 0; i < 5; i++) {
        if (randomWordArray.indexOf(guessArray[i]) > -1) {
            if (counts[guessArray[i]] > 0 && $('#' + row + '-' + i).css("background-color") != "rgb(0, 128, 0)") {
                $('#' + row + '-' + i).css("background-color", "yellow");
                $("#key-" + guessArray[i]).css("background-color", "yellow");
                counts[guessArray[i]]--;
            } 
        } else {
            $('#' + row + '-' + i).css("background-color", "grey");
            $("#key-" + guessArray[i]).css("background-color", "grey");
        }

        // add spin animation
        $('#' + row + '-' + i).addClass('spin');
    }
}

$(this).keydown(function(e) {
    if (e.which == 8) {
        if (col > 0) {
            col--;
            $('#' + row + '-' + col).empty();
        }
    } else if (e.which == 13) {
        if (col % 5 != 0) {
            alert("You must enter a 5 letter word");
        } else {
            var wordGuess = "";
            // build the word guess
            for (var i = 0; i < 5; i++) {
                wordGuess += $('#' + row + '-' + (i)).text();
            }

            if (words.indexOf(wordGuess) > -1) {
                console.log("Word entered: " + wordGuess);
                checkGuess(wordGuess);
                row++;
                col = 0;
            } else {
                // want to make a shake animation here
                alert("Not a valid word, try again");
            }
        } 
    } else {
        // add the letter to the board
        if (col + 1 < 6) {
            var letter = String.fromCharCode(e.which);
            $('#' + row + '-' + col).text(letter.toLowerCase());
            col++;

            $("#key-" + letter.toLowerCase()).css("background-color", "grey");
            // wait 100ms then change back to white
            setTimeout(function() {
                $("#key-" + letter.toLowerCase()).css("background-color", "white");
            }, 100);
        } 
    }
});