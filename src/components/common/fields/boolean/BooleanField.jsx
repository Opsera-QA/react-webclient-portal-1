import React, {useState} from "react";
import PropTypes from "prop-types";
import Label from "components/common/form_fields/Label";

function BooleanField({dataObject, fieldName}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  return (
    <div className="my-2 custom-text-field">
      <Label field={field}/>
      <span>{dataObject.getData(fieldName) ? "True" : "False"}</span>
    </div>
  );
}

BooleanField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default BooleanField;