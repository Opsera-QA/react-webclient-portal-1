import React, { useState } from "react";
import PropTypes from "prop-types";
import { faCode } from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StandaloneDiffField, { VISIBLE_CODE_OPTIONS } from "components/common/fields/file/diff/StandaloneDiffField";

function SideBySideDiffField(
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
  const [originalCodeField] = useState(model?.getFieldById(originalCodeFieldName));
  const [changedCodeField] = useState(model?.getFieldById(changedCodeFieldName));

  if (changedCodeField == null || originalCodeField == null) {
    return null;
  }

  return (
    <div className={className}>
      <Row>
        <Col xs={12} md={6} className={"pr-2"}>
          <StandaloneDiffField
            isLoading={isLoading}
            minimumHeight={minimumHeight}
            maximumHeight={maximumHeight}
            titleText={originalCodeField?.label}
            titleIcon={faCode}
            loadDataFunction={loadDataFunction}
            changedCode={model?.getData(changedCodeFieldName)}
            originalCode={model?.getData(originalCodeFieldName)}
            language={language}
            visibleCodeOption={VISIBLE_CODE_OPTIONS.ORIGINAL}
          />
        </Col>
        <Col xs={12} md={6} className={"pl-2"}>
          <StandaloneDiffField
            isLoading={isLoading}
            minimumHeight={minimumHeight}
            maximumHeight={maximumHeight}
            titleText={changedCodeField?.label}
            titleIcon={faCode}
            loadDataFunction={loadDataFunction}
            changedCode={model?.getData(changedCodeFieldName)}
            originalCode={model?.getData(originalCodeFieldName)}
            language={language}
          />
        </Col>
      </Row>
    </div>
  );
}

SideBySideDiffField.propTypes = {
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

export default SideBySideDiffField;