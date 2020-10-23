import React from "react";
import {Link} from "react-router-dom";

function MicrosoftTeamsApiConnector() {
  return (
    <div className="m-3">
      <div className="h5">Microsoft Teams Credentials</div>
      <div>You can connect to Microsoft Teams using credentials stored on a per-tool basis in the <Link to="/inventory/tools">Tool Registry</Link>.</div>
      <div>To get started, create a Microsoft Teams tool with your credentials.</div>
    </div>
  );
}

export default MicrosoftTeamsApiConnector;