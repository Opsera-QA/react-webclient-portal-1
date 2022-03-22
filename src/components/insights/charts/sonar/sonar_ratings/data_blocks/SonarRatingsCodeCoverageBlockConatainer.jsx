import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import Col from "react-bootstrap/Col";
import TwoLineScoreDataBlock from "../../../../../common/metrics/score/TwoLineScoreDataBlock";
import SonarRatingCodeCoverageActionableInsightOverlay
  from "../actionable_insights/coverage/SonarRatingCodeCoverageActionableInsightOverlay";
import TwoLinePercentageDataBlock from "../../../../../common/metrics/percentage/TwoLinePercentageDataBlock";
import ThreeLinePercentageBlockBase from "../../../../../common/metrics/percentage/ThreeLinePercentageBlockBase";

function SonarRatingsCodeCoverageBlockContainer({ tests, lineCoverage, duplicate, kpiConfiguration, dashboardData, dataPoint, className,
                                                  lastScore,
                                                  icon,
                                                  iconOverlayBody,
                                                       }) {
  const toastContext = useContext(DialogToastContext);

  const onRowSelect = () => {
    toastContext.showOverlayPanel(
      <SonarRatingCodeCoverageActionableInsightOverlay
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
      />
    );
  };

  const getLeftDataBlock = () => {
    return (
      <ThreeLinePercentageBlockBase
        className={`${className} p-2`}
        percentage={lineCoverage}
        topText={"Line Coverage%"}
        bottomText={"Last Scan: " + lastScore + "%"}
        icon={icon}
        iconOverlayBody={iconOverlayBody}
        dataPoint={dataPoint}
      />
    );
  };

  const getMiddleDataBlock = () => {
    return <TwoLineScoreDataBlock score={tests} subtitle={"Unit Tests"}  />;
  };

  const getRightDataBlock = () => {
    return <TwoLinePercentageDataBlock percentage={duplicate} subtitle={"Duplicated Lines %"} />;
  };

  return (
    <HorizontalDataBlocksContainer title={"Sonar Ratings: Line Coverage"} onClick={() => onRowSelect()} dataPoint={dataPoint}>
      <Col sm={4}>{getLeftDataBlock()}</Col>
      <Col className={"my-4"} sm={4}>{getMiddleDataBlock()}</Col>
      <Col className={"my-4"} sm={4}>{getRightDataBlock()}</Col>
    </HorizontalDataBlocksContainer>
  );
}

SonarRatingsCodeCoverageBlockContainer.propTypes = {
  tests: PropTypes.number,
  lineCoverage: PropTypes.number,
  duplicate: PropTypes.number,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dataPoint: PropTypes.object,
  icon: PropTypes.object,
  className: PropTypes.string,
  lastScore: PropTypes.number,
  iconOverlayBody: PropTypes.any,
};

export default SonarRatingsCodeCoverageBlockContainer;