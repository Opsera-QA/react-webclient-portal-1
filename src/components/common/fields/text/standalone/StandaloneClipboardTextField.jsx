import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import CopyToClipboardIcon from "components/common/icons/CopyToClipboardIcon";

function StandaloneClipboardTextField({text, label, className}) {
  return (
    <FieldContainer className={className}>
      <div className="w-100 d-flex">
        <label className="mb-0 mr-2 text-muted"><span>{label}:</span></label>
        <span>{text}</span>
        <CopyToClipboardIcon className={" my-auto ml-auto"} copyString={text} />
      </div>
    </FieldContainer>
  );
}

StandaloneClipboardTextField.propTypes = {
  text: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string
};

export default StandaloneClipboardTextField;