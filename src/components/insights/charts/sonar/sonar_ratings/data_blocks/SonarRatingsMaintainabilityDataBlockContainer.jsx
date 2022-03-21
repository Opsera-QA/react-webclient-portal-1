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
import ThreeLinePercentageBlockBase from "../../../../../common/metrics/percentage/ThreeLinePercentageBlockBase";

function SonarRatingsMaintainabilityDataBlockContainer({
  maintainabilityRating,
  technicalDebtRatio,
  kpiConfiguration,
  dashboardData,
  dataPoint,
   className,
   lastScore,
   icon,
   iconOverlayBody,
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
    return (
      <ThreeLinePercentageBlockBase
        className={`${className} p-2`}
        percentage={technicalDebtRatio}
        topText={"Technical Debt Ratio"}
        bottomText={`Last Scan: ${lastScore}%`}
        icon={icon}
        iconOverlayBody={iconOverlayBody}
      />
    );
  };

  const getRightDataBlock = () => {
    return <StandardTwoGoalDataBlock topGoal={"Maintainability: A"} bottomGoal={"Technical Debt Ratio: 0 - 5%"} />;
  };

  return (
    <HorizontalDataBlocksContainer title={"Sonar Ratings: Maintainability"} onClick={() => onRowSelect()} dataPoint={dataPoint}>
      <Col className={"my-4"} sm={4}>{getLeftDataBlock()}</Col>
      <Col sm={4}>{getMiddleDataBlock()}</Col>
      <Col className={"mb-3"} sm={3}>{getRightDataBlock()}</Col>
    </HorizontalDataBlocksContainer>
  );
}

SonarRatingsMaintainabilityDataBlockContainer.propTypes = {
  maintainabilityRating: PropTypes.number,
  technicalDebtRatio: PropTypes.number,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dataPoint: PropTypes.object,
  icon: PropTypes.object,
  className: PropTypes.string,
  lastScore: PropTypes.number,
  iconOverlayBody: PropTypes.any,
};

export default SonarRatingsMaintainabilityDataBlockContainer;
