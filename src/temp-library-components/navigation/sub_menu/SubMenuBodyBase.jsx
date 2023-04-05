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
    <ui className={"d-flex"}>
      {children}
    </ui>
  );
}

SubMenuBodyBase.propTypes = {
  children: PropTypes.any,
};
