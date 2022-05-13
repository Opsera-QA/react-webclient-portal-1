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
};

StrictSaveButton.defaultProps = {
  disable: false,
  showSuccessToasts: true
};

export default StrictSaveButton;