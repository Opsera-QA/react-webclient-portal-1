import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationSquare,
  faExclamationTriangle
} from "@fortawesome/pro-light-svg-icons";

function SiteNotificationBanner({ siteNotification }) {
  if (siteNotification === null || siteNotification.getData("message") === "") {
    return <></>;
  }

  if (siteNotification.getData("type") === "warning") {
    return (
      <div className="w-100 warning-block top-dialog-block-static">
        <FontAwesomeIcon icon={faExclamationTriangle} fixedWidth className="mr-2"/><span>{siteNotification.getData("message")}</span>
      </div>
    );
  }

  if (siteNotification.getData("type") === "error") {
    return (
      <div className="w-100 error-block top-dialog-block-static">
        <FontAwesomeIcon icon={faExclamationCircle} fixedWidth className="mr-2"/><span>{siteNotification.getData("message")}</span>
      </div>
    );
  }

  if (siteNotification.getData("type") === "success") {
    return (
      <div className="w-100 success-block top-dialog-block-static">
        <FontAwesomeIcon icon={faCheckCircle} fixedWidth className="mr-2"/><span>{siteNotification.getData("message")}</span>
      </div>
    );
  }

  // Default is information
  return (
    <div className="w-100 info-block top-dialog-block-static">
      <FontAwesomeIcon icon={faExclamationSquare} fixedWidth className="mr-2"/><span>{siteNotification.getData("message")}</span>
    </div>
  );
}

SiteNotificationBanner.propTypes = {
  siteNotification: PropTypes.object,
};

export default SiteNotificationBanner;