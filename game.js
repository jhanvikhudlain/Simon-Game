var count = 0;
var level = 0;

$(document).keydown(function(){
  if(count===0)
  {
    count++;
    nextSequence();
  }
});

var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern=[];

function nextSequence()
{
  $("h1").text("Level "+ level);
  level++;

  userClickedPattern = [];

  var randomNumber=Math.round(Math.random()*3);

  var randomChosenColor=buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

  makeSound(randomChosenColor);

  animatePress(randomChosenColor);

  passColor(randomChosenColor);
}

$(".btn").click(function(){

  var userChosenColour=$(this).attr("id");

  userClickedPattern.push(userChosenColour);

  makeSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer((userClickedPattern.length)-1);
});

function makeSound(audio)
{
  var sound=new Audio("sounds/"+audio+".mp3");
  sound.play();
}

function animatePress(currentColor)
{
  $("."+currentColor).addClass("pressed");

  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  },100);

}

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("success");
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function()
    {
      nextSequence()
    },1000);
    }
  }
  else
  {
    var sound=new Audio("sounds/wrong.mp3");
    sound.play();

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}

function startOver()
{
  count=0;
  level=0;
  gamePattern=[];
}
