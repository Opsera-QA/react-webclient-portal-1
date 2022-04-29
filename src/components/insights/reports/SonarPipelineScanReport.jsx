import React, { useEffect, useState, useContext, useRef } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import SonarScanReportTable from "./SonarScanReportTable";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import modelHelpers from "components/common/model/modelHelpers";
import { sonarPipelineScanReportActions } from "components/insights/reports/sonarPipelineScanReport.actions";
import filterMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/filter-metadata";

function SonarPipelineScanReport() {
  const { pipelineId, stepId, runCount } = useParams();
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [sonarIssues, setSonarIssues] = useState([]);
  const [sonarPageIssues, setSonarPageIssues] = useState([]);
  const [filterModel, setFilterModel] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setSonarIssues([]);
    const newFilterModel = modelHelpers.parseFilterModel(filterMetadata);

    loadData(newFilterModel).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (newFilterModel = filterModel) => {
    try {
      setIsLoading(true);

      const sonarPageIssuesArray = await sonarPipelineScanReportActions.getSonarScanIssuesByPage(
        getAccessToken,
        cancelTokenSource,
        pipelineId,
        stepId,
        runCount,
        newFilterModel?.getData("currentPage"),
        newFilterModel?.getData("pageSize"),
      );

      if (Array.isArray(sonarPageIssuesArray?.message)) {
        setSonarPageIssues(sonarPageIssuesArray?.message);
        setFilterModel(newFilterModel);
      }
      await getAllSonarMetrics();
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getAllSonarMetrics = async () => {
    try {
      setIsLoading(true);
      setSonarIssues([]);

      const sonarIssuesArray = await sonarPipelineScanReportActions.getAllSonarScanIssues(
        getAccessToken,
        cancelTokenSource,
        pipelineId,
        stepId,
        runCount,
        );

      if (Array.isArray(sonarIssuesArray?.message)) {
        setSonarIssues(sonarIssuesArray?.message);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
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
        data={sonarPageIssues}
        allSonarIssues={sonarIssues}
        isLoading={isLoading}
        loadData={loadData}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
      />
    </ScreenContainer>
  );

}


export default SonarPipelineScanReport;