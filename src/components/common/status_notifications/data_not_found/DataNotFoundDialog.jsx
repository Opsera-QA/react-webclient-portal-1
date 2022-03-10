import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import IconBase from "components/common/icons/IconBase";

// TODO: We should just pull all the management stuff from the breadcrumb's parent instead.
function DataNotFoundDialog ({ type, managementViewTitle, managementViewLink, managementViewIcon }) {

  const getManagementViewLink = () => {
    return (
      <span>
        <Link to={managementViewLink}>
          <IconBase icon={managementViewIcon} className={"mr-2"}/>
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
  };

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