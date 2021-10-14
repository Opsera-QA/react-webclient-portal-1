import React  from "react";
import PropTypes from "prop-types";
import {faLaptopCode} from "@fortawesome/pro-light-svg-icons";
import CustomTab from "components/common/tabs/CustomTab";

function ConsoleLogTab({activeTab, handleTabClick}) {
  return (
    <CustomTab
      activeTab={activeTab}
      tabText={"Console Log"}
      tabName={"log"}
      handleTabClick={handleTabClick}
      icon={faLaptopCode}
    />
  );
}

ConsoleLogTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired,
};

export default ConsoleLogTab;