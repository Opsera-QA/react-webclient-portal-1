import React from "react";
import PropTypes from "prop-types";

export function VanityLabelBase(
  {
    label,
    visible,
  }) {
  if (visible === false) {
    return null;
  }

  return (
    <div className={"font-inter-light-300 light-gray-text-secondary vanity-label"}>
      {label}
    </div>
  );
}

VanityLabelBase.propTypes = {
  label: PropTypes.any,
  visible: PropTypes.bool,
};