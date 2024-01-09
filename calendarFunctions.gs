//Global//
var sheetName = "Appscript Input";
var calId = "c_0da71d81be82e57b812dd1a6bebe8744ab5968ede5f44c9d0c18784c235d98bc@group.calendar.google.com";

//Creates button on toolbar//
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Calendar')
      .addItem("Add Shifts to Calendar", 'scheduleShifts')
      .addItem("Colourize Calendar Events", 'colourShifts')
      .addItem("Clear Shifts from Calendar", 'deleteEvents')
      .addToUi();
}

//Clear the calendar to avoid unwanted duplicates//
function deleteEvents() {
  var eventCal = CalendarApp.getCalendarById(calId);
  var startTime = new Date('January 1, 2024 00:00:00');
  var endTime = new Date('December 31, 2024 23:00:00');
  var allEvents = eventCal.getEvents(startTime, endTime);
  var titlesToDelete = ['Registered', 'Drop In', 'Sponsored', 'Special Event', 'Other']
  
  //logInfo('Delete:', 'Deleting - '+allEvents.length+')
  for (var i=0; i<titlesToDelete.length;i++) {
    var title = titlesToDelete[i];
    var eventsToDelete = eventCal.getEvents(startTime, endTime, {search: title});

    for (var j=0; j<eventsToDelete.length;j++) {
      var event = eventsToDelete[j];
      event.deleteEvent();
    }
  }
}

//Push sheet to calendar events//
function scheduleShifts() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Appscript Input');
  var eventCal = CalendarApp.getCalendarById(calId);
  var data = sheet.getRange("A1:F600").getValues().filter(row => row[1] !== null && row[1] !== '' && row[2] !== null && row[2] !== '');
  
  // Hold UUIDs in list
  // var idList = [];

  for (x=0; x<data.length;x++){
    var shift = data[x];
    var title = shift[0];
    var startTime = new Date(shift[1]);
    var endTime = new Date(shift[2]);
    var options = {
      description: shift[4],
      location: shift[3],
      };
    //var id = String(shift[5]); // list id as string
    eventCal.createEvent(title, startTime, endTime, options);
    
    /*if (!idList.includes(id)) {
      // Push event to calendar
      eventCal.createEvent(title, startTime, endTime, options);
      idList.push(id);
    }*/
  }
}

function colourShifts() {
    var eventCal = CalendarApp.getCalendarById(calId);
    var events = eventCal.getEvents(new Date('January 1, 2024 00:00:00'), new Date('December 31, 2024 23:00:00'));

    for (var i = 0; i < events.length; i++) {
      eventColour(events[i]);
    }
}
