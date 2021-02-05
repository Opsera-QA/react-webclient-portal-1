import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";

function DescriptionField({dataObject, fieldName, characterLimit}) {
  const getParsedText = () => {
    let description = dataObject.getData(fieldName);

    if (description != null && description.length > characterLimit) {
      description = `${description.substring(0, characterLimit)}...`;
    }

    return description;
  };

  return (
    <FieldContainer className="mt-0">
      <span>{getParsedText()}</span>
    </FieldContainer>
  );
}

DescriptionField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  characterLimit: PropTypes.number
};

DescriptionField.defaultProps = {
  characterLimit: 150
};

export default DescriptionField;