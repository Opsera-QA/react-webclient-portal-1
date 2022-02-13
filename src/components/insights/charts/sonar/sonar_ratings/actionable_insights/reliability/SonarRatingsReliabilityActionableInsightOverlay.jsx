import React, { useEffect, useContext, useState, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";
import Model from "core/data_model/model";
import { Row, Col } from "react-bootstrap";
import { faExternalLink, faTable } from "@fortawesome/pro-light-svg-icons";
import chartsActions from "components/insights/charts/charts-actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { getTimeDisplay } from "components/insights/charts/sonar/sonar_ratings/data_blocks/sonar-ratings-pipeline-utility";
import SonarRatingsReliabilityOverviewDataBlockContainer from "components/insights/charts/sonar/sonar_ratings/actionable_insights/reliability/SonarRatingsReliabilityOverviewDataBlockContainer";
import SonarRatingsReliabilityActionableInsightTable from "components/insights/charts/sonar/sonar_ratings/actionable_insights/reliability/SonarRatingsReliabilityActionableInsightTable";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";

function SonarRatingsReliabilityActionableInsightOverlay({ kpiConfiguration, dashboardData }) {
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
  const [bugsData, setBugsData] = useState([]);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);
  const [footerData, setFooterData] = useState(undefined);
  const [issueTypeData, setIssueTypeData] = useState(undefined);

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

  const calculateTrend = (bug) => {
    if (bug.currentScanIssuesCount || !bug.previousScanIssuesCount) {
      return "";
    } else if (bug.currentScanIssuesCount > bug.previousScanIssuesCount) {
      return "Green";
    } else if (bug.currentScanIssuesCount < bug.previousScanIssuesCount) {
      return "Red";
    } else {
      return "Neutral";
    }
  };

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
        "sonarRatingsBugsActionableInsights",
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
      if (isMounted?.current === true && response?.status === 200) {
        const sonarBugs = response?.data?.data[0]?.sonarBugs?.data[0]?.projectData;
        await setBugsData(
          sonarBugs.map((bug, index) => ({
            ...bug,
            status: calculateTrend(bug),
            _blueprint: <FontAwesomeIcon icon={faExternalLink} fixedWidth className="mr-2" />,
          }))
        );
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", response?.data?.data[0]?.sonarBugs?.data[0]?.count[0]?.count);
        setFilterModel({ ...newFilterDto });
        setIssueTypeData(response?.data?.data[0]?.sonarBugs?.data[0]?.typeData[0]);
        setFooterData(response?.data?.data[0]?.sonarBugs?.data[0]?.debtData[0]);
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

  const getFooterDetails = () => {
    if (!footerData) {
      return null;
    }

    const mins = footerData?.totalEffort ? footerData?.totalEffort : 0;
    const display = getTimeDisplay(mins);

    return (
      <Row className="px-2">
        <Col className="footer-records text-right">Total Remediation Efforts : {mins == 0 ? "0 minutes" : display}</Col>
      </Row>
    );
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getDateBadge = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
    return <MetricDateRangeBadge startDate={date?.startDate} endDate={date?.endDate} />;
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Sonar Ratings: Reliability`}
      showToasts={true}
      titleIcon={faTable}
      isLoading={false}
      linkTooltipText={"View Full Blueprint"}
    >
      <div className={"p-3"}>
        <div className={"mb-4"} >{getDateBadge()}</div>
        <SonarRatingsReliabilityOverviewDataBlockContainer sonarMetric={issueTypeData} />
        <SonarRatingsReliabilityActionableInsightTable
          bugsData={bugsData}
          isLoading={isLoading}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          loadData={loadData}
        />
        {getFooterDetails()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

SonarRatingsReliabilityActionableInsightOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default SonarRatingsReliabilityActionableInsightOverlay;
