import React  from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {tabAccessRestricted, tabDisabled} from "components/common/tooltip/popover-text";
import IconBase from "components/common/icons/IconBase";

function TreeTab({activeTab, tabName, tabText, setActiveTab, clickTabFunction, icon, visible, disabled, accessRestricted, toolTipText}) {
  const handleTabClick = (activeTab) => e => {
    e.preventDefault();

    if (clickTabFunction) {
      clickTabFunction(activeTab);
    }
    else {
      setActiveTab(activeTab);
    }
  };

  const getIcon = () => {
    return (<IconBase icon={icon} className={"mr-2"} />);
  };

  const getTab = () => {
    return (
      <li className="nav-item mr-1">
        <a className={"nav-link " + (activeTab === tabName ? "active" : "")} onClick={handleTabClick(tabName)} href="#">
          {getIcon()}<span className="d-none d-lg-inline">{tabText}</span>
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
            {getIcon()}<span className="d-none d-lg-inline">{tabText}</span>
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

TreeTab.propTypes = {
  activeTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  handleTabClick: PropTypes.func.isRequired,
  tabName: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  tabText: PropTypes.string.isRequired,
  icon: PropTypes.object,
  visible: PropTypes.bool,
  toolTipText: PropTypes.string,
  disabled: PropTypes.bool,
  accessRestricted: PropTypes.bool,
  clickTabFunction: PropTypes.func,
  setActiveTab: PropTypes.func
};

TreeTab.defaultProps = {
  visible: true
};

export default TreeTab;