import React  from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {tabAccessRestricted, tabDisabled} from "components/common/tooltip/popover-text";
import {Nav} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";

function VanityVerticalTab({tabName, tabText, icon, visible, disabled, accessRestricted, tooltipText}) {
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

  if (visible === false) {
    return null;
  }

  return (
    <TooltipWrapper innerText={getTooltipText()}>
      <Nav.Link key={tabName} eventKey={tabName} disabled={disabled || accessRestricted}>
        <IconBase icon={icon} className={"mr-2"} />
        <span className="d-none d-lg-inline">{tabText}</span>
      </Nav.Link>
    </TooltipWrapper>
  );
}

VanityVerticalTab.propTypes = {
  tabName: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  tabText: PropTypes.string.isRequired,
  icon: PropTypes.object,
  visible: PropTypes.bool,
  tooltipText: PropTypes.string,
  disabled: PropTypes.bool,
  accessRestricted: PropTypes.bool,
};

export default VanityVerticalTab;