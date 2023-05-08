import React from "react";
import PropTypes from "prop-types";
import {faPencilAlt} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

export default function InlineInputEditIcon(
  {
    disabled,
    visible,
    handleEditFunction,
  }) {
  if (visible === false || disabled === true) {
    return null;
  }

  return (
    <IconBase
      icon={faPencilAlt}
      iconSize={"sm"}
      className={"ml-2 my-auto text-muted pointer"}
      onClickFunction={handleEditFunction}
    />
  );
}

InlineInputEditIcon.propTypes = {
  handleEditFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};
