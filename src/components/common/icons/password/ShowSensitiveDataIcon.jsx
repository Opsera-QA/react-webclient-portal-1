import React from "react";
import PropTypes from "prop-types";
import {faEye, faEyeSlash} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";

function ShowSensitiveDataIcon({ isLoading, valueShown, hideDataFunction, showDataFunction, className, disabled }) {
  if (showDataFunction == null || hideDataFunction == null) {
    return null;
  }

  const handleToggle = async () => {
    if (disabled) {
      return;
    }

    if (valueShown === true) {
      hideDataFunction();
    }
    else {
      showDataFunction();
    }
  };

  return (
    <ButtonTooltip trigger={["hover", "focus"]} innerText={valueShown === true ? "Hide Sensitive Data" : "Show Sensitive Data"}>
      <div className={className}>
        <div className={!disabled && !isLoading ? "pointer" : undefined} onClick={() => {handleToggle();}}>
          <span><IconBase isLoading={isLoading} icon={valueShown === true ? faEyeSlash : faEye} /></span>
        </div>
      </div>
    </ButtonTooltip>
  );
}

ShowSensitiveDataIcon.propTypes = {
  showDataFunction: PropTypes.func,
  hideDataFunction: PropTypes.func,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  valueShown: PropTypes.bool,
  disabled: PropTypes.bool
};

export default ShowSensitiveDataIcon;