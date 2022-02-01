import React  from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faTrash} from "@fortawesome/pro-light-svg-icons";

function ActionBarDeleteButtonBase(
  {
    handleDeleteFunction,
    type,
    isDeleting,
    className,
  }) {

  if (handleDeleteFunction == null) {
    return null;
  }

  return (
    <ActionBarButton
      action={handleDeleteFunction}
      icon={faTrash}
      iconClasses={"danger-red"}
      popoverText={`Delete this ${type}`}
      isBusy={isDeleting}
      className={className}
    />
  );
}

ActionBarDeleteButtonBase.propTypes = {
  handleDeleteFunction: PropTypes.func,
  isDeleting: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default ActionBarDeleteButtonBase;