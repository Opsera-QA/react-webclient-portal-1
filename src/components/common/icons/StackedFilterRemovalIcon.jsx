import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter, faTimes} from "@fortawesome/pro-solid-svg-icons";

function StackedFilterRemovalIcon({}) {
  return (
    <span className="fa-layers fa-fw">
        <FontAwesomeIcon icon={faFilter}/>
        <FontAwesomeIcon icon={faTimes} transform="right-9 down-5 shrink-4" />
    </span>
  );
}

StackedFilterRemovalIcon.propTypes = {
  dashboard: PropTypes.object,
  dashboardsActions: PropTypes.object,
  getAccessToken: PropTypes.func
};

export default StackedFilterRemovalIcon;