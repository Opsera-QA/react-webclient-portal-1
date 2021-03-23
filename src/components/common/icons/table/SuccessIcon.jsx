import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "../../../../theme.css";

function SuccessIcon() {
  return (
    <div className="status-icon">
      <FontAwesomeIcon icon={faCheck} className="cell-icon green fa-md" />
    </div>
  );
}

export default SuccessIcon;