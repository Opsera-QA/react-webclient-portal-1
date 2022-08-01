import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";

function DividerWithCenteredText(
  {
    className,
    text,
  }) {
  const { themeConstants } = useComponentStateReference();

  return (
    <div className={className}>
      <div>
        <div />
        <div
          className={"mx-2"}
          style={{
            color: themeConstants.COLOR_PALETTE.BLACK,
          }}
        >
          {text}
        </div>
        <div />
      </div>
    </div>
  );
}

DividerWithCenteredText.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  dividerColor: PropTypes.string,
};