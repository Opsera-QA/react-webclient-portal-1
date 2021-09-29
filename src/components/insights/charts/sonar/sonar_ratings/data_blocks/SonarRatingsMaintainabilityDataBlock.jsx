import React, {useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import SonarRatingsBugsActionableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar-ratings-bugs-actionable-metadata";
import ChartDetailsOverlay from "components/insights/charts/detail_overlay/ChartDetailsOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import {LETTER_GRADES} from "components/common/metrics/grade/MetricLetterGradeText";
import ThreeHorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/ThreeHorizontalDataBlocksContainer";
import LegendDataBlock from "components/common/metrics/data_blocks/legend/LegendDataBlock";
import PercentageDataBlock from "components/common/metrics/percentage/PercentageDataBlock";
import TwoLineGradeDataBlock from "components/common/metrics/grade/TwoLineGradeDataBlock";
import Col from "react-bootstrap/Col";

function SonarRatingsMaintainabilityDataBlock({ dashboardData, kpiConfiguration, maintainabilityRating, technicalDebtRatio }) {
  const toastContext = useContext(DialogToastContext);

  const onRowSelect = () => {
    const chartModel = new Model({...SonarRatingsBugsActionableMetadata.newObjectFields}, SonarRatingsBugsActionableMetadata, false);
    toastContext.showOverlayPanel(
      <ChartDetailsOverlay
        dashboardData={dashboardData}
        kpiConfiguration={kpiConfiguration}
        chartModel={chartModel}
        kpiIdentifier={"sonar-ratings-debt-ratio"} />);
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
      <Col sm={"25%"}>
        <TwoLineGradeDataBlock
          letterGrade={getSonarMaintainabilityGrade(maintainabilityRating)}
          subtitle={"Maintainability"}
        />
      </Col>
    );
  };

  const getMiddleDataBlock = () => {
    return (
      <Col sm={"25%"}>
        <PercentageDataBlock
          percentage={technicalDebtRatio}
          subtitle={"Technical Debt Ratio"}
        />
      </Col>
    );
  };

  const getRightDataBlock = () => {
    return (
      <Col sm={"50%"}>
        <LegendDataBlock
          firstItem={"Goal for Maintainability: A"}
          secondItem={"Technical Debt Ratio: 0 - 5%"}
        />
      </Col>
    );
  };

  return (
    <ThreeHorizontalDataBlocksContainer
      title={"Sonar Ratings: Maintainability"}
      onClick={() => onRowSelect()}
      leftDataBlock={getLeftDataBlock()}
      middleDataBlock={getMiddleDataBlock()}
      rightDataBlock={getRightDataBlock()}
    />
  );
}

SonarRatingsMaintainabilityDataBlock.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  maintainabilityRating: PropTypes.number,
  technicalDebtRatio: PropTypes.number,
};

export default SonarRatingsMaintainabilityDataBlock;
