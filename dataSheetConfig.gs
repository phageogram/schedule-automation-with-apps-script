 function splitRow() {
  // Get the active (source) spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('Input');

  // Get target sheet
  var targetSheetName = "Data";
  var targetSheet = spreadsheet.getSheetByName(targetSheetName);

  // Get timestamp of last processed form submission
  var lastTimestamp = targetSheet.getRange("Z1").getValue();

  // Function to fetch data range
  var getDataRange = function(column) {
  return sheet.getRange(2, column, 1000, 1).getValues().flat().filter(Boolean);
  };

  // Get relevant data values
  var plantData = sheet.getRange('F2:F1001').getValues().filter(String);
  var dateRange = getDataRange(2);
  var locationRange = getDataRange(8);
  var eventTypes = getDataRange(5);
  var eventNames = getDataRange(7);
  var eventStartTimes = getDataRange(3);
  var eventEndTimes = getDataRange(4);

  // Initialize empty arrays for storing output
  var left = [];
  var right = [];
  var tempArray = [];

  for (i=0; i < plantData.length; i++) {
    left.push([dateRange[i], eventStartTimes[i], eventEndTimes[i], eventTypes[i], eventNames[i], locationRange[i]]);
    for (j=0; j < plantData[i].length; j++) {
      tempArray.push(plantData[i][j].split(/[,=]/).map(function(value) { return value.trim(); }));
    }
  }

  for (i=0; i < tempArray.length; i++) {
    l = formatList(tempArray[i])
    right.push(l)
  }

  result = [];

  // Combine left and right arrays
  for (var i = 0; i < left.length; i++) {
    for (var j = 0; j < right[i].length; j++) {
      var combinedList = left[i].concat(right[i][j]);
      console.log(right[i][j]);
      result.push(combinedList);
    }
  }
  console.log(result)
  // Update the last processed timestamp in the target sheet and push values to target sheet
  if (result.length > 0) {
    targetSheet.getRange("Z1").setValue(new Date());
    targetSheet.getRange(targetSheet.getLastRow() + 1, 1, result.length, result[0].length).setValues(result);
  }
}
