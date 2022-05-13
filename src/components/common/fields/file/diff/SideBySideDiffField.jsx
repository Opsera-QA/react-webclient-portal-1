import React, { useState } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StandaloneDiffField from "components/common/fields/file/diff/StandaloneDiffField";
import InfoContainer from "components/common/containers/InfoContainer";
import { faCode } from "@fortawesome/pro-light-svg-icons";
import { commitDiffConstants } from "components/common/fields/file/diff/commitDiff.constants";

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
    leftSideTitleIcon,
    rightSideTitleIcon,
  }) {
  const [originalCodeField] = useState(model?.getFieldById(originalCodeFieldName));
  const [changedCodeField] = useState(model?.getFieldById(changedCodeFieldName));

  if (changedCodeField == null || originalCodeField == null) {
    return null;
  }

  return (
    <div className={className}>
      <InfoContainer
        titleText={`Diff Viewer`}
        titleIcon={faCode}
        minimumHeight={minimumHeight}
        maximumHeight={maximumHeight}
        loadDataFunction={loadDataFunction}
      >
        <div style={{overflowX: "hidden"}} className={"m-2"}>
          <Row>
            <Col xs={12} md={6} className={"pr-1"}>
              <StandaloneDiffField
                isLoading={isLoading}
                titleText={originalCodeField?.label}
                titleIcon={leftSideTitleIcon}
                changedCode={model?.getData(changedCodeFieldName)}
                originalCode={model?.getData(originalCodeFieldName)}
                language={language}
                visibleCodeOption={commitDiffConstants.VISIBLE_BRANCH_CODE_OPTIONS.DESTINATION}
                className={"m-0"}
              />
            </Col>
            <Col xs={12} md={6} className={"pl-1"}>
              <StandaloneDiffField
                isLoading={isLoading}
                titleText={changedCodeField?.label}
                titleIcon={rightSideTitleIcon}
                changedCode={model?.getData(changedCodeFieldName)}
                originalCode={model?.getData(originalCodeFieldName)}
                visibleCodeOption={commitDiffConstants.VISIBLE_BRANCH_CODE_OPTIONS.SOURCE}
                language={language}
                className={"m-0"}
              />
            </Col>
          </Row>
        </div>
      </InfoContainer>
    </div>
  );
}

SideBySideDiffField.propTypes = {
  model: PropTypes.object,
  originalCodeFieldName: PropTypes.string,
  changedCodeFieldName: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  maximumHeight: PropTypes.string,
  minimumHeight: PropTypes.string,
  loadDataFunction: PropTypes.func,
  language: PropTypes.string,
  leftSideTitleIcon: PropTypes.object,
  rightSideTitleIcon: PropTypes.object,
};

SideBySideDiffField.defaultProps = {
  leftSideTitleIcon: faCode,
  rightSideTitleIcon: faCode,
};

export default SideBySideDiffField;