import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";

function ObjectPropertyDisplayerField(
  {
    model,
    fieldName,
    className,
  }) {
  const [field] = useState(model?.getFieldById(fieldName));

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <FieldLabel field={field}/>

    </FieldContainer>
  );
}

ObjectPropertyDisplayerField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string
};

export default ObjectPropertyDisplayerField;