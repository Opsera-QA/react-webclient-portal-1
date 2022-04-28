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
        filterModel?.getData("currentPage"),
        filterModel?.getData("pageSize"),
      );

      if (Array.isArray(sonarPageIssuesArray)) {
        setSonarPageIssues(sonarPageIssuesArray);
        setFilterModel(newFilterModel);
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

      if (Array.isArray(sonarIssuesArray)) {
        setSonarIssues(sonarIssuesArray);
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


//   const placeholderData = [
//     {
//         "severity": "MAJOR",
//         "component": "Log-Accumulator:src/main/webapp/index.jsp",
//         "project": "Log-Accumulator",
//         "line": 1,
//         "status": "OPEN",
//         "message": "Insert a <!DOCTYPE> declaration to before this <html> tag.",
//         "effort": "5min",
//         "debt": "5min",
//         "author": "faseeh@opsera.io",
//         "tags": [
//             "user-experience"
//         ],
//         "type": "BUG",
//         "creationDate": "2021-08-03T11:20:15+0000",
//         "updateDate": "2021-08-12T22:40:25+0000"
//     },
//     {
//         "severity": "MAJOR",
//         "component": "Log-Accumulator:src/main/webapp/index.jsp",
//         "project": "Log-Accumulator",
//         "line": 1,
//         "status": "OPEN",
//         "message": "Add \"lang\" and/or \"xml:lang\" attributes to this \"<html>\" element",
//         "effort": null,
//         "debt": null,
//         "author": "faseeh@opsera.io",
//         "tags": [
//             "accessibility",
//             "wcag2-a"
//         ],
//         "type": "BUG",
//         "creationDate": "2021-08-03T11:20:15+0000",
//         "updateDate": "2021-08-12T22:40:25+0000"
//     }
// ];

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