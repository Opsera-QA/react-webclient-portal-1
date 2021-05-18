import React  from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";

function ToggleTab({ activeTab, tabText, settingsTabName, tabName, icon, handleTabClick }) {
  if (activeTab === settingsTabName) {
    return (<CustomTab activeTab={activeTab} tabText={tabText} tabName={settingsTabName} handleTabClick={handleTabClick} icon={icon} />);
  }

  return (<CustomTab activeTab={activeTab} tabText={tabText} tabName={tabName} handleTabClick={handleTabClick} icon={icon} />);
}

ToggleTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired,
  tabText: PropTypes.string,
  tabName: PropTypes.string,
  settingsTabName: PropTypes.string,
  icon: PropTypes.object,
};

export default ToggleTab;