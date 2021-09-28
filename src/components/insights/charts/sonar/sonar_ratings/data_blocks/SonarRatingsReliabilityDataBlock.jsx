import React, {useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import SonarRatingsBugsActionableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar-ratings-bugs-actionable-metadata";
import ChartDetailsOverlay from "components/insights/charts/detail_overlay/ChartDetailsOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import {LETTER_GRADES} from "components/common/metrics/grade/MetricLetterGradeText";
import HorizontalDataBlockContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlockContainer";
import LegendDataBlock from "components/common/metrics/data_blocks/legend/LegendDataBlock";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import TwoLineGradeDataBlock from "components/common/metrics/grade/TwoLineGradeDataBlock";

function SonarRatingsReliabilityDataBlock({ dashboardData, kpiConfiguration, reliabilityRating, bugCount }) {
  const toastContext = useContext(DialogToastContext);

  const onRowSelect = () => {
    const chartModel = new Model({...SonarRatingsBugsActionableMetadata.newObjectFields}, SonarRatingsBugsActionableMetadata, false);
    toastContext.showOverlayPanel(
      <ChartDetailsOverlay
        dashboardData={dashboardData}
        kpiConfiguration={kpiConfiguration}
        chartModel={chartModel}
        kpiIdentifier={"sonar-ratings-bugs"} />);
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
    <HorizontalDataBlockContainer
      title={"Sonar Ratings: Reliability"}
      onClick={() => onRowSelect()}
      leftDataBlock={getLeftDataBlock()}
      middleDataBlock={getMiddleDataBlock()}
      rightDataBlock={getRightDataBlock()}
    />
  );
}

SonarRatingsReliabilityDataBlock.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  reliabilityRating: PropTypes.number,
  bugCount: PropTypes.number,
};

export default SonarRatingsReliabilityDataBlock;
