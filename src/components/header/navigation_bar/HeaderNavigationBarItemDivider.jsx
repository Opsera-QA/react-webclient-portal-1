import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function HeaderNavigationBarItemDivider({ className }) {
  const { themeConstants } = useComponentStateReference();

  return (
    <div className={className}>
      <div
        style={{
          color: themeConstants.COLOR_PALETTE.WHITE,
        }}
      >
        |
      </div>
    </div>
  );
}

HeaderNavigationBarItemDivider.propTypes = {
  className: PropTypes.string,
};