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
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";

function SonarRatingsMaintainabilityActionableInsightOverlay({ kpiConfiguration, dashboardData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [filterModel, setFilterModel] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, genericChartFilterMetadata, false)
  );
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [maintainibilityData, setMaintainibilityData] = useState([]);
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

  const calculateTrend = (maintainibility) => {
    if (maintainibility.currentScanIssuesCount || !maintainibility.previousScanIssuesCount) {
      return "-";
    } else if (maintainibility.currentScanIssuesCount > maintainibility.previousScanIssuesCount) {
      return "green";
    } else if (maintainibility.currentScanIssuesCount < maintainibility.previousScanIssuesCount) {
      return "red";
    } else {
      return "neutral";
    }
  };

  const loadData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "sonarRatingsCodeSmellsActionableInsights",
        kpiConfiguration,
        dashboardTags,
        filterDto,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );
      if (isMounted?.current === true && response?.status === 200) {
        const sonarMaintainability = response?.data?.data[0]?.sonarCodeSmells?.data[0]?.projectData;
        await setMaintainibilityData(
          sonarMaintainability.map((maintainibility, index) => ({
            ...maintainibility,
            status: calculateTrend(maintainibility),
            _blueprint: <FontAwesomeIcon icon={faExternalLink} fixedWidth className="mr-2" />,
          }))
        );
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", sonarMaintainability.length);
        setFilterModel({ ...newFilterDto });
        setIssueTypeData(response?.data?.data[0]?.sonarCodeSmells?.data[0]?.typeData[0]);
        setFooterData(response?.data?.data[0]?.sonarCodeSmells?.data[0]?.debtData[0]);
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
        <Col className="footer-records text-right">
          Total Remediation Efforts : {mins === 0 ? "0 minutes" : display}
        </Col>
      </Row>
    );
  };

  const onRowSelect = (rowData) => {
    toastContext.showOverlayPanel(
      <BlueprintLogOverlay pipelineId={rowData?.original?.pipelineId} runCount={rowData?.original?.runCount} />
    );
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
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
        <SonarRatingsMaintainabilityOverviewDataBlockContainer sonarMetric={issueTypeData} />
        <SonarRatingsMaintainabilityActionableInsightTable
          isLoading={isLoading}
          maintainabilityData={maintainibilityData}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          loadData={loadData}
        />
        {getFooterDetails()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

SonarRatingsMaintainabilityActionableInsightOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default SonarRatingsMaintainabilityActionableInsightOverlay;
