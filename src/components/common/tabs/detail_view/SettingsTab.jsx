import React from "react";
import PropTypes from "prop-types";
import {faCogs} from "@fortawesome/pro-light-svg-icons";
import CustomTab from "../CustomTab";

export default function SettingsTab(
  {
    activeTab,
    handleTabClick,
    disabled,
    accessRestricted,
  }) {
  return (
    <CustomTab
      activeTab={activeTab}
      tabText={"Settings"}
      tabName={"settings"}
      handleTabClick={handleTabClick}
      icon={faCogs}
      disabled={disabled}
      accessRestricted={accessRestricted}
    />
  );
}

SettingsTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  accessRestricted: PropTypes.bool,
};
