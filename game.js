var gamePattern = [];

var userClickPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(document).keydown(function(){
    if (!started){
        $("#level-title").text("Level" + level);
        started = true;
        nextSequence();
    }
})


function nextSequence(){
    userClickPattern = [];
    level ++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    $("#" + randomChosenColour).fadeOut(100).fadeIn(80);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
   
}

function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickPattern.length-1);
  
  
})

function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
   if ( gamePattern[currentLevel] == userClickPattern[currentLevel]){
    
        if (userClickPattern.length == gamePattern.length ){
            setTimeout(function(){
                nextSequence();
                }, 1000);
            }
        }

    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
            }, 200);
        $("#level-title").text("Game Over, Press Any key to Restart")
        startOver()
   }
}
   
function startOver(){
    level = 0;
    gamePattern =[];
    started = false;
}