import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";

function StandaloneTextFieldBase({label, text, className}) {
  return (
    <FieldContainer className={className}>
      <label className="mb-0 mr-2 text-muted"><span>{label}:</span></label>
      <span>{text}</span>
    </FieldContainer>
  );
}

StandaloneTextFieldBase.propTypes = {
  text: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string
};

export default StandaloneTextFieldBase;