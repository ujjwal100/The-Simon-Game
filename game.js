let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern =[];
let start=true;
let level= 0;
$(document).keypress(function(){
  if(start){
    start=false;
    nextSequence();
  }
});

$(".btn").click(function (){
  let userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  let randomNumber= Math.floor((Math.random() * 4));
  let randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("."+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  let aud= new Audio("sounds/"+name+".mp3");
  aud.play();
}
function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
      $("."+currentColour).removeClass("pressed");}, 100);
}
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
    nextSequence();}, 1000);
  }
}
else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");}, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver(){
  start=true;
  gamePattern=[];
  level=0;
}
