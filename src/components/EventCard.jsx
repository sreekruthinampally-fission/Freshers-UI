function EventCard({
  event,
  onDelete,
  onEdit
}) {
  return (
    <div className="card">

      <span>{event}</span>

      <div className="actions">

        <button
          className="edit-btn"
          onClick={onEdit}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={onDelete}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default EventCard;