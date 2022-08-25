import React from "react";
import PropTypes from "prop-types";
import { fontThemeConstants } from "temp-library-components/theme/font.theme.constants";
import useComponentStateReference from "hooks/useComponentStateReference";
import IconBase from "components/common/icons/IconBase";
import { mouseHelper } from "temp-library-components/helpers/mouse/mouse.helper";

export default function WizardSelectionOption(
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

  if (onClickFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      <div
        style={{
          backgroundColor: themeConstants.COLOR_PALETTE.BACKGROUND_LAVENDER,
          borderRadius: ".5em",
          fontFamily: fontThemeConstants.FONT_FAMILIES.MAIN_SITE_FONT_FAMILIES,
          fontWeight: 400,
          fontSize: "18px",
          opacity: disabled === true ? ".5" : undefined,
          cursor: mouseHelper.getMouseCursor(onClickFunction, disabled),
        }}
        className={"mx-auto d-flex wizard-selection-option"}
        onClick={() => onClickFunction(option)}
      >
        <div className={"d-flex p-2"}>
          {getIconBox()}
          <div
            className={"m-auto wizard-font"}
            style={{
              color: themeConstants.COLOR_PALETTE.BLACK,
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
