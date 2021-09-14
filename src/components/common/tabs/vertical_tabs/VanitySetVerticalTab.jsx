import React  from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {tabAccessRestricted, tabDisabled} from "components/common/tooltip/popover-text";
import {Image, Nav} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";

function VanitySetVerticalTab({tabName, tabText, icon, visible, disabled, accessRestricted, tooltipText, onSelect, iconComponent}) {
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

  const getIcon = () => {
    if (iconComponent) {
      return (
        <div className={"tab-icon"}>
          {iconComponent}
        </div>
      );
    }

    return (
      <div>
        <IconBase icon={icon} className={"mr-2"} />
      </div>
    );
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
        onSelect={onSelect}
      >
        {getIcon()}
        <span className="d-none d-lg-inline">{tabText}</span>
      </Nav.Link>
    </TooltipWrapper>
  );
}

VanitySetVerticalTab.propTypes = {
  tabName: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  tabText: PropTypes.string.isRequired,
  icon: PropTypes.object,
  visible: PropTypes.bool,
  tooltipText: PropTypes.string,
  disabled: PropTypes.bool,
  accessRestricted: PropTypes.bool,
  onSelect: PropTypes.func,
  iconComponent: PropTypes.object,
};

export default VanitySetVerticalTab;