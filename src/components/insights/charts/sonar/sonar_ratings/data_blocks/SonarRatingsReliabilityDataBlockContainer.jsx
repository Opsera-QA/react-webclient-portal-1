import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import { LETTER_GRADES } from "components/common/metrics/grade/MetricLetterGradeText";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import TwoLineGradeDataBlock from "components/common/metrics/grade/TwoLineGradeDataBlock";
import SonarRatingsReliabilityActionableInsightOverlay from "components/insights/charts/sonar/sonar_ratings/actionable_insights/reliability/SonarRatingsReliabilityActionableInsightOverlay";
import Col from "react-bootstrap/Col";
import OneLineGoalDataBlockBase from "components/common/metrics/goals/single/OneLineGoalDataBlockBase";
import Row from "react-bootstrap/Row";
import StandardTwoGoalDataBlock from "components/common/metrics/goals/double/StandardTwoGoalDataBlock";

function SonarRatingsReliabilityDataBlockContainer({ reliabilityRating, bugCount, kpiConfiguration, dashboardData, dataPoint }) {
  const toastContext = useContext(DialogToastContext);

  const onRowSelect = () => {
    toastContext.showOverlayPanel(
      <SonarRatingsReliabilityActionableInsightOverlay
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
      />
    );
  };

  const getSonarReliabilityGrade = (rating) => {
    if (rating <= 1) {
      return LETTER_GRADES.A;
    } else if (rating <= 2) {
      return LETTER_GRADES.B;
    } else if (rating <= 3) {
      return LETTER_GRADES.C;
    } else if (rating <= 4) {
      return LETTER_GRADES.D;
    } else if (rating <= 5) {
      return LETTER_GRADES.E;
    } else {
      return "ERROR";
    }
  };

  const getLeftDataBlock = () => {
    return <TwoLineGradeDataBlock letterGrade={getSonarReliabilityGrade(reliabilityRating)} subtitle={"Reliability"}/>;
  };

  const getMiddleDataBlock = () => {
    return <TwoLineScoreDataBlock score={bugCount} subtitle={"Bugs"} />;
  };

  const getRightDataBlock = () => {
    return <StandardTwoGoalDataBlock topGoal={"Reliability: A"} bottomGoal={"Bugs: 0 - 1"} />;
  };

  return (
    <HorizontalDataBlocksContainer title={"Sonar Ratings: Reliability"} onClick={() => onRowSelect()} dataPoint={dataPoint}>
      <Col sm={4}>{getLeftDataBlock()}</Col>
      <Col sm={4}>{getMiddleDataBlock()}</Col>
      <Col sm={4}>{getRightDataBlock()}</Col>
    </HorizontalDataBlocksContainer>
  );
}

SonarRatingsReliabilityDataBlockContainer.propTypes = {
  reliabilityRating: PropTypes.number,
  bugCount: PropTypes.number,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dataPoint: PropTypes.object,
};

export default SonarRatingsReliabilityDataBlockContainer;
