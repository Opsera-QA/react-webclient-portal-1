import React from "react";
import PropTypes from "prop-types";
import { fontThemeConstants } from "temp-library-components/theme/font.theme.constants";
import useComponentStateReference from "hooks/useComponentStateReference";
import IconBase from "components/common/icons/IconBase";
import { mouseHelper } from "temp-library-components/helpers/mouse/mouse.helper";

export const SUPPORTED_WIZARD_SELECTION_OPTION_TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

// TODO: Pick better name, standardize
function WizardSelectionOption(
  {
    className,
    onClickFunction,
    text,
    icon,
    option,
    type,
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

  if (onClickFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      <div
        style={{
          backgroundColor: getBackgroundColor(),
          borderRadius: ".5em",
          fontFamily: fontThemeConstants.FONT_FAMILIES.MAIN_SITE_FONT_FAMILIES,
          fontWeight: 400,
          fontSize: "18px",
          opacity: disabled === true ? ".5" : undefined,
          cursor: mouseHelper.getMouseCursor(onClickFunction, disabled),
        }}
        className={"mx-auto d-flex"}
        onClick={() => onClickFunction(option)}
      >
        <div className={"d-flex p-2"}>
          {getIconBox()}
          <div
            className={"m-auto"}
            style={{
              color: getFontColor(),
            }}
          >
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}

WizardSelectionOption.propTypes = {
  className: PropTypes.string,
  option: PropTypes.string,
  text: PropTypes.string,
  onClickFunction: PropTypes.func,
  icon: PropTypes.object,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

WizardSelectionOption.defaultProps = {
  type: SUPPORTED_WIZARD_SELECTION_OPTION_TYPES.SECONDARY,
};

export default WizardSelectionOption;
