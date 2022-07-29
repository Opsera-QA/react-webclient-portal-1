import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InfoContainer from "components/common/containers/InfoContainer";
import { faCode } from "@fortawesome/pro-light-svg-icons";
import SyntaxHighlighterFieldBase from "components/common/fields/code/syntax_highlighter/SyntaxHighlighterFieldBase";

function SideBySideCodeComparisonField(
  {
    leftSideCode,
    leftSideTitleText,
    leftSideTitleIcon,
    rightSideCode,
    rightSideTitleText,
    rightSideTitleIcon,
    titleText,
    isLoading,
    maximumHeight,
    minimumHeight,
    className,
    language,
  }) {
  return (
    <div className={className}>
      <InfoContainer
        titleText={titleText}
        titleIcon={faCode}
        minimumHeight={minimumHeight}
        maximumHeight={maximumHeight}
      >
        <div style={{ overflowX: "hidden" }} className={"m-2"}>
          <Row>
            <Col xs={12} md={6} className={"pr-1"}>
              <InfoContainer
                titleIcon={leftSideTitleIcon}
                titleText={leftSideTitleText}
                isLoading={isLoading}
                backgroundColor={"rgb(43, 43, 43)"}
              >
                <SyntaxHighlighterFieldBase
                  code={leftSideCode}
                  language={language}
                  className={"p-1"}
                />
              </InfoContainer>
            </Col>
            <Col xs={12} md={6} className={"pl-1"}>
              <InfoContainer
                titleIcon={rightSideTitleIcon}
                titleText={rightSideTitleText}
                isLoading={isLoading}
                backgroundColor={"rgb(43, 43, 43)"}
              >
                <SyntaxHighlighterFieldBase
                  code={rightSideCode}
                  language={language}
                  className={"p-1"}
                />
              </InfoContainer>
            </Col>
          </Row>
        </div>
      </InfoContainer>
    </div>
  );
}

SideBySideCodeComparisonField.propTypes = {
  leftSideCode: PropTypes.any,
  leftSideTitleText: PropTypes.string,
  leftSideTitleIcon: PropTypes.object,
  rightSideCode: PropTypes.any,
  rightSideTitleText: PropTypes.string,
  rightSideTitleIcon: PropTypes.object,
  titleText: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  maximumHeight: PropTypes.string,
  minimumHeight: PropTypes.string,
  language: PropTypes.string,
};

SideBySideCodeComparisonField.defaultProps = {
  titleText: "Code Comparison",
  leftSideTitleIcon: faCode,
  rightSideTitleIcon: faCode,
};

export default SideBySideCodeComparisonField;