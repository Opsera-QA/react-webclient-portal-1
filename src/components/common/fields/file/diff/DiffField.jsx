import React, { useState } from "react";
import PropTypes from "prop-types";
import StandaloneDiffField from "components/common/fields/file/diff/StandaloneDiffField";
import { faCode } from "@fortawesome/pro-light-svg-icons";

function DiffField(
  {
    model,
    isLoading,
    maximumHeight,
    minimumHeight,
    originalCodeFieldName,
    changedCodeFieldName,
    className,
    loadDataFunction,
    language,
  }) {
  const [field] = useState(model?.getFieldById(changedCodeFieldName));

  if (field == null) {
    return null;
  }

  return (
    <StandaloneDiffField
      isLoading={isLoading}
      minimumHeight={minimumHeight}
      maximumHeight={maximumHeight}
      titleText={field?.label}
      titleIcon={faCode}
      loadDataFunction={loadDataFunction}
      className={className}
      changedCode={model?.getData(changedCodeFieldName)}
      originalCode={model?.getData(originalCodeFieldName)}
      language={language}
    />
  );
}

DiffField.propTypes = {
  model: PropTypes.string,
  originalCodeFieldName: PropTypes.string,
  changedCodeFieldName: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  maximumHeight: PropTypes.string,
  minimumHeight: PropTypes.string,
  loadDataFunction: PropTypes.func,
  language: PropTypes.string,
};

export default DiffField;