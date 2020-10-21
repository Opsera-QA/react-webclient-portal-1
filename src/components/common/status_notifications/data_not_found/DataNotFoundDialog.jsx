import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {faTimes} from "@fortawesome/pro-regular-svg-icons";

function DataNotFoundDialog ({ type, setShowToast, alignment, managementViewTitle, managementViewLink, managementViewIcon }) {

  const clearMessage = () => {
    setShowToast(() => {
        return false;
    });
  };

  const getManagementViewLink = () => {
    return (
      <span>
        <Link to={managementViewLink}>
          <FontAwesomeIcon icon={managementViewIcon} fixedWidth className="mr-2"/>
          {managementViewTitle}.
        </Link>
      </span>
    );
  };

  const constructMessage = () => {
    return (
      <div>
        <span>{`${type} Not Found! The link may have been incorrect, or the ${type} may have been deleted. Please return to `}</span>
        {getManagementViewLink()}
      </div>

    );
  }

  if (alignment === "dialogToast") {
    return (
      <div className="w-100 info-block top-dialog-block">
        {setShowToast
          && <div className="float-right ml-1">
              <FontAwesomeIcon
                icon={faTimes}
                style={{ cursor: "pointer" }}
                onClick={() => {clearMessage();}}
              />
            </div>}
        <span>{constructMessage()}</span>
      </div>
    );
  }

  return (
    <div className="p-3 shaded-panel">
      <div className="info-text text-center m-auto">
        {constructMessage()}
      </div>
    </div>
  );
}

DataNotFoundDialog.propTypes = {
  type: PropTypes.string,
  managementViewTitle: PropTypes.string,
  managementViewLink: PropTypes.string,
  managementViewIcon: PropTypes.object,
  setShowToast: PropTypes.func,
  alignment: PropTypes.string,
};

export default DataNotFoundDialog;