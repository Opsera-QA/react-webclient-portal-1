import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import "../../../../theme.css";

function FailIcon() {
  return (
    <div className="status-icon">
      <FontAwesomeIcon icon={faCircle} className="cell-icon yellow fa-md" />
    </div>
  );
}

export default FailIcon;