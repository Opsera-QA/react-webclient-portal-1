import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldLabel from "components/common/fields/FieldLabel";

function TextFieldBase({ fieldName, dataObject }) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  return (<div><FieldLabel field={field} /><span>{dataObject.getData(field.id)}</span></div>);
}

TextFieldBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default TextFieldBase;