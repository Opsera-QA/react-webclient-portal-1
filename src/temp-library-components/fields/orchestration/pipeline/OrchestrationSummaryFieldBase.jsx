import PropTypes from "prop-types";
import React from "react";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";
import FieldLabelBase from "components/common/fields/FieldLabelBase";
import FieldContainer from "components/common/fields/FieldContainer";

export default function OrchestrationSummaryFieldBase(
  {
    completed,
    status,
    className,
    labelText,
    type,
  }) {
  return (
    <FieldContainer className={className}>
      <FieldLabelBase label={labelText} />
      <span>
        {`The last complete run of this ${type} finished on ${DateFormatHelper.formatDateAsTimestampWithoutSeconds(new Date(completed))} 
         with a status of ${status}.`}
      </span>
    </FieldContainer>
  );
}

OrchestrationSummaryFieldBase.propTypes = {
  completed: PropTypes.any,
  status: PropTypes.string,
  className: PropTypes.string,
  labelText: PropTypes.string,
  type: PropTypes.string,
};

OrchestrationSummaryFieldBase.defaultProps = {
  labelText: "Summary",
};
