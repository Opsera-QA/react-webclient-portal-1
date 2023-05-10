import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {VanityFieldLabel} from "temp-library-components/label/VanityFieldLabel";

export default function VanityTextField(
  {
    model,
    fieldName,
    className,
    visible,
    showLabel,
  }) {
  const field = model?.getFieldById(fieldName);
  const value = DataParsingHelper.parseString(model?.getData(fieldName));

  if (field == null || visible === false) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <VanityFieldLabel field={field} showLabel={showLabel} />
      <div>{value}</div>
    </FieldContainer>
  );
}

VanityTextField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.bool,
  showLabel: PropTypes.bool,
};