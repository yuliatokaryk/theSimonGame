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
      userClickedPattern = [];
    };
});


// computer plays: change level and show it on screen; select random color; 
// add random color to gamePattern; 
// add animation and sound to selected color
function nextSequence() {

    level++;
    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
};


// user plays: get id of user selected color; add animation and sound; 
// add selected color to list; check answer 

$(".btn").click(function() {
    
    var userChosenColour = $(this).attr("id");
    
    animatePress(userChosenColour);

    if (gamePattern.length != 0) {
    
        userClickedPattern.push(userChosenColour);

        checkAnswer(userChosenColour);
    };
});

// check if user selects correct colors
function checkAnswer(userColor) {

    if (gamePattern[userClickedPattern.length - 1] != userColor) {
        endGame();
        playSound('wrong');
    } else {
        playSound(userColor);
    };

    if (userClickedPattern.length == level) {
        nextStep();
    };
};

function nextStep() {

    userClickedPattern = [];

    setTimeout(function() {
        nextSequence();
        }, 700);
};

function endGame() {
    level = 0;
    started = false;
    gamePattern = [];
    $("#level-title").text("Game over. Press A Key to Start again");
    $("body").css({"background-color":"red"});
    setTimeout(function() {
        $("body").css({"background-color":"#011F3F"});
        }, 500);
};

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