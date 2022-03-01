import React from "react";
import PropTypes from "prop-types";
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationSquare,
  faExclamationTriangle
} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function SiteNotificationBanner({ siteNotification }) {
  if (siteNotification === null || siteNotification.getData("message") === "") {
    return <></>;
  }

  if (siteNotification.getData("type") === "warning") {
    return (
      <div className="w-100 warning-block top-dialog-block-static">
        <IconBase icon={faExclamationTriangle} className={"mr-2"}/><span>{siteNotification.getData("message")}</span>
      </div>
    );
  }

  if (siteNotification.getData("type") === "error") {
    return (
      <div className="w-100 error-block top-dialog-block-static">
        <IconBase icon={faExclamationCircle} className={"mr-2"}/><span>{siteNotification.getData("message")}</span>
      </div>
    );
  }

  if (siteNotification.getData("type") === "success") {
    return (
      <div className="w-100 success-block top-dialog-block-static">
        <IconBase icon={faCheckCircle} className={"mr-2"}/><span>{siteNotification.getData("message")}</span>
      </div>
    );
  }

  // Default is information
  return (
    <div className="w-100 info-block top-dialog-block-static">
      <IconBase icon={faExclamationSquare} className={"mr-2"}/><span>{siteNotification.getData("message")}</span>
    </div>
  );
}

SiteNotificationBanner.propTypes = {
  siteNotification: PropTypes.object,
};

export default SiteNotificationBanner;