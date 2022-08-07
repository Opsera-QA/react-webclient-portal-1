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

  const getFontColor = () => {
    switch (type) {
      case SUPPORTED_WIZARD_SELECTION_OPTION_TYPES.PRIMARY:
        return themeConstants.COLOR_PALETTE.WHITE;
      case SUPPORTED_WIZARD_SELECTION_OPTION_TYPES.SECONDARY:
        return themeConstants.COLOR_PALETTE.BLACK;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case SUPPORTED_WIZARD_SELECTION_OPTION_TYPES.PRIMARY:
        return themeConstants.COLOR_PALETTE.DEEP_PURPLE;
      case SUPPORTED_WIZARD_SELECTION_OPTION_TYPES.SECONDARY:
        return themeConstants.COLOR_PALETTE.BACKGROUND_LAVENDER;
    }
  };

  if (onClickFunction == null && disabled !== true) {
    return null;
  }

  return (
    <div className={className}>
      <div
        style={{
          backgroundColor: getBackgroundColor(),
          borderRadius: ".5em",
          fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
          borderRight: selectedOption === option ? `2px solid ${themeConstants.COLOR_PALETTE.GOLD}` : `2px solid ${getBackgroundColor()}`,
          borderTop: selectedOption === option ? `2px solid ${themeConstants.COLOR_PALETTE.GOLD}` : `2px solid ${getBackgroundColor()}`,
          borderBottom: selectedOption === option ? `2px solid ${themeConstants.COLOR_PALETTE.GOLD}` :`2px solid ${getBackgroundColor()}`,
          borderLeft: selectedOption === option ? `6px solid ${themeConstants.COLOR_PALETTE.GOLD}` : `6px solid ${getBackgroundColor()}`,
          fontWeight: 400,
          fontSize: "18px",
        }}
        className={"mx-auto pointer d-flex"}
        onClick={() => onClickFunction(option)}
      >
        <div className={"d-flex p-2"}>
          {getIconBox()}
          <div>

            <div
              className={"m-auto"}
              style={{
                color: themeConstants.COLOR_PALETTE.DEEP_PURPLE,
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
  text: PropTypes.string,
  description: PropTypes.string,
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