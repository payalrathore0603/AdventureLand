import { Plus } from "lucide-react";

export default function SuggestionProfile() {
  return (
    <div className="s-user-info">
      <div className="s-user-image-div">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Suggested User Avatar"
          className="s-profile-image"
        />
      </div>
      <div className="s-user-detials">
        <p>Sarah Jenkins</p>
        <p>Suggested for you</p>
      </div>
      <div className="s-follow-btn">
        <button type="button">
          Follow
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
}
