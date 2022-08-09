import React from "react";
import PropTypes from "prop-types";
import { fontThemeConstants } from "temp-library-components/theme/font.theme.constants";
import useComponentStateReference from "hooks/useComponentStateReference";
import IconBase from "components/common/icons/IconBase";

export const SUPPORTED_WIZARD_SELECTION_OPTION_TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

// TODO: Pick better name, standardize
function WizardSelectionRadioOption(
  {
    className,
    onClickFunction,
    text,
    description,
    icon,
    option,
    type,
    selectedOption,
    disabled,
  }) {
  const { themeConstants } = useComponentStateReference();

  const getIconBox = () => {
    if (icon) {
      return (
        <div
          className={"mr-3"}
          style={{
            borderRadius: "9px",
            backgroundColor: themeConstants.COLOR_PALETTE.WHITE,
          }}
        >
          <div className={"py-3 px-4"}>
            <IconBase
              icon={icon}
              iconSize={"lg"}
              className={"m-auto"}
            />
          </div>
        </div>
      );
    }
  };

  const getOptionFontColor = () => {
    if (disabled === true) {
     return themeConstants.COLOR_PALETTE.DARK_GRAY;
    }

    switch (type) {
      case SUPPORTED_WIZARD_SELECTION_OPTION_TYPES.PRIMARY:
        return themeConstants.COLOR_PALETTE.DEEP_PURPLE;
      case SUPPORTED_WIZARD_SELECTION_OPTION_TYPES.SECONDARY:
        return themeConstants.COLOR_PALETTE.DEEP_PURPLE;
    }
  };

  const getBackgroundColor = () => {
    if (disabled === true) {
      return themeConstants.COLOR_PALETTE.BACKGROUND_GRAY;
    }

    switch (type) {
      case SUPPORTED_WIZARD_SELECTION_OPTION_TYPES.PRIMARY:
        return themeConstants.COLOR_PALETTE.DEEP_PURPLE;
      case SUPPORTED_WIZARD_SELECTION_OPTION_TYPES.SECONDARY:
        return themeConstants.COLOR_PALETTE.BACKGROUND_LAVENDER;
    }
  };

  const getRadioOptionContainerStyling = () => {
    const backgroundColor = getBackgroundColor();

    return (
      {
        backgroundColor: backgroundColor,
        borderRadius: ".5em",
        fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
        borderRight: selectedOption === option ? `2px solid ${themeConstants.COLOR_PALETTE.GOLD}` : `2px solid ${backgroundColor}`,
        borderTop: selectedOption === option ? `2px solid ${themeConstants.COLOR_PALETTE.GOLD}` : `2px solid ${backgroundColor}`,
        borderBottom: selectedOption === option ? `2px solid ${themeConstants.COLOR_PALETTE.GOLD}` :`2px solid ${backgroundColor}`,
        borderLeft: selectedOption === option ? `6px solid ${themeConstants.COLOR_PALETTE.GOLD}` : `6px solid ${backgroundColor}`,
        fontWeight: 400,
        fontSize: "18px",
        cursor: disabled ? "not-allowed" : "pointer",
      }
    );
  };

  const handleOnclickFunction = () => {
    if (disabled !== true) {
      onClickFunction(option);
    }
  };

  if (onClickFunction == null && disabled !== true) {
    return null;
  }

  return (
    <div className={className}>
      <div
        style={getRadioOptionContainerStyling()}
        className={"mx-auto pointer d-flex"}
        onClick={() => handleOnclickFunction()}
      >
        <div className={"d-flex p-2"}>
          {getIconBox()}
          <div>
            <div
              className={"m-auto"}
              style={{
                color: getOptionFontColor(),
                fontWeight: 600,
                fontSize: "16px",
              }}
            >
              {text}
            </div>
            <div
              style={{
                color: themeConstants.COLOR_PALETTE.DARK_GRAY,
                fontSize: "15px",
              }}
            >
              {description}
            </div>
          </div>
          <div className={"ml-auto"}>

          </div>
        </div>
      </div>
    </div>
  );
}

WizardSelectionRadioOption.propTypes = {
  className: PropTypes.string,
  option: PropTypes.string,
  text: PropTypes.any,
  description: PropTypes.any,
  onClickFunction: PropTypes.func,
  icon: PropTypes.object,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  selectedOption: PropTypes.string,
};

WizardSelectionRadioOption.defaultProps = {
  type: SUPPORTED_WIZARD_SELECTION_OPTION_TYPES.SECONDARY,
};

export default WizardSelectionRadioOption;