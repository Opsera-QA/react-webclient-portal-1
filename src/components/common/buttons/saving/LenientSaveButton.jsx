import React from 'react';
import PropTypes from "prop-types";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";

function LenientSaveButton(
  {
    recordDto,
    size,
    updateRecord,
    disable,
    showSuccessToasts,
    customLabel,
    showTypeOnLabel,
    showIncompleteDataMessage,
    isIncomplete,
  }) {
  return (
    <SaveButtonBase
      lenient={true}
      size={size}
      disable={disable}
      recordDto={recordDto}
      updateRecord={updateRecord}
      showSuccessToasts={showSuccessToasts}
      customLabel={customLabel}
      showTypeOnLabel={showTypeOnLabel}
      showIncompleteDataMessage={showIncompleteDataMessage}
      isIncomplete={isIncomplete}
    />
  );
}

LenientSaveButton.propTypes = {
  recordDto: PropTypes.object,
  updateRecord: PropTypes.func,
  disable: PropTypes.bool,
  size: PropTypes.string,
  showSuccessToasts: PropTypes.bool,
  customLabel: PropTypes.string,
  showTypeOnLabel: PropTypes.bool,
  showIncompleteDataMessage: PropTypes.bool,
  isIncomplete: PropTypes.bool,
};

LenientSaveButton.defaultProps = {
  disable: false,
  size: "md",
  showSuccessToasts: true
};

export default LenientSaveButton;