import React from "react";
import PropTypes from "prop-types";
import {faList} from "@fortawesome/pro-light-svg-icons";
import ToggleTab from "components/common/tabs/detail_view/ToggleTab";

function ToolAttributesTab({ handleTabClick, activeTab }) {
  return (
    <ToggleTab
      icon={faList}
      tabName={"attributes"}
      settingsTabName={"attribute_settings"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Attributes"}
    />
  );
}

ToolAttributesTab.propTypes = {
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolAttributesTab;


