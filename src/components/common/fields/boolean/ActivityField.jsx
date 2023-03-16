import React from "react";
import PropTypes from "prop-types";
import FieldLabel from "components/common/fields/FieldLabel";
import FieldContainer from "components/common/fields/FieldContainer";

export default function ActivityField({dataObject, fieldName, className}) {
  const field = dataObject?.getFieldById(fieldName);

  if (dataObject == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <FieldLabel
        customLabel={field == null ? "Active" : undefined}
        field={field}
      />
      <span>
        {dataObject?.getData(fieldName) ? "Active" : "Inactive"}
      </span>
    </FieldContainer>
  );
}

ActivityField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string
};

ActivityField.defaultProps = {
  fieldName: "active",
};
