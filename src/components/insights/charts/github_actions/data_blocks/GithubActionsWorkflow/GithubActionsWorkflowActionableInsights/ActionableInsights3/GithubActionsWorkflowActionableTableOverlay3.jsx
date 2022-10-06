import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import {githubActionsWorkflowMetadata} from "../../githubActionsWorkflow.metadata";
import GitlabActionsWorkflowActionableInsightTable3 from "./GithubActionsWorkflowActionableInsightTable3";
import {metricHelpers} from "../../../../../../metric.helpers";
import githubActionsWorkflowActions from "../../github-actions-workflow-actions";

function GithubActionsWorkflowTableOverlay3({ kpiConfiguration, dashboardData, dashboardFilters,repoName , appName, workflowName, branchName, jobName }) {
    const { getAccessToken } = useContext(AuthContext);
    const [error, setError] = useState(undefined);
    const [metrics, setMetrics] = useState([]);
    const [mostFailed, setMostFailed] = useState("");
    const [mostSkipped, setMostSkipped] = useState("");
    const [mostFailedTime, setMostFailedTime] = useState("");
    const [mostSuccessTime, setMostSuccessTime] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const [filterModel, setFilterModel] = useState(
        new Model(
            { ...githubActionsWorkflowMetadata.newObjectFields },
            githubActionsWorkflowMetadata,
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
            let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(dashboardData?.data?.filters);
            let dashboardTags = dashboardMetricFilter?.tags;
            let dashboardOrgs = dashboardMetricFilter?.organizations;
            //let dashboardFilters = dashboardMetricFilter?.hierarchyFilters;
            const response = await githubActionsWorkflowActions.githubActionsActionableThreeTable(
                kpiConfiguration,
                getAccessToken,
                cancelSource,
                filterDto,
                dashboardTags,
                dashboardOrgs,
                dashboardFilters,
                workflowName,
                repoName,
                appName,
                branchName,
                jobName
            );

            let dataObject = response?.data ? response?.data?.data[0]?.data : [];
            let dataCount = response?.data
                ? response?.data?.data[0]?.count[0]?.count
                : [];
            let mostFailed = response?.data ? response?.data?.data[0]?.mostFailed[0]?.mostFailed : "N/A";
            let mostSkipped = response?.data ? response?.data?.data[0]?.mostSkipped[0]?.mostSkipped : "N/A";
            let mostSuccessTime = response?.data ? response?.data?.data[0]?.mostSuccessTime[0]?.mostSuccessTime : "N/A";
            let mostFailedTime = response?.data ? response?.data?.data[0]?.mostFailedTime[0]?.mostFailedTime : "N/A";

            let newFilterDto = filterDto;
            newFilterDto.setData("totalCount", dataCount);
            setFilterModel({ ...newFilterDto });
            if (isMounted?.current === true && dataObject) {
                setMetrics(dataObject);
                setMostFailed(mostFailed);
                setMostSkipped(mostSkipped);
                setMostSuccessTime(mostSuccessTime);
                setMostFailedTime(mostFailedTime);
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
        <GitlabActionsWorkflowActionableInsightTable3
            data={metrics}
            isLoading={isLoading}
            loadData={loadData}
            filterModel={filterModel}
            setFilterModel={setFilterModel}
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            repoName={repoName}
            workflowName={workflowName}
            branchName={branchName}
            appName={appName}
            jobName={jobName}
            mostFailed={mostFailed}
            mostSkipped={mostSkipped}
            mostSuccessTime={mostSuccessTime}
            mostFailedTime={mostFailedTime}
        />
    );
}

GithubActionsWorkflowTableOverlay3.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    dashboardFilters: PropTypes.any,
    workflowName: PropTypes.string,
    repoName: PropTypes.string,
    appName: PropTypes.string,
    branchName: PropTypes.string,
    jobName: PropTypes.string
};

export default GithubActionsWorkflowTableOverlay3;