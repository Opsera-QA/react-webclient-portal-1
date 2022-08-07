import React from "react";
import PropTypes from "prop-types";
import { fontThemeConstants } from "temp-library-components/theme/font.theme.constants";
import useComponentStateReference from "hooks/useComponentStateReference";

// Should this be standardized and not related to the button?
export const WIZARD_BUTTON_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

// TODO: Pick better name, standardize
function WizardButton(
  {
    className,
    onClickFunction,
    buttonText,
    variant,
    disabled,
  }) {
  const { themeConstants } = useComponentStateReference();

  const getStyling = () => {
    switch (variant) {
      case WIZARD_BUTTON_VARIANTS.SECONDARY:
        return (
          {
            backgroundColor: themeConstants.COLOR_PALETTE.WHITE,
            borderRadius: "2em",
            border: `2px solid ${themeConstants.COLOR_PALETTE.BACKGROUND_LAVENDER}`,
            color: themeConstants.COLOR_PALETTE.BLACK,
            width: "225px",
            fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
            fontWeight: 400,
            fontSize: "18px",
            cursor: disabled === true ? "default" : "pointer",
          }
        );
      case WIZARD_BUTTON_VARIANTS.PRIMARY:
      default:
        return (
          {
            backgroundColor: themeConstants.COLOR_PALETTE.DEEP_PURPLE,
            borderRadius: "2em",
            border: `2px solid ${themeConstants.COLOR_PALETTE.DEEP_PURPLE}`,
            color: themeConstants.COLOR_PALETTE.WHITE,
            width: "225px",
            fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
            fontWeight: 400,
            fontSize: "18px",
            cursor: disabled === true ? "default" : "pointer",
          }
        );
    }
  };

  const handleOnClickFunction = () => {
    if (disabled !== true) {
      onClickFunction();
    }
  };

  if (onClickFunction == null && disabled !== true) {
    return null;
  }

  return (
    <div className={className}>
      <div
        style={getStyling()}
        className={"mx-auto d-flex"}
        onClick={handleOnClickFunction}
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
  variant: PropTypes.string,
  disabled: PropTypes.bool,
};

export default WizardButton;
