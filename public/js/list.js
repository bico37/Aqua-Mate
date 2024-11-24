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


//date
function padZero(num) {
  return num < 10 ? "0" + num : num;
}

function date() {
  let currentDate = new Date();
  var tag = padZero(currentDate.getDate());
  var monat = padZero(currentDate.getMonth() + 1); // Beachte, dass die Monate in JavaScript von 0 bis 11 nummeriert sind.
  var jahr = currentDate.getFullYear();
  var date = tag + "." + monat + "." + jahr;

  return date
}


// Ausg
function loadDrinks() {
  fetch(`/get-drink`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      let contString = "";

      for (let i = 0; i < data.result.length; i++) {
        if (date() == data.result[i].date) {
            contString += `
                <div id="grid-amount"><p>${data.result[i].amount} l</p></div>
                <div id="grid-type"><p>${data.result[i].type}</p></div>
                <div id="grid-time"><p>${data.result[i].time}</p></div>
                            `
        }     
    }


      document.getElementById(
        "contAusg"
      ).innerHTML = contString;

      
      contString = ""
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

loadDrinks()