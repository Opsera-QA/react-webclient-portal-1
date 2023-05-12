import React from "react";
import PropTypes from "prop-types";
import {faTimes} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

export default function InlineInputCancelIcon(
  {
    isSaving,
    disabled,
    visible,
    handleCancelFunction,
  }) {
  if (visible === false) {
    return null;
  }

  return (
    <IconBase
      icon={faTimes}
      className={"text-muted my-auto ml-3 pointer"}
      iconSize={"sm"}
      isLoading={isSaving}
      disabled={disabled}
      onClickFunction={handleCancelFunction}
    />
  );
}

InlineInputCancelIcon.propTypes = {
  handleCancelFunction: PropTypes.func,
  disabled: PropTypes.bool,
  isSaving: PropTypes.bool,
  visible: PropTypes.bool,
};
