function splitRow() {
  // Get form submission sheet and values, log to check data type
  spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  sourceSheet = spreadsheet.getSheetByName('Input');
  sourceValues = getData(sourceSheet);

  targetSheet = spreadsheet.getSheetByName('Data');


  // Use this variable to check for new form submission
  var lastTimeStamp = targetSheet.getRange("Z1").getValue();


  // Initialize list to push to spreadsheet
  var output = [];


  var lastRow = getLastDataRow(targetSheet); // gets last row with real data

  for (let i=0; i < sourceValues.length; i++) {
    if (sourceValues[i][0] > lastTimeStamp) {
      output.push(...pushToArray(sourceValues[i]));
    }
  }


  if (output.length > 0) {
    // update last timestamp for form submission
    targetSheet.getRange("Z1").setValue(new Date());

    // set values in target sheet starting from last row with real data
    targetSheet.getRange(lastRow + 1, 1, output.length, output[0].length).setValues(output);
    
  }

  Logger.log(output);

}

function pushToArray(row) {
  var date = row[1];
  var location = row[7];
  var startTime = row[2];
  var endTime = row[3];
  var eventType = row[4];
  var eventName = row[6];
  var plantData = [row[5]];
  var polygon = String(row[10]);

  // Initialize arrays for storing output
  var left = [];
  var right = [];
  var tempArray = [];
  var result = [];

  //console.log(plantData);

  // Store repeating data in var left and exploded data in right
  left = [date, startTime, endTime, eventType, eventName, location, polygon];
  
  //console.log(left)

  for (let i=0;i<plantData.length;i++) {
    tempArray.push(String(plantData).split(/[,=]/).map(function(value) {return value.trim(); }));
  }

  //console.log(tempArray[0]);

  right = formatList(tempArray[0]);

  //console.log(right);

  for (var i = 0; i < right.length; i++) {
    result.push(left.concat(right[i]));
  }

  return result;

}


function getLastDataRow(sheet) {
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(1, 1, lastRow, 1);
  var values = range.getValue();


  for (var i = lastRow; i > 0; i--) {
    if (values[i] !== "") { // check for empty string from IF() function in sheet
      return i; // if no hidden string, return index of last row
    }
  }

  return 0; // if not data is found, return 0
}


function getData(sheet) {

  allValues = sheet.getDataRange().getValues().slice(1);

  filteredValues = allValues.filter(function(row) {
    return row.some(Boolean);
  });

  return filteredValues;
}
