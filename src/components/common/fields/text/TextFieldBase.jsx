import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";

function TextFieldBase({dataObject, fieldName}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  return (
    <FieldContainer>
      <FieldLabel field={field}/>
      <span>{dataObject.getData(fieldName)}</span>
    </FieldContainer>
  );
}

TextFieldBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default TextFieldBase;