var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// start game

$(document).keypress(function() {
    if (!started) {
      nextSequence();
      started = true;
    }
  });

// computer plays

function nextSequence() {

// change level
    level++;

    $("#level-title").text("Level " + level);

// select random number
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

// add random color to gamePattern

    gamePattern.push(randomChosenColour);

// add animation and sound to selected color

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
};

// user plays

$(".btn").click(function() {

// get id of user selected color

    var userChosenColour = $(this).attr("id");

// add animation and sound

    playSound(userChosenColour);

    animatePress(userChosenColour);

// add chosen color to list 
    
    userClickedPattern.push(userChosenColour);

    var a = userClickedPattern.length - 1;

    if (gamePattern[a] != userChosenColour) {
        endGame()
    }

// checks if user clicked enougth
    if (userClickedPattern.length === level) {
        checkAnswer(level);
    };

});

function checkAnswer(currentLevel) {

    var correctColors = 0
    
    for (var i = 0; i < currentLevel; i ++){
        if (userClickedPattern[i] === gamePattern[i]){
            correctColors ++
        } else {
            endGame();
        }
    }

    if (correctColors === currentLevel){
        userClickedPattern = [];
        setTimeout(function() {
            nextSequence();
            }, 700);
        }
}

function endGame() {
    started = false;
    $("#level-title").text("Game over. Press A Key to Start again");
}

// add animation and sound

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass('pressed');
    }, 100);

};