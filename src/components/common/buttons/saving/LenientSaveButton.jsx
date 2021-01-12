import React from 'react';
import PropTypes from "prop-types";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";

function LenientSaveButton({recordDto, updateRecord, disable, showSuccessToasts}) {
  return (
    <SaveButtonBase lenient={true} disable={disable} recordDto={recordDto} updateRecord={updateRecord} showSuccessToasts={showSuccessToasts} />
  );
}

LenientSaveButton.propTypes = {
  recordDto: PropTypes.object,
  updateRecord: PropTypes.func,
  disable: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
};

LenientSaveButton.defaultProps = {
  disable: false,
  showSuccessToasts: true
}

export default LenientSaveButton;