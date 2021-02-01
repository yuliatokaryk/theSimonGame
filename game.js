var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    if (userClickedPattern.length == level) {
        checkAnswer(level);
    };

});

function nextSequence() {

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
};

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

function checkAnswer(currentLevel) {
    for (var i = 0; i < currentLevel; i ++){
        if (userClickedPattern[i] === gamePattern[i]){
            setTimeout(function() {
                nextSequence();
                }, 700);
        } else {
            $("#level-title").text("Game over")
        }
    }

}