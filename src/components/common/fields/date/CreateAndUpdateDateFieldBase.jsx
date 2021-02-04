import React, {useState} from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import FieldLabel from "components/common/fields/FieldLabel";

function CreateAndUpdateDateFieldBase({createdAtFieldName, updatedAtFieldName, dataObject, dateFormat, className}) {
  const [createdAtField] = useState(dataObject.getFieldById(createdAtFieldName));
  const [updatedAtField] = useState(dataObject.getFieldById(updatedAtFieldName));

  const getDate = (field) => {
    const date = dataObject.getData(field.id);
    return date != null && dateFormat != null ? format(new Date(date), dateFormat) : null;
  };

  return (
    <div className={className}>
      <div><FieldLabel field={createdAtField} fieldName={createdAtFieldName} /><span>{getDate(createdAtField)}</span></div>
      <div><FieldLabel field={updatedAtField} fieldName={updatedAtFieldName} /><span>{getDate(updatedAtField)}</span></div>
    </div>
  );
}

CreateAndUpdateDateFieldBase.propTypes = {
  createdAtFieldName: PropTypes.string,
  updatedAtFieldName: PropTypes.string,
  dataObject: PropTypes.object,
  dateFormat: PropTypes.string,
  className: PropTypes.string
};

CreateAndUpdateDateFieldBase.defaultProps = {
  dateFormat: "yyyy-MM-dd"
}

export default CreateAndUpdateDateFieldBase;