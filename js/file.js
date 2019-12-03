//These variables are used to track the low and high inputs of the multipliers and multiplicands,
//regardless of which was entered first.
var multiplierMin;
var multiplierMax;
var multiplicandMin;
var multiplicandMax;

//Variables for tab functionality. Necessarily because jQuery UI 1.9 removed built in add function
var tabCounter = 0;
var tabCurrent = 0;
var tabTitle = $("#tab_title")
var tabTemplate = "<li class=\"dynamicTab\"><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>"
var tabs = $("#tabs").tabs();

//This function gets the inputs to the form.
function getFormInputs() {
  var multiplier1 = parseInt(document.getElementById("multiplier1").value);
  var multiplier2 = parseInt(document.getElementById("multiplier2").value);
  var multiplicand1 = parseInt(document.getElementById("multiplicand1").value);
  var multiplicand2 = parseInt(document.getElementById("multiplicand2").value);

  if (multiplier1 <= multiplier2) {
    multiplierMin = multiplier1;
    multiplierMax = multiplier2;
  } else {
    multiplierMin = multiplier2;
    multiplierMax = multiplier1;
  }

  if (multiplicand1 <= multiplicand2) {
    multiplicandMin = multiplicand1;
    multiplicandMax = multiplicand2;
  } else {
    multiplicandMin = multiplicand2;
    multiplicandMax = multiplicand1;
  }
}

//Function to generate table. Argument specifies which tab to generate for. Use 0 for home tab.
function generateTable(tabNumber) {

  //Check to prevent adding new table element every time slider is moved
  if ($("#resultTable-" + tabCounter).length == 0) {
    $("<table id=resultTable-" + tabCounter + "></table>").appendTo("#tabs-" + tabCounter);
  }

  var table = document.getElementById("resultTable-" + tabNumber);
  table.innerHTML = ""; //Clears table contents in case there was previously cells in there

  getFormInputs();

  var rowHead = table.insertRow(0);
  var cell = rowHead.insertCell(-1);
  cell.innerHTML = ''; //Fills in blank cell that is at the crossing point of the two headers

  //Fills in horizontal header
  for (i = multiplierMin; i <= multiplierMax; i++) {
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
  generateTable(0);
  $("#tableInput").validate({
    // Form functions start here
    rules: {
      multiplier1: {
        min: -100,
        max: 100,
        required: true,
        integer: true,
      },
      multiplier2: {
        min: -100,
        max: 100,
        required: true,
        integer: true,
      },
      multiplicand1: {
        min: -100,
        max: 100,
        required: true,
        integer: true,
      },
      multiplicand2: {
        min: -100,
        max: 100,
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

    //Changes location of error message
    errorElement: "div",
    errorPlacement: function(error, element) {
      error.insertAfter(element);
    }
  });

  //Slider functions start here
  var sliderOpts1 = {
    min: -100,
    max: 100,
    animate: true,
    slide: function(event, ui) {
      $("#multiplier1").val(ui.value);
      if ($('#tableInput').valid()) {
          generateTable(0);
      }
    }
  };

  var sliderOpts2 = {
    min: -100,
    max: 100,
    animate: true,
    slide: function(event, ui) {
      $("#multiplier2").val(ui.value);
      if ($('#tableInput').valid()) {
          generateTable(0);
      }
    }
  };

  var sliderOpts3 = {
    min: -100,
    max: 100,
    animate: true,
    slide: function(event, ui) {
      $("#multiplicand1").val(ui.value);
      if ($('#tableInput').valid()) {
          generateTable(0);
      }
    }
  };

  var sliderOpts4 = {
    min: -100,
    max: 100,
    animate: true,
    slide: function(event, ui) {
      $("#multiplicand2").val(ui.value);
      if ($('#tableInput').valid()) {
          generateTable(0);
      }
    }
  };

  $("#multiplier1Slider").slider(sliderOpts1);
  $("#multiplier2Slider").slider(sliderOpts2);
  $("#multiplicand1Slider").slider(sliderOpts3);
  $("#multiplicand2Slider").slider(sliderOpts4);

  $('#multiplier1').blur(function() {
    var multiplier1 = parseInt($('#multiplier1').val());
    $("#multiplier1Slider").slider("value", multiplier1);
    if ($('#tableInput').valid()) {
        generateTable(0);
    }
  });

  $('#multiplier2').blur(function() {
    var multiplier2 = parseInt($('#multiplier2').val());
    $("#multiplier2Slider").slider("value", multiplier2);
    if ($('#tableInput').valid()) {
        generateTable(0);
    }
  });

  $('#multiplicand1').blur(function() {
    var multiplicand1 = parseInt($('#multiplicand1').val());
    $("#multiplicand1Slider").slider("value", multiplicand1);
    if ($('#tableInput').valid()) {
        generateTable(0);
    }
  });

  $('#multiplicand2').blur(function() {
    var multiplicand2 = parseInt($('#multiplicand2').val());
    $("#multiplicand2Slider").slider("value", multiplicand2);
    if ($('#tableInput').valid()) {
        generateTable(0);
    }
  });

  //Tab functions start here
  $("#saveTable").click(function() {
    if ($('#tableInput').valid()) {
      getFormInputs();
      addTab();
      generateTable(tabCounter);
      $('#tabs').tabs('option', 'active', -1); //Make the newly added tab selected
    }
  });

  //Deletes a tab when clicking on close button
  tabs.on("click", "span.ui-icon-close", function() {
    var panelId = $(this).closest("li").remove().attr("aria-controls");
    $("#" + panelId).remove();
    tabs.tabs("refresh");
  });

  $("#deleteAllTables").click(function() {
    tabCounter == 0;
    $("table.dynamicTable").remove();
    $("li.dynamicTab").remove();
    $("div.dynamicTabContent").remove();
  });
});

//Adding via html manipulation because jQuery UI 1.9 removed built in add function
function addTab() {
  tabCounter++;
  var label = tabTitle.val() || "[" + multiplierMin + "," + multiplierMax + "] x [" + multiplicandMin + "," + multiplicandMax + "]",
    id = "tabs-" + tabCounter,
    li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label)),
    tabTableHtml = "<table class = \"dynamicTable\" id=\"resultTable-" + tabCounter + "\"></table>"

  tabs.find(".ui-tabs-nav").append(li);
  tabs.append("<div class=\"dynamicTabContent\" id='" + id + "'>" + tabTableHtml + "</div>");
  tabs.tabs("refresh");
}
