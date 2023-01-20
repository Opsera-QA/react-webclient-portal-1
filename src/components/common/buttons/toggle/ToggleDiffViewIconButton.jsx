import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faCodeCompare} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

function ToggleDiffViewIconButton({ toggleDiffView, className, size, variant}) {
  if (toggleDiffView == null) {
    return null;
  }

  return (
    <TooltipWrapper innerText={"Toggle Inline/ Side by Side Diff View"} >
      <div className={className}>
        <Button variant={variant} size={size}  onClick={() => {toggleDiffView();}}>
          <span><IconBase icon={faCodeCompare}/></span>
        </Button>
      </div>
    </TooltipWrapper>
  );
}

ToggleDiffViewIconButton.propTypes = {
  toggleDiffView: PropTypes.func,
  className: PropTypes.string,
  theme: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
};

ToggleDiffViewIconButton.defaultProps = {
  variant: "outline-primary",
  size: "sm"
};

export default ToggleDiffViewIconButton;