import React, {useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import SonarRatingsBugsActionableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar-ratings-bugs-actionable-metadata";
import ChartDetailsOverlay from "../../detail_overlay/ChartDetailsOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import MetricLetterGrade, {LETTER_GRADES} from "components/common/metrics/grade/MetricLetterGrade";
import DataBlockBase from "components/common/metrics/data_blocks/DataBlockBase";
import HorizontalDataBlockContainer from "components/common/metrics/data_blocks/HorizontalDataBlockContainer";
import LegendDataBlock from "components/common/metrics/data_blocks/LegendDataBlock";

//TODO: Charts should have some sort of name that says they're a chart like SonarRatingsChart for clarity and easy of global search
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
      <DataBlockBase
        title={<MetricLetterGrade letterGrade={getSonarMaintainabilityGrade(maintainabilityRating)}/>}
        subtitle={"Maintainability"}
      />
    );
  };

  const getMiddleDataBlock = () => {
    return (
      // TODO: Make percentage component
      <DataBlockBase
        title={`${technicalDebtRatio}%`}
        subtitle={"Technical Debt Ratio"}
      />
    );
  };

  const getRightDataBlock = () => {
    return (
      <LegendDataBlock
        firstItem={"Goal for Maintainability: A"}
        secondItem={"Technical Debt Ratio: 0 - 0.05%"}
      />
    );
  };

  return (
    <HorizontalDataBlockContainer
      title={"Maintainability"}
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
