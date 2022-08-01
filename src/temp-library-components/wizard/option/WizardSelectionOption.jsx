import React from "react";
import PropTypes from "prop-types";
import { fontThemeConstants } from "temp-library-components/theme/font.theme.constants";
import useComponentStateReference from "hooks/useComponentStateReference";
import IconBase from "components/common/icons/IconBase";

// TODO: Pick better name, standardize
function WizardSelectionOption({ className, onClickFunction, text, icon, }) {
  const { themeConstants } = useComponentStateReference();

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
        onClick={onClickFunction}
      >
        <div className={"d-flex p-4"}>
          <div
            style={{
              borderRadius: "9px",
            }}
          >
            <IconBase icon={icon} className={"mr-2"} />
          </div>
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
  text: PropTypes.string,
  onClickFunction: PropTypes.func,
  icon: PropTypes.object,
};

export default WizardSelectionOption;
