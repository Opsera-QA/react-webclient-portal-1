import React from 'react';
import PropTypes from "prop-types";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";

function StrictSaveButton(
  {
    recordDto,
    setModel,
    updateRecord,
    disable,
    showSuccessToasts,
    customLabel,
    showTypeOnLabel,
    isIncomplete,
    clearChangeMapAfterSave,
    customSuccessMessage,
  }) {
  return (
    <SaveButtonBase
      lenient={false}
      disable={disable}
      recordDto={recordDto}
      setModel={setModel}
      updateRecord={updateRecord}
      showSuccessToasts={showSuccessToasts}
      customLabel={customLabel}
      showTypeOnLabel={showTypeOnLabel}
      isIncomplete={isIncomplete}
      clearChangeMapAfterSave={clearChangeMapAfterSave}
      customSuccessMessage={customSuccessMessage}
    />
  );
}

StrictSaveButton.propTypes = {
  recordDto: PropTypes.object,
  updateRecord: PropTypes.func,
  disable: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  customLabel: PropTypes.string,
  showTypeOnLabel: PropTypes.bool,
  setModel: PropTypes.func,
  isIncomplete: PropTypes.bool,
  clearChangeMapAfterSave: PropTypes.bool,
  customSuccessMessage: PropTypes.string,
};

StrictSaveButton.defaultProps = {
  disable: false,
  showSuccessToasts: true
};

export default StrictSaveButton;