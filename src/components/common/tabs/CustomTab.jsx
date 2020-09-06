import React, { useState } from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function CustomTab({ activeTab, tabName, tabText, handleTabClick, icon }) {
  return (
    <>
      <li className="nav-item mr-1">
        <a className={"nav-link " + (activeTab === tabName ? "active" : "")} onClick={handleTabClick(tabName)}
           href="#"><FontAwesomeIcon icon={icon} fixedWidth/><span className="ml-2 d-none d-lg-inline">{tabText}</span></a>
      </li>
    </>
  );
}

CustomTab.propTypes = {
  tabSelection: PropTypes.string,
  handleTabClick: PropTypes.func,
  tabName: PropTypes.string,
  tabText: PropTypes.string,
  icon: PropTypes.object
};

export default CustomTab;