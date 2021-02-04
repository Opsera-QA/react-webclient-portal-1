import React  from "react";
import PropTypes from "prop-types";
import {faCogs} from "@fortawesome/pro-light-svg-icons";
import CustomTab from "../CustomTab";

function SettingsTab({ activeTab, handleTabClick, disabled }) {
  return (<CustomTab activeTab={activeTab} tabText={"Settings"} tabName={"settings"} handleTabClick={handleTabClick} icon={faCogs} disabled={disabled} />);
}

SettingsTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default SettingsTab;