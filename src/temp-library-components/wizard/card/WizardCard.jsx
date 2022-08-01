import React from "react";
import PropTypes from "prop-types";
import OpseraHeaderIcon from "temp-library-components/icon/opsera/OpseraHeaderIcon";
import useComponentStateReference from "hooks/useComponentStateReference";

// TODO: Pick better name
// TODO: Allow to pass height, width
function WizardCard({ className, children }) {
  const { themeConstants } = useComponentStateReference();

  return (
    <div className={className}>
      <div
        style={{
          backgroundColor: themeConstants.COLOR_PALETTE.WHITE,
          minHeight: "575px",
          height: "575px",
          maxHeight: "575px",
          width: "525px",
          borderRadius: "24px",
        }}
        className={"mt-2"}
      >
        <div
          className={"mx-auto"}
          style={{
            width: "450px",
            height: "5px",
            backgroundColor: themeConstants.COLOR_PALETTE.BLUE_HIGHLIGHT,
            borderRadius: "2px",
          }}
        />
        {children}
      </div>
    </div>
  );
}

WizardCard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default WizardCard;
