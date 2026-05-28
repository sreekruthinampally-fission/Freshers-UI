var events = []
function addEvent()
{
  var inputBox = document.getElementById("eventInput")
  events.push(inputBox.value)
  inputBox.value = ""
  showEvents()
}

function showEvents()
{
  var list = document.getElementById("eventList")
  list.innerHTML = ""
  var i = 0
  while (i < events.length)
  {
    list.innerHTML =
    list.innerHTML +
    "<p>" +
    events[i] +

    " <button onclick='editEvent(" + i + ")'>Edit</button>" +

    " <button onclick='deleteEvent(" + i + ")'>Delete</button>" +

    "</p>"
    i = i + 1
  }
}

function deleteEvent(index)
{
  events.splice(index, 1)
  showEvents()
}

function editEvent(index)
{
  var newEvent = prompt("Edit event")
  events[index] = newEvent
  showEvents()
}