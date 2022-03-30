import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldLabel from "components/common/fields/FieldLabel";
import FieldContainer from "components/common/fields/FieldContainer";

function ActivityField({dataObject, fieldName, className}) {
  const [field] = useState(dataObject?.getFieldById(fieldName));

  if (dataObject == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <FieldLabel field={field}/>
      <span>{dataObject?.getData(fieldName) ? "Active" : "Inactive"}</span>
    </FieldContainer>
  );
}

ActivityField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string
};

export default ActivityField;