import React from "react";
import PropTypes from "prop-types";
import {faCogs} from "@fortawesome/pro-light-svg-icons";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function ToggleSettingsIcon(
  {
    activeTab,
    setActiveTab,
    className,
    visible,
    readOnly,
  }) {
  const {
    isOpseraAdministrator,
  } = useComponentStateReference();

  const toggleSettings = () => {
    setActiveTab("settings");
  };

  if ((!setActiveTab && readOnly !== true) || activeTab === "settings" || visible === false) {
    return null;
  }

  if (isOpseraAdministrator !== true) {
    return (
      <OverlayIconBase
        className={className}
        overlayBody={"Editing Settings is available in the main Opsera offering."}
        icon={faCogs}
      />
    );
  }

  return (
    <OverlayIconBase
      className={className}
      overlayBody={"Toggle Settings"}
      icon={faCogs}
      onClickFunction={toggleSettings}
    />
  );
}

ToggleSettingsIcon.propTypes = {
  setActiveTab: PropTypes.func,
  activeTab: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.bool,
  readOnly: PropTypes.bool,
};