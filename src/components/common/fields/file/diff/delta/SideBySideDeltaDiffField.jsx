import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InfoContainer from "components/common/containers/InfoContainer";
import { faCode } from "@fortawesome/pro-light-svg-icons";
import StandaloneDeltaDiffField, {
  VISIBLE_BRANCH_CODE_OPTIONS,
} from "components/common/fields/file/diff/delta/StandaloneDeltaDiffField";

function SideBySideDeltaDiffField(
  {
    isLoading,
    maximumHeight,
    minimumHeight,
    sourceCode,
    destinationCode,
    delta,
    className,
    loadDataFunction,
    language,
    leftSideTitleIcon,
    rightSideTitleIcon,
  }) {
  if (delta == null) {
    return null;
  }

  return (
    <div className={className}>
      <InfoContainer
        titleText={`Delta Diff Viewer`}
        titleIcon={faCode}
        minimumHeight={minimumHeight}
        maximumHeight={maximumHeight}
        loadDataFunction={loadDataFunction}
      >
        <div style={{overflowX: "hidden"}} className={"m-2"}>
          <Row>
            <Col xs={12} md={6} className={"pr-1"}>
              <StandaloneDeltaDiffField
                isLoading={isLoading}
                titleText={"Existing Code on Destination Branch"}
                titleIcon={leftSideTitleIcon}
                delta={delta}
                language={language}
                visibleCodeOption={VISIBLE_BRANCH_CODE_OPTIONS.DESTINATION}
                sourceCode={sourceCode}
                destinationCode={destinationCode}
                className={"m-0"}
              />
            </Col>
            <Col xs={12} md={6} className={"pl-1"}>
              <StandaloneDeltaDiffField
                isLoading={isLoading}
                titleText={"Incoming Changes"}
                titleIcon={rightSideTitleIcon}
                delta={delta}
                visibleCodeOption={VISIBLE_BRANCH_CODE_OPTIONS.SOURCE}
                language={language}
                sourceCode={sourceCode}
                destinationCode={destinationCode}
                className={"m-0"}
              />
            </Col>
          </Row>
        </div>
      </InfoContainer>
    </div>
  );
}

SideBySideDeltaDiffField.propTypes = {
  delta: PropTypes.object,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  maximumHeight: PropTypes.string,
  minimumHeight: PropTypes.string,
  loadDataFunction: PropTypes.func,
  language: PropTypes.string,
  leftSideTitleIcon: PropTypes.object,
  rightSideTitleIcon: PropTypes.object,
  sourceCode: PropTypes.string,
  destinationCode: PropTypes.string,
};

SideBySideDeltaDiffField.defaultProps = {
  leftSideTitleIcon: faCode,
  rightSideTitleIcon: faCode,
};

export default SideBySideDeltaDiffField;