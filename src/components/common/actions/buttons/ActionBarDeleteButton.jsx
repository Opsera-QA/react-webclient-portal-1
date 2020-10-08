import React  from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faTrash} from "@fortawesome/pro-light-svg-icons";

function ActionBarDeleteButton({handleDeleteClick, itemName}) {

  return (
    <ActionBarButton action={handleDeleteClick} icon={faTrash} iconClasses={"danger-red"} popoverText={`Delete this ${itemName}`} />
  );
}

ActionBarDeleteButton.propTypes = {
  handleDeleteClick: PropTypes.func,
  itemName: PropTypes.string
};

export default ActionBarDeleteButton;