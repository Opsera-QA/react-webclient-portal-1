import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter, faTimes} from "@fortawesome/pro-light-svg-icons";

function StackedFilterRemovalIcon() {
  return (
    <span className="fa-layers fa-fw">
      <FontAwesomeIcon icon={faFilter}/>
      <FontAwesomeIcon icon={faTimes} transform="right-9 down-5 shrink-4" />
    </span>
  );
}

export default StackedFilterRemovalIcon;