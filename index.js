var buttonColours =["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function(){
    if(!started){
        $("h1").text("Level "+ level);
        nextSequence();
        started = true;
        $(".button").text("Restart");
    }
});


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
 
    playSound(randomChosenColor);
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}
 

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("true");
        if(userClickedPattern.length == gamePattern.length){
        setTimeout(function() {
            nextSequence();
            }, 1000);
        }   
    }else{
        startOver();
    }
   
}


function startOver(){
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    var wrongAnswer = new Audio("sounds/wrong.mp3");
    wrongAnswer.play();
    setTimeout(function() {
         $("body").removeClass("game-over");
         }, 200);

    gamePattern = [];
    level = 0;
    started = false;
}

$(".button").click(function(){
    if(!started){
        $("h1").text("Level "+ level);
        nextSequence();
        started = true;
        $(".button").text("Restart");
    }
});



