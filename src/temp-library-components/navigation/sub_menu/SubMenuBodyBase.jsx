import React from "react";
import PropTypes from "prop-types";

export default function SubMenuBodyBase(
  {
    children,
  }) {
  if (children == null) {
    return null;
  }

  return (
    <ul className={"d-flex"}>
      {children}
    </ul>
  );
}

SubMenuBodyBase.propTypes = {
  children: PropTypes.any,
};
