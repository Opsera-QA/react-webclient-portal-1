import React, {useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/pro-light-svg-icons";
import {getParentBreadcrumb} from "components/common/navigation/trails";
import DataNotFoundDialog from "components/common/status_notifications/data_not_found/DataNotFoundDialog";

// TODO: We should just pull all the management stuff from the breadcrumb's parent instead and construct the dialog here
function DataNotFoundContainer({ breadcrumbDestination, type, children }) {
  const [parentBreadcrumb, setParentBreadcrumb] = useState(getParentBreadcrumb(breadcrumbDestination));

  const getBody = () => {
    // TODO: Remove this check when all areas are updated
    if (children != null) {
      return children;
    }

    if (parentBreadcrumb != null) {
      return (
        <DataNotFoundDialog
          type={type}
          managementViewIcon={parentBreadcrumb["icon"]}
          managementViewTitle={parentBreadcrumb["label"]}
          managementViewLink={`/${parentBreadcrumb["path"]}`}
        />
      )
    }
  }

  return (
    <div className="max-content-width mb-2 ml-2">
      <div className="mb-3">
        <div className="sub-navigation-block" />
      </div>
      <div className="content-container content-card-1 ">
        <div className="pl-2 content-block-header title-text-header-1">
          <FontAwesomeIcon icon={faExclamationTriangle} fixedWidth className="mr-1"/>{type} Not Found!
        </div>
        <div className="p-2 mt-2 shaded-container detail-container-body">
          {getBody()}
        </div>
        <div className="content-block-footer"/>
      </div>
    </div>
  );
}


DataNotFoundContainer.propTypes = {
  breadcrumbDestination: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default DataNotFoundContainer;