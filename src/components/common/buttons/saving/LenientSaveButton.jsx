import React from 'react';
import PropTypes from "prop-types";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";

function LenientSaveButton({recordDto, size, updateRecord, disable, showSuccessToasts, customLabel, showTypeOnLabel}) {
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
  showTypeOnLabel: PropTypes.bool
};

LenientSaveButton.defaultProps = {
  disable: false,
  size: "md",
  showSuccessToasts: true
};

export default LenientSaveButton;