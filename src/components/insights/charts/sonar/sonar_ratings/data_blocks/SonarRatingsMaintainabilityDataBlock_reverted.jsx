import React, {useContext} from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import {LETTER_GRADES} from "components/common/metrics/grade/MetricLetterGradeText";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import LegendDataBlock from "components/common/metrics/data_blocks/legend/LegendDataBlock";
import PercentageDataBlock from "components/common/metrics/percentage/PercentageDataBlock";
import TwoLineGradeDataBlock from "components/common/metrics/grade/TwoLineGradeDataBlock";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import SonarPipelineWiseMaintainabilityDetails from './SonarPipelineWiseMaintainabilityDetails';
import Col from "react-bootstrap/Col";
function SonarRatingsMaintainabilityDataBlock({ maintainabilityRating, technicalDebtRatio }) {
  const toastContext = useContext(DialogToastContext);
  console.log(maintainabilityRating, technicalDebtRatio ,' ***');

  const onRowSelect =()=>{    
    toastContext.showOverlayPanel(
      <FullScreenCenterOverlayContainer
        closePanel={closePanel}
        showPanel={true}
        titleText={`Sonar Ratings: Maintainability`}
        showToasts={true}
        titleIcon={faTable}
        isLoading={false}
        linkTooltipText={"View Full Blueprint"}
      >
        <div className={"p-3"}>
          <SonarPipelineWiseMaintainabilityDetails />
        </div>        
      </FullScreenCenterOverlayContainer>
    );
  };
  
  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getSonarMaintainabilityGrade = (rating) => {
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
        letterGrade={getSonarMaintainabilityGrade(maintainabilityRating)}
        subtitle={"Maintainability"}
      />
    );
  };

  const getMiddleDataBlock = () => {
    return (
      <PercentageDataBlock
        percentage={technicalDebtRatio}
        subtitle={"Technical Debt Ratio"}
      />
    );
  };

  const getRightDataBlock = () => {
    return (
      <LegendDataBlock
        firstItem={"Goal for Maintainability: A"}
        secondItem={"Technical Debt Ratio: 0 - 5%"}
      />
    );
  };

  return (
    <HorizontalDataBlocksContainer
      title={"Sonar Ratings: Maintainability"}
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

SonarRatingsMaintainabilityDataBlock.propTypes = {
  maintainabilityRating: PropTypes.number,
  technicalDebtRatio: PropTypes.number,
};

export default SonarRatingsMaintainabilityDataBlock;
