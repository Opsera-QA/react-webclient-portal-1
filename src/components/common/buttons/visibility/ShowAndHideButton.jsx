import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faEye, faEyeSlash} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";

function ShowAndHideButton(
  {
    isLoading,
    valueShown,
    hideDataFunction,
    showDataFunction,
    variant,
    size,
    className,
    disabled,
    type,
  }) {
  if (showDataFunction == null || hideDataFunction == null) {
    return null;
  }

  const onClick = async () => {
    if (valueShown === true) {
      hideDataFunction();
    }
    else {
      showDataFunction();
    }
  };

  return (
    <ButtonTooltip
      innerText={valueShown === true ? `Hide ${type}` : `Show ${type}` }
    >
      <div className={className}>
        <Button
          variant={variant}
          size={size}
          disabled={isLoading || disabled}
          onClick={() => onClick()}
        >
          <span>
            <IconBase
              isLoading={isLoading}
              icon={valueShown === true ? faEyeSlash : faEye}
            />
          </span>
        </Button>
      </div>
    </ButtonTooltip>
  );
}

ShowAndHideButton.propTypes = {
  showDataFunction: PropTypes.func,
  hideDataFunction: PropTypes.func,
  isLoading: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  valueShown: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

ShowAndHideButton.defaultProps = {
  variant: "outline-primary",
  type: "Data",
};

export default ShowAndHideButton;