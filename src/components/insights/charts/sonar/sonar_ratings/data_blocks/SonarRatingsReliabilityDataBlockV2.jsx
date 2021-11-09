import React, {useContext} from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import {LETTER_GRADES} from "components/common/metrics/grade/MetricLetterGradeText";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import LegendDataBlock from "components/common/metrics/data_blocks/legend/LegendDataBlock";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import TwoLineGradeDataBlock from "components/common/metrics/grade/TwoLineGradeDataBlock";

import SonarRatingsReliabilityActionableInsightOverlay from 'components/insights/charts/sonar/sonar_ratings/actionable_insights/reliability/SonarRatingsReliabilityActionableInsightOverlay';
import Col from "react-bootstrap/Col";
function SonarRatingsReliabilityDataBlockV2({ reliabilityRating, bugCount }) {
  const toastContext = useContext(DialogToastContext);

  const onRowSelect =()=>{    
    toastContext.showOverlayPanel(
      <SonarRatingsReliabilityActionableInsightOverlay />
    );
  };

  const getSonarReliabilityGrade = (rating) => {
    if (rating <= 1) {
      return LETTER_GRADES.A;
    }
    else if (rating <= 2) {
      return LETTER_GRADES.B;
    }
    else if (rating <= 3) {
      return LETTER_GRADES.C;
    }
    else if (rating <= 4) {
      return LETTER_GRADES.D;
    }
    else if (rating <= 5) {
      return LETTER_GRADES.E;
    }
    else {
      return "ERROR";
    }
  };

  const getLeftDataBlock = () => {
    return (
      <TwoLineGradeDataBlock
        letterGrade={getSonarReliabilityGrade(reliabilityRating)}
        subtitle={"Reliability"}
      />
    );
  };

  const getMiddleDataBlock = () => {
    return (
      <TwoLineScoreDataBlock
        score={bugCount}
        subtitle={"Bugs"}
      />
    );
  };

  const getRightDataBlock = () => {
    return (
      <LegendDataBlock
        firstItem={"Goal for Reliability: A"}
        // secondItem={"Fix X Bugs"}
      />
    );
  };

  return (
    <HorizontalDataBlocksContainer
      title={"Sonar Ratings: Reliability"}
      onClick={() => onRowSelect()}
    >
      <Col sm={4}>
        {getLeftDataBlock()}
      </Col>
      <Col sm={4}>
        {getMiddleDataBlock()}
      </Col>
      <Col sm={4}>
        {getRightDataBlock()}
      </Col>
    </HorizontalDataBlocksContainer>
  );
}

SonarRatingsReliabilityDataBlockV2.propTypes = {
  reliabilityRating: PropTypes.number,
  bugCount: PropTypes.number,
};

export default SonarRatingsReliabilityDataBlockV2;
