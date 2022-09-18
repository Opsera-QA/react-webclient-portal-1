import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";

export function DividerWithCenteredText(
  {
    className,
    text,
  }) {
  const { themeConstants } = useComponentStateReference();

  return (
    <div className={className}>
      <div className={"d-flex mx-auto"}>
        <div
          className={"my-auto w-100"}
          style={{
            border: `1px solid ${themeConstants.COLOR_PALETTE.BLACK}`,
          }}
        />
        <div
          className={"mx-2"}
          style={{
            color: themeConstants.COLOR_PALETTE.BLACK,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </div>
        <div
          className={"my-auto w-100"}
          style={{
            border: `1px solid ${themeConstants.COLOR_PALETTE.BLACK}`,
          }}
        />
      </div>
    </div>
  );
}

DividerWithCenteredText.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  dividerColor: PropTypes.string,
};