import React, { useEffect, useContext, useState, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import Model from "core/data_model/model";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import {
    faCodeMerge,
    faCodePullRequest,
    faCodePullRequestClosed,
    faExternalLink,
    faTable, faUsers
} from "@fortawesome/pro-light-svg-icons";
import chartsActions from "components/insights/charts/charts-actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";

import QuickDeployTotalSuccessActionableTable from "./QuickDeployTotalSuccessActionableTable";
import GithubCommitsActionableInsightOpenTab
    from "../../../github/pie_chart/commits_statistics/actionable_insights/GithubCommitsActionableInsightOpenTab";

import CustomTabContainer from "../../../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../../../common/tabs/CustomTab";
import TabPanelContainer from "../../../../../common/panels/general/TabPanelContainer";
import QuickDeployTotalExecutionsTab from "./QuickDeployTotalExecutionsTab";

function QuickDeployTotalExecutionsActionableOverlay({ kpiConfiguration, dashboardData }) {
    const { getAccessToken } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("main");
    const [filterModel, setFilterModel] = useState(
        new Model(
            { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
            actionableInsightsGenericChartFilterMetadata,
            false
        )
    );
    const toastContext = useContext(DialogToastContext);
    const [isLoading, setIsLoading] = useState(false);
    const [actionableData, setActionableData] = useState([]);
    const [taskData, setTasksData] = useState([]);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const isMounted = useRef(false);
    const [error, setError] = useState(undefined);

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

    const loadData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
        try {
            setIsLoading(true);
            const response = await chartsActions.parseConfigurationAndGetChartMetrics(
                getAccessToken,
                cancelSource,
                "quickDeployTotalExecutionsActionableInsights",
                kpiConfiguration,
                undefined,
                filterDto,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined
            );

            const metrics = response?.data?.data[0]?.metrics?.data;
            const tasks = response?.data?.data[0]?.tasks;

            if (isMounted?.current === true && Array.isArray(metrics)) {
                setActionableData(metrics);
                setTasksData(tasks);
                let newFilterDto = filterDto;
                newFilterDto.setData("totalCount", response?.data?.data[0]?.metrics?.count[0]?.count);
                setFilterModel({ ...newFilterDto });
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


    const getDateBadge = () => {
        const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
        return <MetricDateRangeBadge startDate={date?.startDate} endDate={date?.endDate} />;
    };

    const closePanel = () => {
        toastContext.removeInlineMessage();
        toastContext.clearOverlayPanel();
    };

    const getBody = () => {
        if (activeTab == "main") {
            return (
                <QuickDeployTotalExecutionsTab
                    data={actionableData}
                    tasks={taskData}
                    dashboardData={dashboardData}
                    kpiConfiguration={kpiConfiguration}
                />
            );
        }

    };

    const handleTabClick = (tabSelection) => (e) => {
        e.preventDefault();
        setActiveTab(tabSelection);
    };


    return (
        <FullScreenCenterOverlayContainer
            closePanel={closePanel}
            showPanel={true}
            titleText={"Quick Deploy Total Executions"}
            showToasts={true}
            titleIcon={faTable}
            // isLoading={isLoading}
            linkTooltipText={"View Full Blueprint"}
        >
            <div className={"p-3"}>
                <TabPanelContainer currentView={getBody()} />
            </div>
        </FullScreenCenterOverlayContainer>
    );
}

QuickDeployTotalExecutionsActionableOverlay.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
};

export default QuickDeployTotalExecutionsActionableOverlay;