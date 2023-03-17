import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

function ToggleJsonViewIconButton({ toggleView, className, size, variant}) {
  if (toggleView == null) {
    return null;
  }

  return (
    <TooltipWrapper innerText={"Toggle View"} >
      <div className={className}>
        <Button variant={variant} size={size}  onClick={() => {toggleView();}}>
          <span><IconBase icon={faBracketsCurly}/></span>
        </Button>
      </div>
    </TooltipWrapper>
  );
}

ToggleJsonViewIconButton.propTypes = {
  toggleView: PropTypes.func,
  className: PropTypes.string,
  theme: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
};

ToggleJsonViewIconButton.defaultProps = {
  variant: "outline-primary",
  size: "sm"
};

export default ToggleJsonViewIconButton;