import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";

function LeaderField({dataObject, fieldName, className}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getFormattedValue = () => {
    const value = dataObject.getData(fieldName);

    if (value != null) {
      return `${value.name} (${value.email})`;
    }
  };

  return (
    <FieldContainer className={className}>
      <FieldLabel field={field}/>
      <span>{getFormattedValue()}</span>
    </FieldContainer>
  );
}

LeaderField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string
};

LeaderField.defaultProps = {
  fieldName: "leader"
};

export default LeaderField;