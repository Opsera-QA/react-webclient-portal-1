import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function ToggleSettingsIcon({ activeTab, setActiveTab, className }) {
  const toggleSettings = () => {
    setActiveTab("settings");
  };

  if (!setActiveTab || activeTab === "settings") {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={"Toggle Settings"}>
        <FontAwesomeIcon
          onClick={() => {toggleSettings();}}
          icon={faCogs}
          fixedWidth
          className={"pointer"}
        />
      </TooltipWrapper>
    </div>
  );
}

ToggleSettingsIcon.propTypes = {
  setActiveTab: PropTypes.func,
  activeTab: PropTypes.string,
  className: PropTypes.string
};

export default ToggleSettingsIcon;