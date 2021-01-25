import React  from "react";
import PropTypes from "prop-types";
import {faCogs, faFileAlt} from "@fortawesome/pro-light-svg-icons";
import CustomTab from "../CustomTab";

function SummaryToggleTab({ activeTab, handleTabClick }) {
  if (activeTab === "settings") {
    return (<CustomTab activeTab={activeTab} tabText={"Settings"} tabName={"settings"} handleTabClick={handleTabClick} icon={faCogs} />);
  }

  return (<CustomTab activeTab={activeTab} tabText={"Summary"} tabName={"summary"} handleTabClick={handleTabClick} icon={faFileAlt} />);
}

SummaryToggleTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired,
};

export default SummaryToggleTab;