import React, { useEffect, useState, useContext, useRef } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import modelHelpers from "components/common/model/modelHelpers";
import filterMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/filter-metadata";
import sonarCoverageActions from "./sonarCoverage.actions";
import SonarCoverageReportTable from "./SonarCoverageReportTable";

function SonarActionableCoverageReport() {
    const { projectId, toolId } = useParams();
    const toastContext = useContext(DialogToastContext);
    const { getAccessToken } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const [metrics, setMetrics] = useState([]);
    const [filterModel, setFilterModel] = useState(undefined);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel();
        }

        const source = axios.CancelToken.source();
        setCancelTokenSource(source);
        isMounted.current = true;
        setMetrics([]);
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

    const loadData = async (cancelSource = cancelTokenSource, newFilterModel = filterModel) => {
        try {
            setIsLoading(true);

            const response = await sonarCoverageActions.sonarGetCoverageReport(
                getAccessToken,
                cancelSource,
                projectId,
                toolId,
            );
            console.log("sonarPageIssuesArray", response);

            if (Array.isArray(response?.data)) {
                setMetrics(response?.data);
                setFilterModel(newFilterModel);
            }
        } catch (error) {
            if (isMounted?.current === true) {
                toastContext.showLoadingErrorDialog("Unable to generate report. Please ensure Sonarqube instance is running");
            }
        } finally {
            if (isMounted?.current === true) {
                setIsLoading(false);
            }
        }
    };

    for(let obj in metrics){
        let issues = metrics[obj]?.measures;
        for(let temp in issues){
           let metric = issues[temp]?.metric;
            let value = issues[temp]?.value;
            issues[metric]= value;
        }
        metrics[obj].complexity = metrics[obj]?.measures?.complexity;
        metrics[obj].uncovered_lines = metrics[obj]?.measures?.uncovered_lines;
        metrics[obj].line_coverage = metrics[obj]?.measures?.line_coverage;
        metrics[obj].lines_to_cover = metrics[obj]?.measures?.lines_to_cover;
        metrics[obj].coverage = metrics[obj]?.measures?.coverage;
    }

    let metricsFinal = [];
    for(let obj in metrics){
        if(metrics[obj].measures.length > 0){
            metricsFinal.push(metrics[obj]);
        }
    }

    return (
        <ScreenContainer
            navigationTabContainer={<InsightsSubNavigationBar currentTab={"reportsViewer"} />}
            pageDescription={`Downloadable Report for Sonar Coverage Scan`}
            breadcrumbDestination={"sonarCoverageReport"}
        >
            <SonarCoverageReportTable
                data={metricsFinal}
                isLoading={isLoading}
                loadData={loadData}
                filterModel={filterModel}
                setFilterModel={setFilterModel}
                projectId = {projectId}
            />
        </ScreenContainer>
    );

}


export default SonarActionableCoverageReport;
