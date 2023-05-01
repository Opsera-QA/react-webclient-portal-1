import PropTypes from "prop-types";
import React from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import DateTimeField from "components/common/fields/date/DateTimeField";
import DateFieldBase from "components/common/fields/date/DateFieldBase";

export default function PipelineLastRunDateField(
  {
    pipelineModel,
    className,
  }) {
  const lastRunDate = DataParsingHelper.parseDate(pipelineModel?.getLastRunCompletionTime());

  if (pipelineModel == null) {
    return null;
  }

  if (lastRunDate) {
    return (
      <DateTimeField
        dataObject={pipelineModel}
        fieldName={"workflow.completed"}
        className={className}
      />
    );
  }

  return (
    <DateFieldBase
      dataObject={pipelineModel}
      fieldName={"createdAt"}
      className={className}
    />
  );
}

PipelineLastRunDateField.propTypes = {
  pipelineModel: PropTypes.object,
  className: PropTypes.string,
};
