import React from "react";
import PropTypes from "prop-types";
import FieldLabelBase from "components/common/fields/FieldLabelBase";

function FieldLabel({ field, fieldName, showLabel }) {
  if (field == null) {
    console.error(`No Metadata For This Field [${fieldName}]`);
    return (
      <FieldLabelBase
        label={fieldName}
        showLabel={showLabel}
      />
    );
  }

  return (
    <FieldLabelBase
      label={field?.label}
      showLabel={showLabel}
    />
  );
}

FieldLabel.propTypes = {
  field: PropTypes.object,
  fieldName: PropTypes.string,
  showLabel: PropTypes.bool
};

export default FieldLabel;