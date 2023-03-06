import React from "react";
import PropTypes from "prop-types";
import FieldLabelBase from "components/common/fields/FieldLabelBase";
import {hasStringValue} from "components/common/helpers/string-helpers";

function FieldLabel(
  {
    field,
    fieldName,
    customLabel,
    showLabel,
  }) {
  if (hasStringValue(customLabel) === true) {
    return (
      <FieldLabelBase
        label={customLabel}
        showLabel={showLabel}
      />
    );
  }

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
  customLabel: PropTypes.string,
  showLabel: PropTypes.bool
};

export default FieldLabel;