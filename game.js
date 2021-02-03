var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

var correctColors = 0

// start game

$(document).keypress(function() {
    if (!started) {
      nextSequence();
      started = true;
    }
  });

function nextSequence() {

 // changes level
    level++;

    $("#level-title").text("Level " + level);

// chooses random number
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

// adds random color to game Pattern

    gamePattern.push(randomChosenColour);

// adds animation and sound to selected color

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
};

$(".btn").click(function() {

// gets id of user choosen color

    var userChosenColour = $(this).attr("id");

// adds animation and sound

    playSound(userChosenColour);

    animatePress(userChosenColour);

// adds chosen color to list 
    
    userClickedPattern.push(userChosenColour);

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