import React, { useEffect, useContext, useState, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import Model from "core/data_model/model";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { faExternalLink, faTable } from "@fortawesome/pro-light-svg-icons";
import chartsActions from "components/insights/charts/charts-actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { getTimeDisplay } from "components/insights/charts/sonar/sonar_ratings/data_blocks/sonar-ratings-pipeline-utility";
import SonarRatingsMaintainabilityOverviewDataBlockContainer from "components/insights/charts/sonar/sonar_ratings/actionable_insights/maintainability/SonarRatingsMaintainabilityOverviewDataBlockContainer";
import SonarRatingsMaintainabilityActionableInsightTable from "components/insights/charts/sonar/sonar_ratings/actionable_insights/maintainability/SonarRatingsMaintainabilityActionableInsightTable";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import SonarRatingCodeCoverageActionableInsightTable from "./SonarRatingCodeCoverageActionableInsightTable";

function SonarRatingsMaintainabilityActionableInsightOverlay({ kpiConfiguration, dashboardData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
      actionableInsightsGenericChartFilterMetadata,
      false
    )
  );
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [coverageData, setCoverageData] = useState([]);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const calculateTrend = (maintainibility) => {
    if (maintainibility.currentScanIssuesCount || !maintainibility.previousScanIssuesCount) {
      return "";
    } else if (maintainibility.currentScanIssuesCount > maintainibility.previousScanIssuesCount) {
      return "Green";
    } else if (maintainibility.currentScanIssuesCount < maintainibility.previousScanIssuesCount) {
      return "Red";
    } else {
      return "Neutral";
    }
  };

  console.log("help");

  const loadData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "sonarCodeCoverageActionableInsights",
        kpiConfiguration,
        dashboardTags,
        filterDto,
        undefined,
        dashboardOrgs,
        undefined,
        undefined,
        undefined,
        undefined
      );

      const metrics = response?.data.data[0].sonarCodeCoverageActionableInsights.data[0].data;

      console.log("metrics", metrics);

      if (isMounted?.current === true && Array.isArray(metrics)) {
        setCoverageData(metrics);

        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", response?.data?.data[0]?.sonarCodeCoverageActionableInsights?.data[0]?.count[0]?.count);
        setFilterModel({ ...newFilterDto });
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };
  

  const getDateBadge = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
    return <MetricDateRangeBadge startDate={date?.startDate} endDate={date?.endDate} />;
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  console.log("coverageData", coverageData);

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Sonar Ratings: Code Coverage`}
      showToasts={true}
      titleIcon={faTable}
      isLoading={false}
      linkTooltipText={"View Full Blueprint"}
    >
      <div className={"p-3"}>
        {getDateBadge()}
        <SonarRatingCodeCoverageActionableInsightTable
          isLoading={isLoading}
          coverageData={coverageData}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          loadData={loadData}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

SonarRatingsMaintainabilityActionableInsightOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default SonarRatingsMaintainabilityActionableInsightOverlay;
