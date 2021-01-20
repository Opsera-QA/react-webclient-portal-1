import React  from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faUsersCog} from "@fortawesome/pro-light-svg-icons";

function ActionBarEditAccessRolesButton({handleEditAccessRolesClick, itemName}) {
  const duplicateConfiguration = () => {
    handleEditAccessRolesClick();
  }

  return (
    <ActionBarButton action={duplicateConfiguration} icon={faUsersCog} popoverText={`Edit this ${itemName}'s role access configuration`} />
  );
}

ActionBarEditAccessRolesButton.propTypes = {
  handleEditAccessRolesClick: PropTypes.func,
  itemName: PropTypes.string,
};

export default ActionBarEditAccessRolesButton;