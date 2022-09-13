import React from "react";
import PropTypes from "prop-types";
import OpseraHeaderIcon from "temp-library-components/icon/opsera/OpseraHeaderIcon";
import useComponentStateReference from "hooks/useComponentStateReference";

// TODO: Pick better name
export default function WizardCard(
  {
    height,
    width,
    className,
    children,
    bodyClassName,
  }) {
  const { themeConstants } = useComponentStateReference();

  return (
    <div className={className}>
      <div
        style={{
          backgroundColor: themeConstants.COLOR_PALETTE.WHITE,
          minHeight: height,
          width: width,
          borderRadius: "24px",
        }}
        className={"mt-2"}
      >
        <div
          className={"mx-5"}
          style={{
            height: "5px",
            backgroundColor: themeConstants.COLOR_PALETTE.GOLD_HIGHLIGHT,
            borderRadius: "2px",
          }}
        />
        <div
          style={{
            overflowY: "auto",
            minHeight: height ? `calc(${height} - 5px)` : undefined,
          }}
          className={bodyClassName}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

WizardCard.propTypes = {
  className: PropTypes.string,
  bodyClassName: PropTypes.string,
  children: PropTypes.any,
  height: PropTypes.string,
  width: PropTypes.string,
};