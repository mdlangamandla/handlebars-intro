var regListWidgA = [];
if (localStorage["regNumbers"]) {
  regListWidgA = localStorage.getItem("regNumbers").split(",");
}

let townsWidgA = {
  CY: "Bellville",
  CA: "Cape Town",
  CF: "Kuilsriver",

};

const filter = regNumFilter(regListWidgA, townsWidgA);
const addBtn = document.querySelector(".add_btn");
const regDisplayList = document.querySelector(".reg_display_list");
const townOptions = document.querySelector(".town");
const resetBtn = document.querySelector(".reset_btn");
const clearBtn = document.querySelector(".clear_filter_btn");

function displayNum(regNum) {
  var plate = document.createElement("LI");
  plate.innerHTML = regNum;
  regDisplayList.insertBefore(plate, regDisplayList.firstChild);
}


filter.getRegList().forEach(displayNum);

addBtn.addEventListener("click", function () {
  while (regDisplayList.firstChild) {
    regDisplayList.removeChild(regDisplayList.firstChild);
  }
  document.querySelector(".town").selectedIndex = 0;
  filter.getRegList().forEach(displayNum);
  regEntered = document.querySelector(".reg_input").value;
  if (regEntered == "") {
    document.querySelector(".reg_input").classList.add("no_value");
    setTimeout(function () {
      document.querySelector(".reg_input").classList.remove("no_value");
    }, 1500);
    return;
  }
//Timeout//
  regEnteredList = filter.inputToList(regEntered);
  regEnteredList.forEach(function (num, i) {
    setTimeout(function () {
      if (filter.validityTest(num)) {
        filter.addToList(num);
        displayNum(num);
        document.querySelector(".isiqinisekiso").classList.add("valid");
        document.querySelector(".isiqinisekiso").innerHTML = num + " was sucessfully captured into the registated Registration Numbers.";
      } 
   
      
      else {
        document.querySelector(".isiqinisekiso").classList.add("invalid");
        document.querySelector(".isiqinisekiso").innerHTML = num + " Is an invalid registration number. Or the registration number is not captured/ is already captured.";
      }
    }, 1000 * i);
  });

  setTimeout(function () {
    localStorage.setItem("regNumbers", filter.getRegList().toString());

    if (document.querySelector(".isiqinisekiso").classList.contains("invalid")) {
      document.querySelector(".isiqinisekiso").classList.remove("invalid");
      document.querySelector(".isiqinisekiso").innerHTML = "Please enter a valid registration number.";
    }
    if (document.querySelector(".isiqinisekiso").classList.contains("valid")) {
      document.querySelector(".isiqinisekiso").classList.remove("valid");
    }
    document.querySelector(".isiqinisekiso").innerHTML = "Please enter a registration number in the text-box below.";
  }, 4000 * regEnteredList.length);
  document.querySelector(".reg_input").value = "";

});
//Timeout ends//

townOptions.onchange = function () {
  while (regDisplayList.firstChild) {
    regDisplayList.removeChild(regDisplayList.firstChild);
  }
  var townSelected = document.querySelector(".town").selectedIndex;
  var townList = filter.carsForTown(townOptions.options[townSelected].value);
  townList.forEach(displayNum);
};

resetBtn.addEventListener("click", function () {
  while (regDisplayList.firstChild) {
    regDisplayList.removeChild(regDisplayList.firstChild);
  }
  localStorage.removeItem("regNumbers");
  regListWidgA = [];
  filter = regNumFilter(regListWidgA, townsWidgA);
});

clearBtn.addEventListener("click", function () {
  while (regDisplayList.firstChild) {
    regDisplayList.removeChild(regDisplayList.firstChild);
  }
  document.querySelector(".town").selectedIndex = 0;
  filter.getRegList().forEach(displayNum);
});


//Handlebars Widget

var regWidg = {
  town: {
    CY: "Bellville",
    CA: "Cape Town",
    CF: "Kuilsriver",
  },
  regNum: [],
};
if (localStorage["regNumbersHB"]) {
  regWidg.regNum = localStorage.getItem("regNumbersHB").split(",");
}
var filterHB = regNumFilter(regWidg.regNum, regWidg.town);

document.addEventListener("DOMContentLoaded", function () {
  const templateSource = document.querySelector("#regNumTemplate").innerHTML;
  const regNumTemplate = Handlebars.compile(templateSource);
  const regNum = document.querySelector("#regNumHandlebars");
  regNum.innerHTML = regNumTemplate(regWidg);
  const addBtn = document.querySelector("#add_btnHB");
  const regDisplayList = document.querySelector("#reg_display_listHB");
  const townOptions = document.querySelector("#townHB");
  const resetBtn = document.querySelector("#reset_btnHB");
  const clearBtn = document.querySelector("#clear_filter_btnHB");

  function displayNum(regNum) {
    var plate = document.createElement("LI");
    plate.innerHTML = regNum;
    regDisplayList.insertBefore(plate, regDisplayList.firstChild);
  }

  addBtn.addEventListener("click", function () {
    let regList = filterHB.getRegList();
    while (regDisplayList.firstChild) {
      regDisplayList.removeChild(regDisplayList.firstChild);
    }
    document.querySelector("#townHB").selectedIndex = 0;
    regList.forEach(displayNum);
    regEntered = document.querySelector("#reg_inputHB").value;
    if (regEntered == "") {
      document.querySelector("#reg_inputHB").classList.add("no_value");
      setTimeout(function () {
        document.querySelector("#reg_inputHB").classList.remove("no_value");
      }, 1500);
      return;
    }

    regEnteredList = filterHB.inputToList(regEntered);
    regEnteredList.forEach(function (num, i) {
      setTimeout(function () {
        if (filterHB.validityTest(num)) {
          filterHB.addToList(num);
          displayNum(num);
          document.querySelector("#isiqinisekisoHB").classList.add("valid");
          document.querySelector("#isiqinisekisoHB").innerHTML = num + " was sucessfully captured.";
        } else {
          document.querySelector("#isiqinisekisoHB").classList.add("invalid");
          document.querySelector("#isiqinisekisoHB").innerHTML = num + " is an invalid or duplicate input. Registration number not captured.";
        }
      }, 2000 * i);
    });

    setTimeout(function () {
      localStorage.setItem("regNumbersHB", filterHB.getRegList().toString());
      if (document.querySelector("#isiqinisekisoHB").classList.contains("invalid")) {
        document.querySelector("#isiqinisekisoHB").classList.remove("invalid");
      }
      if (document.querySelector("#isiqinisekisoHB").classList.contains("valid")) {
        document.querySelector("#isiqinisekisoHB").classList.remove("valid");
      }
      document.querySelector("#isiqinisekisoHB").innerHTML = "Please enter a registration number in the text-box below..";
    }, 2000 * regEnteredList.length);
    document.querySelector("#reg_inputHB").value = "";
  });

  townOptions.onchange = function () {
    while (regDisplayList.firstChild) {
      regDisplayList.removeChild(regDisplayList.firstChild);
    }
    var townSelected = document.querySelector("#townHB").selectedIndex;
    var townList = filterHB.carsForTown(townOptions.options[townSelected].value);

    townList.forEach(displayNum);
  };

  resetBtn.addEventListener("click", function () {
    while (regDisplayList.firstChild) {
      regDisplayList.removeChild(regDisplayList.firstChild);
    }
    localStorage.removeItem("regNumbersHB");
    regWidg.regNum = [];
    filterHB = regNumFilter(regWidg.regNum, regWidg.town);
  });
  clearBtn.addEventListener("click", function () {
    while (regDisplayList.firstChild) {
      regDisplayList.removeChild(regDisplayList.firstChild);
    }
    document.querySelector("#townHB").selectedIndex = 0;
    filterHB.getRegList().forEach(displayNum);
  });
});

// Handlebars ends here

