var events = [];

var editIndex = -1;

function addEvent() {
  var inputBox = document.getElementById("eventInput");
  var button = document.getElementById("actionButton");

  if (inputBox.value.trim() == "") {
    alert("Please enter an event");
    return;
  }

  if (editIndex == -1) {
    events.push(inputBox.value.trim());
  } else {
    events[editIndex] = inputBox.value.trim();
    editIndex = -1;
    button.innerText = "Add Event";
  }

  inputBox.value = "";
  showEvents();
}

function showEvents() {
  var list = document.getElementById("eventList");

  list.innerHTML = "";

  var i = 0;

  while (i < events.length) {
    list.innerHTML +=
      "<div class='event'>" +

      "<span>" +
      events[i] +
      "</span>" +

      "<div class='actions'>" +

      "<button class='edit-btn' onclick='editEvent(" + i + ")'>Edit</button>" +

      "<button class='delete-btn' onclick='deleteEvent(" + i + ")'>Delete</button>" +

      "</div>" +

      "</div>";

    i++;
  }
}

function deleteEvent(index) {
  events.splice(index, 1);
  showEvents();
}

function editEvent(index) {
  var inputBox = document.getElementById("eventInput");
  var button = document.getElementById("actionButton");

  inputBox.value = events[index];

  editIndex = index;

  button.innerText = "Update Event";

  inputBox.focus();
}