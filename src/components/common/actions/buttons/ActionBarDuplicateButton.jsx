import React  from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faCopy} from "@fortawesome/pro-light-svg-icons";

function ActionBarDuplicateButton({handleDuplicateClick, itemName, itemId}) {

  const duplicateConfiguration = () => {
    handleDuplicateClick(itemId);
  }

  return (
    <ActionBarButton action={duplicateConfiguration} icon={faCopy} popoverText={`Duplicate this ${itemName} configuration`} />
  );
}

ActionBarDuplicateButton.propTypes = {
  handleDuplicateClick: PropTypes.func,
  itemName: PropTypes.string,
  itemId: PropTypes.string
};

export default ActionBarDuplicateButton;