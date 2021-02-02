import React  from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {tabAccessRestricted} from "components/common/tooltip/popover-text";

function CustomTab({activeTab, tabName, tabText, handleTabClick, icon, visible, disabled, toolTipText}) {
  const getTab = () => {
    return (
      <li className="nav-item mr-1">
        <a className={"nav-link " + (activeTab === tabName ? "active" : "")} onClick={handleTabClick(tabName)} href="#">
          <FontAwesomeIcon icon={icon} fixedWidth/><span className="ml-2 d-none d-lg-inline">{tabText}</span>
        </a>
      </li>
    );
  };

  if (!visible) {
    return null;
  }

  if (disabled) {
    return (
      <li className="nav-item mr-1">
        <TooltipWrapper innerText={tabAccessRestricted}>
          <div className={"nav-link disabled-tab"}>
            <FontAwesomeIcon icon={icon} fixedWidth/><span className="ml-2 d-none d-lg-inline">{tabText}</span>
          </div>
        </TooltipWrapper>
      </li>
    );
  }

  if (toolTipText) {
   return (
     <TooltipWrapper innerText={toolTipText}>
       {getTab()}
     </TooltipWrapper>
   );
  }

  return (getTab());
}

CustomTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired,
  tabName: PropTypes.string.isRequired,
  tabText: PropTypes.string.isRequired,
  icon: PropTypes.object,
  visible: PropTypes.bool,
  toolTipText: PropTypes.string,
  disabled: PropTypes.bool
};

CustomTab.defaultProps = {
  visible: true
};

export default CustomTab;