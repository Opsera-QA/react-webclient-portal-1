import React from "react";
import PropTypes from "prop-types";
import { fontThemeConstants } from "temp-library-components/theme/font.theme.constants";
import useComponentStateReference from "hooks/useComponentStateReference";
import IconBase from "components/common/icons/IconBase";

// TODO: Pick better name, standardize
function WizardSelectionOption(
  {
    className,
    onClickFunction,
    text,
    icon,
    option,
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
          color: themeConstants.COLOR_PALETTE.BLACK,
          fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
          fontWeight: 400,
          fontSize: "18px",
        }}
        className={"mx-auto pointer d-flex"}
        onClick={() => onClickFunction(option)}
      >
        <div className={"d-flex p-2"}>
          {getIconBox()}
          <div className={"m-auto"}>
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
};

export default WizardSelectionOption;
