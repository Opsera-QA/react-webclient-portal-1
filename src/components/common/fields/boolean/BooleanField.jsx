import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";

function BooleanField({dataObject, fieldName, className}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  return (
    <FieldContainer className={className}>
      <FieldLabel field={field}/>
      <span>{dataObject.getData(fieldName) ? "True" : "False"}</span>
    </FieldContainer>
  );
}

BooleanField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default BooleanField;