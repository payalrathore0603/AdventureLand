import { Link } from "react-router-dom";
import SuggestionProfile from "./SuggestionProfile";

export default function RigthSideBar() {
  return (
    <div className="r-container">
      {/* Stories Tray Section */}
      <div>
        <p className="r-heading">Stories</p>
        <div className="r-story-div">
          {/* <Story /> components render fluidly on this horizontal flex track axis */}
        </div>
      </div>

      {/* Suggestion System Segment List */}
      <div className="r-suggestion-box">
        <p className="r-heading">Suggestions For You</p>
        <div className="r-suggestion-container">
          <SuggestionProfile />
          <SuggestionProfile />
          <SuggestionProfile />
        </div>
        <Link to="/suggestions" className="s-Link">
          See all suggestions
        </Link>
      </div>
    </div>
  );
}
