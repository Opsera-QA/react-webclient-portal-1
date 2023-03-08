import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";

export function Divider(
  {
    className,
  }) {
  const { themeConstants } = useComponentStateReference();

  return (
    <div className={className}>
      <div className={"d-flex mx-auto"}>
        <div
          className={"my-auto w-100"}
          style={{
            borderBottom: `1px solid ${themeConstants.BORDER_COLORS.GRAY}`,
          }}
        />
      </div>
    </div>
  );
}

Divider.propTypes = {
  className: PropTypes.string,
};