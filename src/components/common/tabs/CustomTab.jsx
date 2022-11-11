import React  from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {tabAccessRestricted, tabDisabled} from "components/common/tooltip/popover-text";
import {faTimes} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import {hasStringValue} from "components/common/helpers/string-helpers";

function CustomTab({activeTab, tabName, tabText, handleTabClick, icon, visible, disabled, accessRestricted, toolTipText, closeTab}) {
  const getIcon = () => {
    if (icon) {
      return (
        <IconBase
          icon={icon}
        />
      );
    }
  };

  const getTabField = () => {
    if (hasStringValue(tabText) === true && icon) {
      return (
        <span>
          <span className={"mr-2"}>
            {getIcon()}
          </span>
          {tabText}
        </span>
      );
    }

    if (icon) {
      return getIcon();
    }

    return (
      <span>
        {tabText}
      </span>
    );
  };

  const getClosableTab = () => {
    return (
      <li className="nav-item mr-1">
        <div className={"d-flex nav-link " + (activeTab === tabName ? "active" : "")}>
          <span onClick={handleTabClick(tabName)} className={"pointer mr-2"}>
            {getTabField()}
          </span>
          <IconBase icon={faTimes} className={"mt-1 pointer"} onClickFunction={() => { closeTab(tabName);}} />
        </div>
      </li>
    );
  };

  const getTab = () => {
    return (
      <li className={"nav-item mr-1"}>
        <a className={"nav-link " + (activeTab === tabName ? "active" : "")} onClick={handleTabClick(tabName)} href={"#"}>
          {getTabField()}
        </a>
      </li>
    );
  };

  if (!visible) {
    return null;
  }

  if (disabled || accessRestricted) {
    return (
      <li className="nav-item mr-1">
        <TooltipWrapper innerText={accessRestricted ? tabAccessRestricted : tabDisabled}>
          <div className={"nav-link disabled-tab"}>
            {getTabField()}
          </div>
        </TooltipWrapper>
      </li>
    );
  }

  if (closeTab && activeTab === tabName) {
    if (toolTipText) {
      return (
        <TooltipWrapper innerText={toolTipText}>
          {getClosableTab()}
        </TooltipWrapper>
      );
    }

    return getClosableTab();
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
  activeTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  handleTabClick: PropTypes.func.isRequired,
  tabName: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  tabText: PropTypes.string,
  icon: PropTypes.object,
  visible: PropTypes.bool,
  toolTipText: PropTypes.string,
  disabled: PropTypes.bool,
  accessRestricted: PropTypes.bool,
  closeTab: PropTypes.func,
};

CustomTab.defaultProps = {
  visible: true
};

export default CustomTab;