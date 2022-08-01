import React from "react";
import PropTypes from "prop-types";
import OpseraHeaderIcon from "temp-library-components/icon/opsera/OpseraHeaderIcon";
import { fontThemeConstants } from "temp-library-components/theme/font.theme.constants";
import useComponentStateReference from "hooks/useComponentStateReference";

// TODO: Pick better name
function WizardCardInfoItem(
  {
    className,
    title,
    description
  }) {
  const { themeConstants } = useComponentStateReference();

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <h4 className={"mx-auto"}>{title}</h4>
      </div>
      <div
        style={{
          color: themeConstants.COLOR_PALETTE.TEXT_GRAY,
          fontSize: "16px",
          fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
          fontWeight: 400,
          textAlign: "center",
        }}
      >
        {description}
      </div>
    </div>
  );
}

WizardCardInfoItem.propTypes = {
  className: PropTypes.string,
  title: PropTypes.any,
  description: PropTypes.any,
};

export default WizardCardInfoItem;
