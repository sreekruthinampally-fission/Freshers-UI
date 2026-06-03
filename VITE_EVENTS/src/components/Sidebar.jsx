function Sidebar({ setPage }) {
  return (
    <div className="sidebar">

      <button
        className="sidebar-btn"
        onClick={() => setPage("home")}
      >
        Home
      </button>

      <button
        className="sidebar-btn"
        onClick={() => setPage("events")}
      >
        All Events
      </button>

    </div>
  );
}

export default Sidebar;