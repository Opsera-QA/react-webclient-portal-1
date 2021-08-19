import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faEye, faEyeSlash} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";

function ShowSensitiveDataButton({ isLoading, valueShown, hideData, showData, variant, size, className }) {
  if (showData == null || hideData == null) {
    return null;
  }

  const onClick = async () => {
    if (valueShown === true) {
      hideData();
    }
    else {
      showData();
    }
  };

  return (
    <ButtonTooltip trigger={["hover", "focus"]} innerText={valueShown === true ? "Hide Sensitive Data" : "Show Sensitive Data"}>
      <div className={className}>
        <Button variant={variant} size={size} disabled={isLoading} onClick={() => {onClick();}}>
          <span><IconBase isLoading={isLoading} icon={valueShown === true ? faEyeSlash : faEye} /></span>
        </Button>
      </div>
    </ButtonTooltip>
  );
}

ShowSensitiveDataButton.propTypes = {
  showData: PropTypes.func,
  hideData: PropTypes.func,
  isLoading: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  valueShown: PropTypes.string
};

ShowSensitiveDataButton.defaultProps = {
  variant: "outline-primary",
};

export default ShowSensitiveDataButton;