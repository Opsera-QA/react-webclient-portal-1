import React  from "react";
import PropTypes from "prop-types";
import {faCode} from "@fortawesome/pro-light-svg-icons";
import CustomTab from "../CustomTab";

function JsonTab({activeTab, handleTabClick}) {
  return (
    <CustomTab
      activeTab={activeTab}
      tabText={"Object View"}
      tabName={"json"}
      handleTabClick={handleTabClick}
      icon={faCode}
    />
  );
}

JsonTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired,
};

export default JsonTab;