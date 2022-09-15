import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import {githubActionsWorkflowMetadata} from "../githubActionsWorkflow.metadata";
import GitlabActionsWorkflowActionableInsightTable1 from "./GithubActionsWorkflowActionableInsightTable1";
import {metricHelpers} from "../../../../../metric.helpers";
import githubActionsWorkflowActions from "../github-actions-workflow-actions";


function GithubActionsWorkflowTableOverlay({ kpiConfiguration, dashboardData, workflowName }) {
    const { getAccessToken } = useContext(AuthContext);
    const [error, setError] = useState(undefined);
    const [metrics, setMetrics] = useState([]);
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
            const response = await githubActionsWorkflowActions.githubActionsActionableOneTable(
                kpiConfiguration,
                getAccessToken,
                cancelSource,
                filterDto,
                dashboardTags,
                dashboardOrgs,
                workflowName
            );
            let dataObject = response?.data ? response?.data?.data[0]?.data : [];
            let dataCount = response?.data
                ? response?.data?.data[0]?.count[0]?.count
                : [];

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
        <GitlabActionsWorkflowActionableInsightTable1
            data={metrics}
            isLoading={isLoading}
            loadData={loadData}
            filterModel={filterModel}
            setFilterModel={setFilterModel}
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            workflowName={workflowName}
        />
    );
}

GithubActionsWorkflowTableOverlay.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    workflowName: PropTypes.string,
};

export default GithubActionsWorkflowTableOverlay;
