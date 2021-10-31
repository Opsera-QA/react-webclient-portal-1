import React from "react";
import PropTypes from "prop-types";
import {faFileAlt} from "@fortawesome/pro-light-svg-icons";
import CustomTab from "components/common/tabs/CustomTab";

function SummaryToggleTab({activeTab, handleTabClick}) {
  if (activeTab === "settings") {
    return (
      <CustomTab
        activeTab={activeTab}
        tabText={"Summary"}
        tabName={"settings"}
        handleTabClick={handleTabClick}
        icon={faFileAlt}
      />
    );
  }

  return (
    <CustomTab
      activeTab={activeTab}
      tabText={"Summary"}
      tabName={"summary"}
      handleTabClick={handleTabClick}
      icon={faFileAlt}
    />
  );
}

SummaryToggleTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired,
};

export default SummaryToggleTab;