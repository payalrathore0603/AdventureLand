export default function Profile() {
  return (
    <div className="l-user-info">
      <div className="l-user-image-div">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="User Profile"
          className="l-profile-image"
        />
      </div>
      <div className="l-user-detials">
        <p>Alex Mercer</p>
        <p>@alex_explorer</p>
      </div>
    </div>
  );
}
