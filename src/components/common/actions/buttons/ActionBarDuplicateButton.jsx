import React  from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faCopy} from "@fortawesome/pro-light-svg-icons";

function ActionBarDuplicateButton({duplicateFunction, itemName, className, isDuplicating}) {
  if (duplicateFunction == null) {
    return null;
  }

  return (
    <ActionBarButton
      action={duplicateFunction}
      icon={faCopy}
      isBusy={isDuplicating}
      popoverText={`Duplicate this ${itemName} configuration`}
      className={className}
    />
  );
}

ActionBarDuplicateButton.propTypes = {
  duplicateFunction: PropTypes.func,
  itemName: PropTypes.string,
  className: PropTypes.string,
  isDuplicating: PropTypes.bool,
};

export default ActionBarDuplicateButton;