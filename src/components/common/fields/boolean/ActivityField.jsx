import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldLabel from "components/common/fields/FieldLabel";
import FieldContainer from "components/common/fields/FieldContainer";

function ActivityField({dataObject, fieldName}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  return (
    <FieldContainer>
      <FieldLabel field={field}/>
      <span>{dataObject.getData(fieldName) ? "Active" : "Inactive"}</span>
    </FieldContainer>
  );
}

ActivityField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default ActivityField;