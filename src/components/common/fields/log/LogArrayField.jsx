import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import StandaloneLogArrayField from "components/common/fields/log/StandaloneLogArrayField";

export default function LogArrayField(
  {
    model,
    fieldName,
    customTitle,
    height,
    maxHeight,
  }) {
  const field = model?.getFieldById(fieldName);
  const title = DataParsingHelper.parseString(customTitle, field?.label);

  if (field == null) {
    return null;
  }

  return (
    <StandaloneLogArrayField
      title={title}
      logs={model?.getData(fieldName)}
      height={height}
      maxHeight={maxHeight}
    />
  );
}

LogArrayField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  customTitle: PropTypes.string,
  height: PropTypes.string,
  maxHeight: PropTypes.string,
};