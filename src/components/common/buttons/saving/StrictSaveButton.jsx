import React from 'react';
import PropTypes from "prop-types";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";

function StrictSaveButton({recordDto, updateRecord, disable, showSuccessToasts, saveButtonText }) {
  return (
    <SaveButtonBase
      lenient={false}
      disable={disable}
      recordDto={recordDto}
      updateRecord={updateRecord}
      showSuccessToasts={showSuccessToasts}
      saveButtonText={saveButtonText}
    />
  );
}

StrictSaveButton.propTypes = {
  recordDto: PropTypes.object,
  updateRecord: PropTypes.func,
  disable: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  saveButtonText: PropTypes.string
};

StrictSaveButton.defaultProps = {
  disable: false,
  showSuccessToasts: true
}

export default StrictSaveButton;