import PropTypes from "prop-types";
import React from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import VanityDateField from "temp-library-components/fields/date/VanityDateField";
import VanityDateTimeField from "temp-library-components/fields/date/VanityDateTimeField";

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
      <VanityDateTimeField
        model={pipelineModel}
        fieldName={"workflow.last_run.completed"}
        className={className}
      />
    );
  }

  return (
    <VanityDateField
      model={pipelineModel}
      fieldName={"createdAt"}
      className={className}
    />
  );
}

PipelineLastRunDateField.propTypes = {
  pipelineModel: PropTypes.object,
  className: PropTypes.string,
};
