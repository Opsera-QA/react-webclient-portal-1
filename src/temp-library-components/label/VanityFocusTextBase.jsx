import React from "react";
import PropTypes from "prop-types";

export function VanityFocusTextBase(
  {
    text,
    visible,
  }) {
  if (visible === false) {
    return null;
  }

  return (
    <div className={"font-inter-light-400 vanity-focus-text dark-gray-text-primary"}>
      {text}
    </div>
  );
}

VanityFocusTextBase.propTypes = {
  text: PropTypes.any,
  visible: PropTypes.bool,
};