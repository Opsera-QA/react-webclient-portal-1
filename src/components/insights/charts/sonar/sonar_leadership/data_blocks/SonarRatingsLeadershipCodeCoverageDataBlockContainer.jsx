import React from "react";
import PropTypes from "prop-types";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import Col from "react-bootstrap/Col";
import ThreeLinePercentageBlockBase from "components/common/metrics/percentage/ThreeLinePercentageBlockBase";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import TwoLinePercentageDataBlock from "components/common/metrics/percentage/TwoLinePercentageDataBlock";

function SonarRatingsLeadershipCodeCoverageDataBlockContainer(
  {
    tests,
    lineCoverage,
    duplicate,
    className,
    lastScore,
    icon,
    iconOverlayBody,
  }) {
  const getLeftDataBlock = () => {
    return (
      <ThreeLinePercentageBlockBase
        className={`${className} p-2`}
        percentage={lineCoverage}
        topText={"Line Coverage%"}
        bottomText={"Last Scan: " + lastScore + "%"}
        icon={icon}
        iconOverlayBody={iconOverlayBody}
      />
    );
  };

  const getMiddleDataBlock = () => {
    return (
      <TwoLineScoreDataBlock
        score={tests}
        subtitle={"Unit Tests"}
      />
    );
  };

  const getRightDataBlock = () => {
    return (
      <TwoLinePercentageDataBlock
        percentage={duplicate}
        subtitle={"Duplicated Lines %"}
      />
    );
  };

  return (
    <HorizontalDataBlocksContainer title={"Sonar Ratings: Code Coverage"}>
      <Col sm={4}>{getLeftDataBlock()}</Col>
      <Col className={"my-4"} sm={4}>{getMiddleDataBlock()}</Col>
      <Col className={"my-4"} sm={4}>{getRightDataBlock()}</Col>
    </HorizontalDataBlocksContainer>
  );
}

SonarRatingsLeadershipCodeCoverageDataBlockContainer.propTypes = {
  tests: PropTypes.number,
  lineCoverage: PropTypes.number,
  duplicate: PropTypes.number,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  icon: PropTypes.object,
  className: PropTypes.string,
  lastScore: PropTypes.number,
  iconOverlayBody: PropTypes.any,
};

export default SonarRatingsLeadershipCodeCoverageDataBlockContainer;