import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import Model from "../../../../../../../core/data_model/model";
import actionableInsightsGenericChartFilterMetadata
    from "../../../../generic_filters/actionableInsightsGenericChartFilterMetadata";
import {DialogToastContext} from "../../../../../../../contexts/DialogToastContext";
import {metricHelpers} from "../../../../../metric.helpers";
import chartsActions from "../../../../charts-actions";
import FullScreenCenterOverlayContainer from "../../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import {faTable} from "@fortawesome/pro-light-svg-icons";
import {getMetricFilterValue} from "../../../../../../common/helpers/metrics/metricFilter.helpers";
import MetricDateRangeBadge from "../../../../../../common/badges/date/metrics/MetricDateRangeBadge";
import SalesforceCodeAnalyserRuleActionableTwoTable from "./SalesforceCodeAnalyserRuleActionableTwoTable";
import codeAnalyserActions from "../../codeanalyser.action";

function SalesforceCodeAnalyserRuleActionableTwoOverlay({
                                                            kpiConfiguration,
                                                            dashboardData, rule
                                                        }) {
    const { getAccessToken } = useContext(AuthContext);
    const toastContext = useContext(DialogToastContext);
    const [error, setError] = useState(undefined);
    const [metrics, setMetrics] = useState([]);
    const [totalCount, setTotalCount] = useState([]);
    const [chartData, setChartData] =
        useState(undefined);
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
    },[]);

    const loadData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
        try {
            setIsLoading(true);
            let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(dashboardData?.data?.filters);
            let dashboardTags = dashboardMetricFilter?.tags;
            let dashboardOrgs = dashboardMetricFilter?.organizations;

            const response = await codeAnalyserActions.salesforceCodeAnalyserRuleActionableTwo(
                getAccessToken,
                cancelSource,
                kpiConfiguration,
                dashboardTags,
                dashboardOrgs,
                filterDto,
                rule
            );

            let dataObject = response?.data ? response?.data?.data[0]?.tableData : [];
            let totalCount = response?.data ? response?.data?.data[0]?.count[0]?.count : [];

            if (isMounted?.current === true && dataObject) {
                setMetrics(dataObject);
                setTotalCount(totalCount);

                let newFilterDto = filterDto;
                newFilterDto.setData("totalCount", response?.data?.data[0]?.count[0]?.count);
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

    const closePanel = () => {
        toastContext.removeInlineMessage();
        toastContext.clearOverlayPanel();
    };

    const getDateRange = () => {
        const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
        return <MetricDateRangeBadge startDate={date?.startDate} endDate={date?.endDate} />;
    };

    return (
        <FullScreenCenterOverlayContainer
            closePanel={closePanel}
            showPanel={true}
            titleText={"Rule: " + rule}
            showToasts={true}
            titleIcon={faTable}
            isLoading={isLoading}
            linkTooltipText={"View Full Blueprint"}
        >
            <div className={"p-3"}>
                {getDateRange()}
                <SalesforceCodeAnalyserRuleActionableTwoTable
                    isLoading={isLoading}
                    data={metrics}
                    filterModel={filterModel}
                    setFilterModel={setFilterModel}
                    loadData={loadData}
                    kpiConfiguration={kpiConfiguration}
                    dashboardData={dashboardData}
                />
            </div>
        </FullScreenCenterOverlayContainer>
    );
}

SalesforceCodeAnalyserRuleActionableTwoOverlay.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    rule: PropTypes.string,
};

export default SalesforceCodeAnalyserRuleActionableTwoOverlay;