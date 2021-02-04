import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";

function DescriptionField({dataObject, fieldName, characterLimit}) {
  const getParsedText = () => {
    let description = dataObject.getData(fieldName);

    return description;
  };

  return (
    <FieldContainer>
      <span>{getParsedText()}</span>
    </FieldContainer>
  );
}

DescriptionField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  characterLimit: PropTypes.number
};

export default DescriptionField;