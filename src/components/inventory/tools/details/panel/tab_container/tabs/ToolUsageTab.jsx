import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faDraftingCompass,} from "@fortawesome/pro-light-svg-icons";

function ToolUsageTab({ handleTabClick, activeTab }) {
  return (
    <CustomTab
      icon={faDraftingCompass}
      tabName={"usage"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Usage"}
    />
  );
}

ToolUsageTab.propTypes = {
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolUsageTab;


