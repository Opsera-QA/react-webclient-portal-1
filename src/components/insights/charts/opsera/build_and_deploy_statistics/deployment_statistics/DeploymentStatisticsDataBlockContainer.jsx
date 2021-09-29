import React, {useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import SonarRatingsBugsActionableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar-ratings-bugs-actionable-metadata";
import ChartDetailsOverlay from "components/insights/charts/detail_overlay/ChartDetailsOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import {LETTER_GRADES} from "components/common/metrics/grade/MetricLetterGradeText";
import HorizontalDataBlockContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlockContainer";
import LegendDataBlock from "components/common/metrics/data_blocks/legend/LegendDataBlock";
import PercentageDataBlock from "components/common/metrics/percentage/PercentageDataBlock";
import TwoLineGradeDataBlock from "components/common/metrics/grade/TwoLineGradeDataBlock";
import ThreeLineDataBlockBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import SuccessfulDeploymentsDataBlock
  from "components/insights/charts/opsera/build_and_deploy_statistics/deployment_statistics/successful_deployments/SuccessfulDeploymentsDataBlock";

function DeploymentStatisticsDataBlockContainer({ dashboardData, kpiConfiguration, maintainabilityRating, technicalDebtRatio }) {
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
      <SuccessfulDeploymentsDataBlock

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
      <ThreeLineDataBlockBase
        firstItem={"Successful Deployments"}
        secondItem={"Technical Debt Ratio: 0 - 5%"}
      />
    );
  };

  return (
    <HorizontalDataBlockContainer
      title={"Deployment Statistics"}
      onClick={() => onRowSelect()}
      leftDataBlock={getLeftDataBlock()}
      middleDataBlock={getMiddleDataBlock()}
      rightDataBlock={getRightDataBlock()}
    />
  );
}

DeploymentStatisticsDataBlockContainer.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  maintainabilityRating: PropTypes.number,
  technicalDebtRatio: PropTypes.number,
};

export default DeploymentStatisticsDataBlockContainer;
