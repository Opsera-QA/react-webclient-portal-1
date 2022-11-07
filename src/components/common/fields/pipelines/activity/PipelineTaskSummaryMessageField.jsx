import React from "react";
import PropTypes from "prop-types";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import FieldContainer from "components/common/fields/FieldContainer";

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
    <FieldContainer className={className}>
      <H5FieldSubHeader subheaderText={label} />
      <div className={"p-3 text-muted italic pipeline-task-message"}>
        {getMessage()}
      </div>
    </FieldContainer>
  );
}

PipelineTaskSummaryMessageField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
};
