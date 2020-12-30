import React, { useState } from "react";
import PropTypes from "prop-types";
import Label from "components/common/form_fields/Label";

function TextFieldBase({dataObject, fieldName}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  return (
    <div className="my-2 custom-text-field">
      <Label field={field}/>
      <span>{dataObject.getData(fieldName)}</span>
    </div>
  );
}

TextFieldBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default TextFieldBase;