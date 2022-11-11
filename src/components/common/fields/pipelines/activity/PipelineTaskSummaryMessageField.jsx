import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import MessageFieldBase from "components/common/fields/text/MessageFieldBase";

export default function PipelineTaskSummaryMessageField(
  {
    fieldName,
    model,
    className,
  }) {
  const label = DataParsingHelper.parseString(model?.getLabel(fieldName, "Message"), "Message");

  const getMessage = () => {
    return DataParsingHelper.parseString(model?.getData(fieldName), "");
  };

  if (model == null) {
    return null;
  }

  return (
    <MessageFieldBase
      className={className}
      label={label}
      message={getMessage()}
    />
  );
}

PipelineTaskSummaryMessageField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
};
