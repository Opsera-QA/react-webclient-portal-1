import React from 'react';
import PropTypes from "prop-types";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";

function StrictSaveButton({recordDto, updateRecord, disable, showSuccessToasts, customLabel, showTypeOnLabel }) {
  return (
    <SaveButtonBase
      lenient={false}
      disable={disable}
      recordDto={recordDto}
      updateRecord={updateRecord}
      showSuccessToasts={showSuccessToasts}
      customLabel={customLabel}
      showTypeOnLabel={showTypeOnLabel}
    />
  );
}

StrictSaveButton.propTypes = {
  recordDto: PropTypes.object,
  updateRecord: PropTypes.func,
  disable: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  customLabel: PropTypes.string,
  showTypeOnLabel: PropTypes.bool
};

StrictSaveButton.defaultProps = {
  disable: false,
  showSuccessToasts: true
};

export default StrictSaveButton;