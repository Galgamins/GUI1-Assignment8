//Main function to generate table. Everything goes through this function.
function generateTable() {
  var table = document.getElementById("resultTable");
  table.innerHTML = ""; //Clears table contents in case there was previously cells in there

  var multiplier1 = parseInt(document.getElementById("multiplier1").value);
  var multiplier2 = parseInt(document.getElementById("multiplier2").value);
  var multiplicand1 = parseInt(document.getElementById("multiplicand1").value);
  var multiplicand2 = parseInt(document.getElementById("multiplicand2").value);

  //convert to Number to handle floating point inputs
  if (multiplier1 <= multiplier2) {
    multiplierMin = Number(multiplier1);
    multiplierMax = Number(multiplier2);
  } else {
    multiplierMin = Number(multiplier2);
    multiplierMax = Number(multiplier1);
  }

  if (multiplicand1 <= multiplicand2) {
    multiplicandMin = Number(multiplicand1);
    multiplicandMax = Number(multiplicand2);
  } else {
    multiplicandMin = Number(multiplicand2);
    multiplicandMax = Number(multiplicand1);
  }


  var rowHead = table.insertRow(0);
  var cell = rowHead.insertCell(-1);
  cell.innerHTML = ''; //Fills in blank cell that is at the crossing point of the two headers

  //Fills in horizontal header
  for (i = multiplierMin; i <= multiplierMax; i++) {
    console.log(i);
    var cell = rowHead.insertCell(-1);
    cell.innerHTML = i;
  }

  //Fills in cells
  for (i = multiplicandMin; i <= multiplicandMax; i++) {
    var row = table.insertRow(-1);
    var cell = row.insertCell(-1);
    cell.innerHTML = i; //Fills in vertical header
    for (j = multiplierMin; j <= multiplierMax; j++) {
      var cell = row.insertCell(-1);
      cell.innerHTML = i * j;
    }
  }
};

$(function() {
  $("#tableInput").validate({
    // Rules for validating the form.
    rules: {
      multiplier1: {
        required: true,
        integer: true,
      },
      multiplier2: {
        required: true,
        integer: true,
      },
      multiplicand1: {
        required: true,
        integer: true,
      },
      multiplicand2: {
        required: true,
        integer: true,
      }
    },

    messages: {
      multiplier1: {
        required: "This entry cannot be blank. Please enter an integer.",
        integer: "The value must be an integer. Please enter an integer."
      },
      multiplier2: {
        required: "This entry cannot be blank. Please enter an integer.",
        integer: "The value must be an integer. Please enter an integer."
      },
      multiplicand1: {
        required: "This entry cannot be blank. Please enter an integer.",
        integer: "The value must be an integer. Please enter an integer."
      },
      multiplicand2: {
        required: "This entry cannot be blank. Please enter an integer.",
        integer: "The value must be an integer. Please enter an integer."
      }
    },

    // Handler for submit button click
    submitHandler: function() {
      generateTable();
      return false;
    },

    //Changes location of error message
    errorElement: "div",
    errorPlacement: function(error, element) {
      error.insertAfter(element);
    }
  });
});
