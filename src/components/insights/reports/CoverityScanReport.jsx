import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Model from "../../../core/data_model/model";
import actionableInsightsGenericChartFilterMetadata
  from "../charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import axios from "axios";
import chartsActions from "../charts/charts-actions";
import IconBase from "../../common/icons/IconBase";
import { faExternalLink, faTable } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import ScreenContainer from "../../common/panels/general/ScreenContainer";
import InsightsSubNavigationBar from "../InsightsSubNavigationBar";
import SonarScanReportTable from "./SonarScanReportTable";


function CoverityActionableInsightOverlay({ kpiConfiguration, dashboardData }) {
  const { pipelineId, projectName, runCount, coveritySeverity } = useParams();
const history = useHistory();
const { getAccessToken } = useContext(AuthContext);
const [error, setError] = useState(undefined);
const [metrics, setMetrics] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [showModal, setShowModal] = useState(false);
const isMounted = useRef(false);
const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
const [filterModel, setFilterModel] = useState(
  new Model(
    { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
    actionableInsightsGenericChartFilterMetadata,
    false
  )
);

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
}, [JSON.stringify(dashboardData)]);
const loadData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
  try {
    setIsLoading(true);
    let dashboardTags =
      dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
    let dashboardOrgs =
      dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
        ?.value;
    let request = "coverityReportsTable";
    const response = await chartsActions.parseConfigurationAndGetChartMetrics(
      getAccessToken,
      cancelSource,
      request,
      kpiConfiguration,
      dashboardTags,
      filterDto,
      null,
      dashboardOrgs,
      null,
      null,
      null,
      null,
      coveritySeverity,
      null,
      null,
      projectName,
      pipelineId,
      runCount
    );
    let dataObject = response?.data ? response?.data?.data[0]?.coverityReportsTable?.data[0]?.data : [];
    let dataCount = response?.data
      ? response?.data?.data[0]?.coverityInsightsDatablocks?.data[0]?.count[0]?.count
      : [];
    dataObject = dataObject.map((bd, index) => ({
      ...bd,
      _blueprint: <IconBase icon={faExternalLink} className={"mr-2"} />,
    }));

    let newFilterDto = filterDto;
    newFilterDto.setData("totalCount", dataCount);
    setFilterModel({ ...newFilterDto });
    if (isMounted?.current === true && dataObject) {
      setMetrics(dataObject);
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


  return (
    <ScreenContainer
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"reportsViewer"} />}
      pageDescription={`Downloadable Report for Sonar Scan`}
      breadcrumbDestination={"sonarReports"}
    >
      <SonarScanReportTable
        data={metrics}
        //allSonarIssues={sonarIssues}
        isLoading={isLoading}
        loadData={loadData}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
      />
    </ScreenContainer>
  );
}

CoverityActionableInsightOverlay.propTypes = {
  title: PropTypes.string,
  coveritySeverity: PropTypes.string,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default CoverityActionableInsightOverlay;