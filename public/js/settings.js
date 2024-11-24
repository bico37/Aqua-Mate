//Variablen
let sideBar_icon = document.getElementById("header-side-bar_icon");
let reload_botton = document.getElementById("header-reload-day");
let sideBar = document.getElementById("sideBar");

let content_main = document.getElementById("content-main");

// Side Bar
function sideBar_generate() {
  if (sideBar_icon.style.rotate != "90deg") {
    sideBar_icon.style.rotate = "90deg";
    sideBar_icon.style.transition = "ease .3s all";
    content_main.style.filter = "blur(2px)";
    sideBar.style.display = "inline";
  } else {
    content_main.style.filter = "none";
    sideBar_icon.style.rotate = "0deg";
    sideBar_icon.style.transition = "ease .3s all";

    sideBar.style.display = "none";
  }
}


// Load settings
function LoadSettings() {
  window.location = `../html/settings.html`;
}


function calcH() {
  document.getElementById('content-ImportInfos').style.display = "inline"
}

function calculate() {
  let personWeight = document.getElementById('gewicht').value

  let recommendDrinkAmount = personWeight * 35

  
  recommendDrinkAmount = Math.round(recommendDrinkAmount / 100) * 100
  recommendDrinkAmount = recommendDrinkAmount / 1000

  document.getElementById('content-ausp-reco').innerHTML = `${recommendDrinkAmount} l`
}

function safeSettings() {
  let drinkGoal = document.getElementById('drinkGoal').value
  localStorage.setItem('SYT_DRINKWATER_APP_drinkGoal', drinkGoal)
}

