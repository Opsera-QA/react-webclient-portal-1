import React  from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {tabAccessRestricted, tabDisabled} from "components/common/tooltip/popover-text";
import {Nav} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import { hasStringValue } from "components/common/helpers/string-helpers";

function VanitySetVerticalTab(
  {
    className,
    tabName,
    tabText,
    icon,
    visible,
    disabled,
    accessRestricted,
    tooltipText,
    handleTabClick,
    activeTab,
  }) {
  const getTooltipText = () => {
    if (accessRestricted) {
      return (tabAccessRestricted);
    }

    if (disabled) {
      return (tabDisabled);
    }

    if (tooltipText) {
      return (tooltipText);
    }
  };

  const getClassNames = () => {
    let classNames = "my-auto";

    if (hasStringValue(className) === true) {
      classNames += ` ${className}`;
    }

    return classNames;
  };

  if (visible === false) {
    return null;
  }

  return (
    <TooltipWrapper innerText={getTooltipText()}>
      <Nav.Link
        key={tabName}
        eventKey={tabName}
        disabled={disabled || accessRestricted}
        onSelect={handleTabClick}
        className={getClassNames()}
        active={activeTab != null ? activeTab === tabName : undefined}
      >
        <div>
          <div className={"h-100 d-flex"}>
            <IconBase icon={icon} className={"mr-2"} iconSize={"2x"} />
            <div className="my-auto">{tabText}</div>
          </div>
        </div>
      </Nav.Link>
    </TooltipWrapper>
  );
}

VanitySetVerticalTab.propTypes = {
  tabName: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  tabText: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  icon: PropTypes.object,
  visible: PropTypes.bool,
  tooltipText: PropTypes.string,
  disabled: PropTypes.bool,
  accessRestricted: PropTypes.bool,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

export default VanitySetVerticalTab;