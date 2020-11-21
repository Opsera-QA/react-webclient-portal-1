import React, {useState} from "react";
import PropTypes from "prop-types";

function BooleanField({dataObject, fieldName}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  return (
    <div className="my-2 custom-text-field d-flex">
      <label><span className="text-muted mr-2">{field.label}:</span></label>
      <span>{dataObject.getData(fieldName) ? "True" : "False"}</span>
    </div>
  );
}

BooleanField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default BooleanField;