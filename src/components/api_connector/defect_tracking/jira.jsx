import React from "react";
import {Link} from "react-router-dom";

function Jira() {
  return (
      <div className="m-3">
        <div className="h5">Jira Credentials</div>
        <div>You can connect to Jira using credentials stored on a per-tool basis in the <Link to="/inventory/tools">Tool Registry</Link>.</div>
        <div>To get started, create a Jira tool with your credentials.</div>
      </div>
  );
}

export default Jira;
