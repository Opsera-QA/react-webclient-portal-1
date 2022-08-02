import React from "react";
import PropTypes from "prop-types";
import OpseraHeaderIcon from "temp-library-components/icon/opsera/OpseraHeaderIcon";
import useComponentStateReference from "hooks/useComponentStateReference";

// TODO: Pick better name
// TODO: Allow to pass height, width
function WizardCard(
  {
    height,
    width,
    className,
    children,
  }) {
  const { themeConstants } = useComponentStateReference();

  return (
    <div className={className}>
      <div
        style={{
          backgroundColor: themeConstants.COLOR_PALETTE.WHITE,
          minHeight: height,
          height: height,
          maxHeight: height,
          width: width,
          borderRadius: "24px",
        }}
        className={"mt-2"}
      >
        <div
          className={"mx-auto"}
          style={{
            width: `calc(${width} - 75px)`,
            height: "5px",
            backgroundColor: themeConstants.COLOR_PALETTE.BLUE_HIGHLIGHT,
            borderRadius: "2px",
          }}
        />
        <div
          style={{
            overflowY: "auto",
            height: `calc(${height} - 5px)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

WizardCard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default WizardCard;
