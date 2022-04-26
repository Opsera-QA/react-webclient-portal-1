import React from "react";
import PropTypes from "prop-types";
import {faCogs} from "@fortawesome/pro-light-svg-icons";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

function ToggleSettingsIcon({ activeTab, setActiveTab, className, visible }) {
  const toggleSettings = () => {
    setActiveTab("settings");
  };

  if (!setActiveTab || activeTab === "settings" || visible === false) {
    return null;
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
  visible: PropTypes.bool
};

export default ToggleSettingsIcon;