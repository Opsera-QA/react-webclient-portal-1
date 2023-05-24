import React, { useEffect, useContext, useState, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import Model from "core/data_model/model";
import PropTypes from "prop-types";
import chartsActions from "components/insights/charts/charts-actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import JenkinsChangeFailureRateActionableTable from "./JenkinsChangeFailureRateActionableTable";
import {metricHelpers} from "../../../../../metric.helpers";
import {faTable} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer
    from "../../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import jenkinsActions from "../../../jenkins.action";

function JenkinsChangeFailureRateActionableOverlay({ kpiConfiguration, dashboardData }) {
    const { getAccessToken } = useContext(AuthContext);
    const toastContext = useContext(DialogToastContext);
    const [filterModel, setFilterModel] = useState(
        new Model(
            { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
            actionableInsightsGenericChartFilterMetadata,
            false
        )
    );
    const [isLoading, setIsLoading] = useState(false);
    const [actionableData, setActionableData] = useState([]);
    const [blockData, setBlockData] = useState([]);
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
            let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(dashboardData?.data?.filters);
            let dashboardTags = dashboardMetricFilter?.tags;
            let dashboardOrgs = dashboardMetricFilter?.organizations;

            const response = await jenkinsActions.jenkinsChangeFailureRateActionableInsights(
                getAccessToken,
                cancelSource,
                kpiConfiguration,
                dashboardTags,
                filterDto,
                dashboardOrgs,
            );

            const metrics = response?.data ? response?.data?.data[0].data : [];

            if (isMounted?.current === true && Array.isArray(metrics)) {
                setActionableData(metrics);

                let newFilterDto = filterDto;
                newFilterDto.setData("totalCount", response?.data?.data[0].count[0]?.count);
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



    const getDateRange = () => {
        const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
        return <MetricDateRangeBadge startDate={date?.startDate} endDate={date?.endDate} />;
    };


    const closePanel = () => {
        toastContext.removeInlineMessage();
        toastContext.clearOverlayPanel();
    };

    return (
        <FullScreenCenterOverlayContainer
            closePanel={closePanel}
            showPanel={true}
            titleText={"Jenkins Failures Actionable Insights"}
            showToasts={true}
            titleIcon={faTable}
            isLoading={isLoading}
            linkTooltipText={"View Full Blueprint"}
        >
            <div className={"p-3"}>
                {getDateRange()}
                <JenkinsChangeFailureRateActionableTable
                    isLoading={isLoading}
                    data={actionableData}
                    filterModel={filterModel}
                    setFilterModel={setFilterModel}
                    loadData={loadData}
                />
            </div>
        </FullScreenCenterOverlayContainer>
    );
}

JenkinsChangeFailureRateActionableOverlay.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
};

export default JenkinsChangeFailureRateActionableOverlay;