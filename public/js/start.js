//Variablen
let sideBar_icon = document.getElementById("header-side-bar_icon");
let reload_botton = document.getElementById("header-reload-day");
let sideBar = document.getElementById("sideBar");
let content_main = document.getElementById("content-main");

let selectedOption;

//Pattern
let amount_pattern = /^[\d]{1,}([\.]{1}[\d]{1,2})?$/;
let time_pattern = /^[0-2]{1}[0-9]{1}:[0-6]{1}[0-9]{1}$/;
let text_pattern = /^[a-zA-ZßöÖäÄüÜ]+$/;
let date_pattern = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/;

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

  return date;
}

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

// Load - Read
let contString = "";
function addDrink() {
  console.log(date());

  let amount = document.getElementById("input-amount_line").value;
  let type = document.getElementById("input-type_info").value;
  let time = document.getElementById("input-time_info").value;

  if (amount == "" || type == "" || time == "") {
    if(amount == ""){
      document.getElementById("inputs-error_message").innerHTML = `<h3>Please ensure you enter a amount</h3>`;
    } else if(time == ""){
      document.getElementById("inputs-error_message").innerHTML = `<h3>Please ensure you enter a date</h3>`;
    } else if(type == ""){
      document.getElementById("inputs-error_message").innerHTML = `<h3>Please ensure you enter a drink</h3>`;
    }
  } else if(!amount_pattern.test(amount) || !time_pattern.test(time) || !text_pattern.test(type) || !date_pattern.test(date())){
    if(!amount_pattern.test(amount)){
      document.getElementById("inputs-error_message").innerHTML = `<h3>Enter a valid amount (only numbers and .)</h3>`;
    } else if(!text_pattern.test(type)){
      document.getElementById("inputs-error_message").innerHTML = `<h3>Enter a valid drink (only text, no special characters)</h3>`;
    }
  } else {
    // calculate ml to l
    if (saveSelection() == "ml") {
      amount = amount / 1000;
    }
    if (saveSelection() == "l") {
      amount = amount;
    }

    // clear inputs
    document.getElementById("input-amount_line").value = "";
    document.getElementById("input-type_info").value = "";
    document.getElementById("input-time_info").value = "";

    //delete error message
    document.getElementById("inputs-error_message").innerHTML = ``;

    let formData = new FormData();
    formData.append('date', date());
    formData.append('amount', amount);
    formData.append('type', type);
    formData.append('time', time);

    fetch("/add-drink", {
      method: "POST",
      body: formData
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      //wenn hinzufügen
      if (data.success) {
        //Erfolgreich - Er aktualisiert den Wert wie viel getrunken
        loadDrinks();
      } else {
        //fehler - Er gibt Fehlermeldung aus (das ist nur wenn nicht funktioniert, nicht wenn ein Feld leer ist, weil diese Überprüfung davor erfolgt)
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
  }
}

//einmal benötigt für die Liter Menge
//einmal für die gesamte Tabelle
function loadDrinks() {
  fetch(`/get-drink`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      let wantedAmount = localStorage.getItem('SYT_DRINKWATER_APP_drinkGoal');
      let full_drink_amount = 0;

      for (let i = 0; i < data.result.length; i++) {
        if (date() == data.result[i].date) {
          console.log('same Date');
          full_drink_amount += parseFloat(data.result[i].amount);
        }     
      }

      if(wantedAmount == null){
        wantedAmount = 0;
      }

      //runden damit nicht mehr Kommazahlen
      full_drink_amount = Math.round(full_drink_amount * 100) / 100;
      document.getElementById("cont_gesAusg").innerHTML = `<p>${full_drink_amount}L / ${wantedAmount}L</p>`;

      contString = "";
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

loadDrinks();

// Read out option - ml or l
function saveSelection() {
  let selectElement = document.getElementById("input_unitSelect");
  let selectedValue = selectElement.options[selectElement.selectedIndex].value;

  return selectedValue;
}

// Load settings
function LoadSettings() {
  window.location = `./html/settings.html`;
}
