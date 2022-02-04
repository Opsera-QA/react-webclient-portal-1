import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import Col from "react-bootstrap/Col";
import TwoLineScoreDataBlock from "../../../../../common/metrics/score/TwoLineScoreDataBlock";
import SonarRatingCodeCoverageActionableInsightOverlay
  from "../actionable_insights/coverage/SonarRatingCodeCoverageActionableInsightOverlay";

function SonarRatingsCodeCoverageBlockContainer({ linesToCover, uncoveredLines, duplicate, kpiConfiguration, dashboardData,
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
    return <TwoLineScoreDataBlock score={linesToCover} subtitle={"Lines to Cover"} />;
  };

  const getMiddleDataBlock = () => {
    return <TwoLineScoreDataBlock score={uncoveredLines} subtitle={"Uncovered Lines"} />;
  };

  const getRightDataBlock = () => {
    return <TwoLineScoreDataBlock score={duplicate} subtitle={"Duplicate Lines"} />;
  };

  return (
    <HorizontalDataBlocksContainer title={"Sonar Ratings: Code Coverage"} onClick={() => onRowSelect()}>
      <Col sm={4}>{getLeftDataBlock()}</Col>
      <Col sm={4}>{getMiddleDataBlock()}</Col>
      <Col sm={4}>{getRightDataBlock()}</Col>
    </HorizontalDataBlocksContainer>
  );
}

SonarRatingsCodeCoverageBlockContainer.propTypes = {
  linesToCover: PropTypes.number,
  uncoveredLines: PropTypes.number,
  duplicate: PropTypes.number,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default SonarRatingsCodeCoverageBlockContainer;