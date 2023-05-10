import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {VanityLabelBase} from "temp-library-components/label/VanityLabelBase";

export function VanityFieldLabel(
  {
    field,
    showLabel,
  }) {
  const parsedField = DataParsingHelper.parseObject(field);

  if (parsedField == null) {
    return null;
  }

  return (
    <VanityLabelBase
      visible={showLabel !== false}
      label={field?.label}
    />
  );
}

VanityFieldLabel.propTypes = {
  field: PropTypes.any,
  showLabel: PropTypes.bool,
};