import React, { useContext } from "react";
import PropTypes from "prop-types";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import Col from "react-bootstrap/Col";
import TwoLineScoreDataBlock from "../../../../../common/metrics/score/TwoLineScoreDataBlock";
import TwoLinePercentageDataBlock from "../../../../../common/metrics/percentage/TwoLinePercentageDataBlock";

function SonarRatingsCodeCoverageBlockContainer({ tests, lineCoverage, duplicate, kpiConfiguration, dashboardData,
                                                }) {

  const getLeftDataBlock = () => {
    return <TwoLinePercentageDataBlock percentage={lineCoverage} subtitle={"Line Coverage %"} />;
  };

  const getMiddleDataBlock = () => {
    return <TwoLineScoreDataBlock score={tests} subtitle={"Unit Tests"}  />;
  };

  const getRightDataBlock = () => {
    return <TwoLinePercentageDataBlock percentage={duplicate} subtitle={"Duplicated Lines %"} />;
  };

  return (
    <HorizontalDataBlocksContainer title={"Sonar Ratings: Code Coverage"}>
      <Col sm={4}>{getLeftDataBlock()}</Col>
      <Col sm={4}>{getMiddleDataBlock()}</Col>
      <Col sm={4}>{getRightDataBlock()}</Col>
    </HorizontalDataBlocksContainer>
  );
}

SonarRatingsCodeCoverageBlockContainer.propTypes = {
  tests: PropTypes.number,
  lineCoverage: PropTypes.number,
  duplicate: PropTypes.number,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default SonarRatingsCodeCoverageBlockContainer;