function eventColour (event) {
  if (event.getTitle().toLowerCase().includes("registered")) {
    event.setColor(CalendarApp.EventColor.PALE_GREEN);
  } else if (event.getTitle().toLowerCase().includes("drop in")) {
    event.setColor(CalendarApp.EventColor.YELLOW);
  } else if (event.getTitle().toLowerCase().includes("special event")) {
    event.setColor(CalendarApp.EventColor.MAUVE);
  } else if (event.getTitle().toLowerCase().includes("sponsored")) {
    event.setColor(CalendarApp.EventColor.CYAN);
  } else if (event.getTitle().toLowerCase().includes("outreach")) {
    event.setColor(CalendarApp.EventColor.ORANGE);
  } else if (event.getTitle().toLowerCase().includes("givewaway")) {
    event.setColor(CalendarApp.EventColor.PALE_RED);
  }
}
