function EventForm({
  text,
  setText,
  handleSubmit,
  isEditing
}) {
  return (
    <div className="form">
      <input
        type="text"
        value={text}
        placeholder="Enter Event"
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <button onClick={handleSubmit}>
        {isEditing
          ? "Update Event"
          : "Add Event"}
      </button>
    </div>
  );
}

export default EventForm;