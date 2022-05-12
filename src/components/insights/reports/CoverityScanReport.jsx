import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Model from "../../../core/data_model/model";
import actionableInsightsGenericChartFilterMetadata
  from "../charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import axios from "axios";
import chartsActions from "../charts/charts-actions";
import PropTypes from "prop-types";
import ScreenContainer from "../../common/panels/general/ScreenContainer";
import InsightsSubNavigationBar from "../InsightsSubNavigationBar";
import CoverityScanReportTable from "./CoverityScanReportTable";


function CoverityScanReport({ kpiConfiguration, dashboardData }) {
  const { pipelineId, projectName, runCount, coveritySeverity } = useParams();
  const history = useHistory();
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [allCoverityIssues, setAllCoverityIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "coverityReportsTable",
        kpiConfiguration,
        dashboardTags,
        filterDto,
        undefined,
        dashboardOrgs,
        undefined,
        undefined,
        undefined,
        undefined,
        coveritySeverity,
        null,
        projectName,
        runCount,
        pipelineId
      );

      const dataObject = response?.data.data[0].coverityReportsTable.data[0].tableData;

      if (isMounted?.current === true && Array.isArray(dataObject)) {
        setMetrics(dataObject);

        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", response?.data?.data[0]?.coverityReportsTable?.data[0]?.count[0]?.count);
        setFilterModel({ ...newFilterDto });
      }
      await loadData2(cancelSource);
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


  const loadData2 = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
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
        "getAllCoverityReportsIssues",
        kpiConfiguration,
        dashboardTags,
        filterDto,
        undefined,
        dashboardOrgs,
        undefined,
        undefined,
        undefined,
        undefined,
        coveritySeverity,
        null,
        projectName,
        runCount,
        pipelineId
      );

      const dataObject = response?.data.data[0].getAllCoverityReportsIssues.data[0].tableData;

      if (isMounted?.current === true && Array.isArray(dataObject)) {
        setAllCoverityIssues(dataObject);
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
      pageDescription={`Downloadable Report for Coverity`}
      breadcrumbDestination={"coverityReports"}
    >
      <CoverityScanReportTable
        data={metrics}
        allCoverityIssues={allCoverityIssues}
        isLoading={isLoading}
        loadData={loadData}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
      />
    </ScreenContainer>
  );
}

CoverityScanReport.propTypes = {
  title: PropTypes.string,
  coveritySeverity: PropTypes.string,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default CoverityScanReport;