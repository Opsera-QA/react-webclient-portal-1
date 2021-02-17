import React  from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {tabAccessRestricted} from "components/common/tooltip/popover-text";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";

function NavigationTab({activeTab, tabName, tabText, handleTabClick, icon, visible, disabled, toolTipText}) {
  const getTab = () => {
    return (
      <li className="mr-1">
        <a className={"nav-link " + (activeTab === tabName ? "active" : "")} onClick={handleTabClick(tabName)} href="#">
          {getIcon()}<span className="ml-2 d-none d-lg-inline">{tabText}</span>
        </a>
      </li>
    )
  };

  const getIcon = () => {
    if (icon) {
      return (
        <FontAwesomeIcon icon={icon} fixedWidth/>
      );
    }
  };

  if (!visible) {
    return null;
  }

  if (disabled) {
    return (
      <li className="mr-1">
        <TooltipWrapper innerText={tabAccessRestricted} placement={"bottom"}>
          <div className={"nav-link disabled-tab"}>
            {/*<FontAwesomeIcon icon={faExclamationCircle} fixedWidth/>*/}<span className="ml-2 d-none d-lg-inline">{tabText}</span>
          </div>
        </TooltipWrapper>
      </li>
    );
  }

  if (toolTipText) {
    return (
      <TooltipWrapper innerText={toolTipText} placement={"bottom"}>
        {getTab()}
      </TooltipWrapper>
    );
  }

  return (getTab());
}

NavigationTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired,
  tabName: PropTypes.string.isRequired,
  tabText: PropTypes.string.isRequired,
  icon: PropTypes.object,
  visible: PropTypes.bool,
  disabled: PropTypes.bool,
  toolTipText: PropTypes.string
};

NavigationTab.defaultProps = {
  visible: true
};

export default NavigationTab;