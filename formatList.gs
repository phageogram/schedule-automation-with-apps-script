function formatList(inputList) {
  var outputList = [];

  // Iterate over the inputList in steps of 2 to group the elements
  for (var i = 0; i < inputList.length; i += 2) {
    var name = inputList[i].replace(/\s*\(\S+\)\s*/, ''); // Remove text inside parentheses
    var size = inputList[i].match(/\(([^)]+)\)/)[1]; // Extract text inside parentheses
    var quantity = parseInt(inputList[i + 1]);

    // Create a subarray with the formatted values and push it to the outputList
    outputList.push([name, size, quantity]);
  }

  return outputList;
}
