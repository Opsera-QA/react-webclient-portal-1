import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import {githubActionsWorkflowMetadata} from "./githubActionsWorkflow.metadata";
import GithubActionsBottomTable from "./GithubActionsWorkflowBottomTable";
import {metricHelpers} from "../../../../metric.helpers";
import githubActionsWorkflowActions from "./github-actions-workflow-actions";

function GithubActionsWorkflowTableOverlay({ kpiConfiguration, dashboardData }) {
    const { getAccessToken } = useContext(AuthContext);
    const [error, setError] = useState(undefined);
    const [metrics, setMetrics] = useState([]);
    const [mostFailed, setMostFailed] = useState("");
    const [mostFailedTime, setMostFailedTime] = useState("");
    const [mostSuccessTime, setMostSuccessTime] = useState("");
    const [dashboardFilters, setFilters] = useState([]);
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
            let dashboardFilters = dashboardMetricFilter?.hierarchyFilters;
            const response = await githubActionsWorkflowActions.githubActionsBaseKPITable(
                kpiConfiguration,
                getAccessToken,
                cancelSource,
                filterDto,
                dashboardTags,
                dashboardOrgs,
                dashboardFilters
            );

            let dataObject = response?.data ? response?.data?.data[0]?.data : [];
            let dataCount = response?.data
                ? response?.data?.data[0]?.count[0]?.count
                : [];
            let mostFailed = response?.data ? response?.data?.data[0]?.mostFailed[0]?.mostFailed : "N/A";
            let mostSuccessTime = response?.data ? response?.data?.data[0]?.mostSuccessTime[0]?.mostSuccessTime : "N/A";
            let mostFailedTime = response?.data ? response?.data?.data[0]?.mostFailedTime[0]?.mostFailedTime : "N/A";

            let newFilterDto = filterDto;
            newFilterDto.setData("totalCount", dataCount);
            setFilterModel({ ...newFilterDto });
            if (isMounted?.current === true && dataObject) {
                setMetrics(dataObject);
                setMostFailed(mostFailed);
                setMostSuccessTime(mostSuccessTime);
                setMostFailedTime(mostFailedTime);
                setFilters(dashboardFilters);
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
        <GithubActionsBottomTable
            data={metrics}
            isLoading={isLoading}
            loadData={loadData}
            filterModel={filterModel}
            setFilterModel={setFilterModel}
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            mostFailed={mostFailed}
            mostSuccessTime={mostSuccessTime}
            mostFailedTime={mostFailedTime}
        />
    );
}

GithubActionsWorkflowTableOverlay.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
};

export default GithubActionsWorkflowTableOverlay;