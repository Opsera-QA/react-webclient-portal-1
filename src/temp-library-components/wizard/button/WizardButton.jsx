import React from "react";
import PropTypes from "prop-types";
import { fontThemeConstants } from "temp-library-components/theme/font.theme.constants";
import useComponentStateReference from "hooks/useComponentStateReference";

// TODO: Pick better name, standardize
function WizardButton({ className, onClickFunction, buttonText, }) {
  const { themeConstants } = useComponentStateReference();

  if (onClickFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      <div
        style={{
          backgroundColor: themeConstants.COLOR_PALETTE.DEEP_PURPLE,
          borderRadius: "2em",
          color: themeConstants.COLOR_PALETTE.WHITE,
          width: "225px",
          fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
          fontWeight: 400,
          fontSize: "18px",
        }}
        className={"mx-auto pointer d-flex"}
        onClick={onClickFunction}
      >
        <div className={"p-2 m-auto"}>{buttonText}</div>
      </div>
    </div>
  );
}

WizardButton.propTypes = {
  className: PropTypes.string,
  buttonText: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default WizardButton;
