import React from "react";
import PropTypes from "prop-types";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

function DataNotFoundContainer({ breadcrumbDestination, type, children }) {

  return (
    <div className="max-content-width mb-2 ml-2">
      <BreadcrumbTrail destination={breadcrumbDestination} />
      <div className="content-container content-card-1 ">
        <div className="pl-2 content-block-header title-text-header-1">
          <FontAwesomeIcon icon={faExclamationTriangle} fixedWidth className="mr-1"/>{type} Not Found!
        </div>
        <div className="detail-view-body">
          <div className="mt-2">
            {children}
          </div>
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