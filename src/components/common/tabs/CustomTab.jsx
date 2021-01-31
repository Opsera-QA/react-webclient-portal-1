import React  from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function CustomTab({activeTab, tabName, tabText, handleTabClick, icon, visible, disabled}) {
  if (!visible) {
    return null;
  }

  if (disabled) {
    return (
      <li className="nav-item mr-1">
        <div className={"nav-link disabled-tab"}>
          <FontAwesomeIcon icon={icon} fixedWidth/><span className="ml-2 d-none d-lg-inline">{tabText}</span>
        </div>
      </li>
    );
  }

  return (
    <li className="nav-item mr-1">
      <a className={"nav-link " + (activeTab === tabName ? "active" : "")} onClick={handleTabClick(tabName)} href="#">
        <FontAwesomeIcon icon={icon} fixedWidth/><span className="ml-2 d-none d-lg-inline">{tabText}</span>
      </a>
    </li>
  );
}

CustomTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired,
  tabName: PropTypes.string.isRequired,
  tabText: PropTypes.string.isRequired,
  icon: PropTypes.object,
  visible: PropTypes.bool,
  disabled: PropTypes.bool
};

CustomTab.defaultProps = {
  visible: true
};

export default CustomTab;