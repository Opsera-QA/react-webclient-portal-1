import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { AuthContext } from "contexts/AuthContext";
import { faExternalLink, faTable } from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import chartsActions from "components/insights/charts/charts-actions";
import { useHistory } from "react-router-dom";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import IconBase from "components/common/icons/IconBase";
import GithubActionsBottomTable from "./GithubActionsWorkflowBottomTable";
import {metricHelpers} from "../../../../metric.helpers";

function GithubActionsWorkflowTableOverlay({ title, coveritySeverity, kpiConfiguration, dashboardData }) {
    const toastContext = useContext(DialogToastContext);
    const history = useHistory();
    const { getAccessToken } = useContext(AuthContext);
    const [error, setError] = useState(undefined);
    const [metrics, setMetrics] = useState([]);
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
            let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(dashboardData?.data?.filters);
            let dashboardTags = dashboardMetricFilter?.tags;
            let dashboardOrgs = dashboardMetricFilter?.organizations;
            const response = await chartsActions.githubActionsBaseKPITable(
                kpiConfiguration,
                getAccessToken,
                cancelSource,
                filterDto,
                dashboardTags,
                dashboardOrgs
            );
            let dataObject = response?.data ? response?.data?.data[0]?.data : [];
            let dataCount = response?.data
                ? response?.data?.data[0][0]?.count[0]?.count
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
        <GithubActionsBottomTable
            data={metrics}
            isLoading={isLoading}
            loadData={loadData}
            filterModel={filterModel}
            setFilterModel={setFilterModel}
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
        />
    );
}

GithubActionsWorkflowTableOverlay.propTypes = {
    title: PropTypes.string,
    coveritySeverity: PropTypes.string,
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
};

export default GithubActionsWorkflowTableOverlay;
