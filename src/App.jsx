import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import EventForm from "./components/EventForm";
import EventCard from "./components/EventCard";

import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const [page, setPage] = useState("home");

  function handleSubmit() {
    if (text.trim() === "") {
      return;
    }

    if (editIndex === -1) {
      setEvents([...events, text]);
    } else {
      const updatedEvents = [...events];

      updatedEvents[editIndex] = text;

      setEvents(updatedEvents);

      setEditIndex(-1);
    }

    setText("");
  }

  function deleteEvent(index) {
    const updatedEvents = events.filter(
      (_, i) => i !== index
    );

    setEvents(updatedEvents);
  }

  function editEvent(index) {
    setText(events[index]);

    setEditIndex(index);
  }

  return (
    <>
      <Navbar />

      <div className="layout">

        <Sidebar setPage={setPage} />

        <div className="content">

          {page === "home" && (
            <>
              <EventForm
                text={text}
                setText={setText}
                handleSubmit={handleSubmit}
                isEditing={editIndex !== -1}
              />

              <div className="event-list">

                {events.map((event, index) => (
                  <EventCard
                    key={index}
                    event={event}
                    onDelete={() =>
                      deleteEvent(index)
                    }
                    onEdit={() =>
                      editEvent(index)
                    }
                  />
                ))}

              </div>
            </>
          )}

          {page === "events" && (
            <div className="all-events">

              <h2>All Events</h2>

              {events.length === 0 ? (
                <p>No events added yet.</p>
              ) : (
                events.map((event, index) => (
                  <div
                    key={index}
                    className="event-row"
                  >
                    {event}
                  </div>
                ))
              )}

            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default App;