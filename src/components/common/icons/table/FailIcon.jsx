import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../../../../theme.css";

function FailIcon() {
  return (
    <div className="status-icon">
      <FontAwesomeIcon icon={faTimes} className="cell-icon red fa-md" />
    </div>
  )
}

export default FailIcon;