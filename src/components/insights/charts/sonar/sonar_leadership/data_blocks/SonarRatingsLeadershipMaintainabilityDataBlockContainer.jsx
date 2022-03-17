import React from "react";
import PropTypes from "prop-types";
import { LETTER_GRADES } from "components/common/metrics/grade/MetricLetterGradeText";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import TwoLineGradeDataBlock from "components/common/metrics/grade/TwoLineGradeDataBlock";
import Col from "react-bootstrap/Col";
import StandardTwoGoalDataBlock from "components/common/metrics/goals/double/StandardTwoGoalDataBlock";
import ThreeLinePercentageBlockBase from "../../../../../common/metrics/percentage/ThreeLinePercentageBlockBase";

function SonarRatingsLeadershipMaintainabilityDataBlockContainer(
  {
    className,
    lastScore,
    icon,
    iconOverlayBody,
    maintainabilityRating,
    technicalDebtRatio,
  }) {

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
    return (
      <StandardTwoGoalDataBlock
        topGoal={"Maintainability: A"}
        bottomGoal={"Technical Debt Ratio: 0 - 5%"}
      />
    );
  };

  return (
    <HorizontalDataBlocksContainer title={"Sonar Ratings: Maintainability"} >
      <Col className={"my-4"} sm={4}>
        {getLeftDataBlock()}
      </Col>
      <Col sm={4}>
        {getMiddleDataBlock()}
      </Col>
      <Col className={"mb-3"} sm={3}>
        {getRightDataBlock()}
      </Col>
    </HorizontalDataBlocksContainer>
  );
}

SonarRatingsLeadershipMaintainabilityDataBlockContainer.propTypes = {
  maintainabilityRating: PropTypes.number,
  technicalDebtRatio: PropTypes.number,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  icon: PropTypes.object,
  className: PropTypes.string,
  lastScore: PropTypes.number,
  iconOverlayBody: PropTypes.any,
};

export default SonarRatingsLeadershipMaintainabilityDataBlockContainer;
