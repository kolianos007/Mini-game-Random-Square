var $start = document.querySelector("#start");
var $game = document.querySelector("#game");
var $gameTime = document.querySelector("#game-time");
var $time = document.querySelector("#time");
var $timeHeader = document.querySelector("#time-header");
var $resultHeader = document.querySelector("#result-header");
var $result = document.querySelector("#result");

$start.addEventListener("click", startGame);
$game.addEventListener("click", handleBoxClick);
$gameTime.addEventListener("input", setGameTimer);

function show($el) {
  $el.classList.remove("hide");
}
function hide($el) {
  $el.classList.add("hide");
}

var score = 0;

function startGame() {
  setGameTimer();
  score = 0;
  hide($start);
  $gameTime.setAttribute("disabled", "true");
  $game.style.backgroundColor = "#fff";

  var interval = setInterval(function() {
    var time = parseFloat($time.textContent);
    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);
  renderBox();
}

function endGame() {
  $game.style.backgroundColor = "#ccc";
  show($start);
  $game.innerHTML = "";
  show($resultHeader);
  hide($timeHeader);
  $gameTime.removeAttribute("disabled");
  setGameScore();
}
arrColor = ["pink", "black", "yellow", "red", "blue", "green", "grey"];
function renderBox() {
  $game.innerHTML = "";
  var box = document.createElement("div");
  var boxSize = getRandom(30, 100);
  var gameSize = $game.getBoundingClientRect();
  var maxTop = gameSize.height - boxSize;
  var maxLeft = gameSize.width - boxSize;
  box.style.width = box.style.height = boxSize + "px";
  box.style.backgroundColor =
    arrColor[Math.floor(Math.random() * arrColor.length)];
  box.style.position = "absolute";
  box.style.left = getRandom(1, maxLeft) + "px";
  box.style.top = getRandom(1, maxTop) + "px";
  box.style.cursor = "pointer";
  box.setAttribute("data-box", "true");
  $game.insertAdjacentElement("afterbegin", box);
}

function setGameTimer() {
  var time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
  hide($resultHeader);
  show($timeHeader);
}

function setGameScore() {
  $result.textContent = score.toString();
}
function handleBoxClick(event) {
  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
