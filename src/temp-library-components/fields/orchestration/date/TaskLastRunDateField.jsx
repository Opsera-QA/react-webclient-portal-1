import PropTypes from "prop-types";
import React from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import DateTimeField from "components/common/fields/date/DateTimeField";
import DateFieldBase from "components/common/fields/date/DateFieldBase";

export default function TaskLastRunDateField(
  {
    taskModel,
    className,
  }) {
  const lastRunDate = DataParsingHelper.parseDate(taskModel?.getLastRunCompletionTime());

  if (taskModel == null) {
    return null;
  }

  if (lastRunDate) {
    return (
      <DateTimeField
        dataObject={taskModel}
        fieldName={"completion"}
        className={className}
      />
    );
  }

  return (
    <DateFieldBase
      dataObject={taskModel}
      fieldName={"createdAt"}
      className={className}
    />
  );
}

TaskLastRunDateField.propTypes = {
  taskModel: PropTypes.object,
  className: PropTypes.string,
};
