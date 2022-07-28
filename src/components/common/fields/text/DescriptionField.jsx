import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import {cutOffExcessCharacters} from "components/common/helpers/string-helpers";

function DescriptionField({dataObject, fieldName, className, characterLimit}) {
  return (
    <FieldContainer className={className}>
      <span>{cutOffExcessCharacters(dataObject?.getData(fieldName), characterLimit)}</span>
    </FieldContainer>
  );
}

DescriptionField.propTypes = {
  fieldName: PropTypes.string,
  className: PropTypes.string,
  dataObject: PropTypes.object,
  characterLimit: PropTypes.number
};

DescriptionField.defaultProps = {
  characterLimit: 150,
  fieldName: "description",
};

export default DescriptionField;