import React from "react";
import PropTypes from "prop-types";
import {faSave} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

export default function InlineInputSaveIcon(
  {
    isSaving,
    disabled,
    visible,
    handleSaveFunction,
  }) {
  if (visible === false) {
    return null;
  }

  return (
    <IconBase
      icon={faSave}
      className={"ml-2 my-auto text-muted pointer"}
      iconSize={"sm"}
      isLoading={isSaving}
      disabled={disabled}
      onClickFunction={handleSaveFunction}
    />
  );
}

InlineInputSaveIcon.propTypes = {
  handleSaveFunction: PropTypes.func,
  disabled: PropTypes.bool,
  isSaving: PropTypes.bool,
  visible: PropTypes.bool,
};
