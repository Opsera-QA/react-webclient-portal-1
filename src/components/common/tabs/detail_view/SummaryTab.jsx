import React  from "react";
import PropTypes from "prop-types";
import {faFileAlt} from "@fortawesome/pro-light-svg-icons";
import CustomTab from "../CustomTab";

function SummaryTab({ activeTab, handleTabClick }) {
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

SummaryTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired,
};

export default SummaryTab;