import React  from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {tabAccessRestricted} from "components/common/tooltip/popover-text";
import IconBase from "components/common/icons/IconBase";
import BetaBadge from "components/common/badges/BetaBadge";

function NavigationTab(
  {
    activeTab,
    tabName,
    tabText,
    handleTabClick,
    icon,
    visible,
    disabled,
    toolTipText,
    isBeta,
    hideIfInactive,
  }) {
  const getTab = () => {
    return (
      <li className="mr-1">
        <a className={"nav-link " + (activeTab === tabName ? "active" : "")} onClick={handleTabClick(tabName)} href="#">
          {getIcon()}<span className="ml-2 d-none d-lg-inline">{tabText}</span>
          <BetaBadge
            isBeta={isBeta}
            className={"mr-1 ml-2 my-auto"}
          />
        </a>
      </li>
    );
  };

  const getIcon = () => {
    if (icon) {
      return (
        <IconBase icon={icon}/>
      );
    }
  };

  if (visible === false || (hideIfInactive === true && activeTab !== tabName)) {
    return null;
  }

  if (disabled) {
    return (
      <li className="mr-1">
        <TooltipWrapper innerText={tabAccessRestricted} placement={"bottom"}>
          <div className={"nav-link disabled-tab"}>
           <span className="ml-2 d-none d-lg-inline">{tabText}</span>
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
  toolTipText: PropTypes.string,
  isBeta: PropTypes.bool,
  hideIfInactive: PropTypes.bool,
};

export default NavigationTab;