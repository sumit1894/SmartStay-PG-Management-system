import "../style/topbar.css";

export const Topbar = () => {
  return (
    <div className="topbar">
      <h3 className="Dashboard-header">Dashboard</h3>

      <div className="profile">
        <span>Admin</span>
        <button>Logout</button>
      </div>
    </div>
  );
};