import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import { LETTER_GRADES } from "components/common/metrics/grade/MetricLetterGradeText";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import TwoLinePercentageDataBlock from "components/common/metrics/percentage/TwoLinePercentageDataBlock";
import TwoLineGradeDataBlock from "components/common/metrics/grade/TwoLineGradeDataBlock";
import SonarRatingsMaintainabilityActionableInsightOverlay from "components/insights/charts/sonar/sonar_ratings/actionable_insights/maintainability/SonarRatingsMaintainabilityActionableInsightOverlay";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StandardTwoGoalDataBlock from "components/common/metrics/goals/double/StandardTwoGoalDataBlock";

function SonarRatingsMaintainabilityDataBlockContainer({
  maintainabilityRating,
  technicalDebtRatio,
  kpiConfiguration,
  dashboardData,
  dataPoint
}) {
  const toastContext = useContext(DialogToastContext);

  const onRowSelect = () => {
    toastContext.showOverlayPanel(
      <SonarRatingsMaintainabilityActionableInsightOverlay
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
      />
    );
  };

  const getSonarMaintainabilityGrade = (rating) => {
    if (rating <= 5) {
      return LETTER_GRADES.A;
    } else if (rating <= 10) {
      return LETTER_GRADES.B;
    } else if (rating <= 20) {
      return LETTER_GRADES.C;
    } else if (rating <= 50) {
      return LETTER_GRADES.D;
    } else if (rating <= 100) {
      return LETTER_GRADES.E;
    } else {
      return "ERROR";
    }
  };

  const getLeftDataBlock = () => {
    return (
      <TwoLineGradeDataBlock
        letterGrade={getSonarMaintainabilityGrade(maintainabilityRating)}
        subtitle={"Maintainability"}
      />
    );
  };

  const getMiddleDataBlock = () => {
    return <TwoLinePercentageDataBlock percentage={technicalDebtRatio} subtitle={"Technical Debt Ratio"} />;
  };

  const getRightDataBlock = () => {
    return <StandardTwoGoalDataBlock topGoal={"Maintainability: A"} bottomGoal={"Technical Debt Ratio: 0 - 5%"} />;
  };

  return (
    <HorizontalDataBlocksContainer title={"Sonar Ratings: Maintainability"} onClick={() => onRowSelect()} dataPoint={dataPoint}>
      <Col sm={4}>{getLeftDataBlock()}</Col>
      <Col sm={4}>{getMiddleDataBlock()}</Col>
      <Col sm={4}>{getRightDataBlock()}</Col>
    </HorizontalDataBlocksContainer>
  );
}

SonarRatingsMaintainabilityDataBlockContainer.propTypes = {
  maintainabilityRating: PropTypes.number,
  technicalDebtRatio: PropTypes.number,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dataPoint: PropTypes.object
};

export default SonarRatingsMaintainabilityDataBlockContainer;
