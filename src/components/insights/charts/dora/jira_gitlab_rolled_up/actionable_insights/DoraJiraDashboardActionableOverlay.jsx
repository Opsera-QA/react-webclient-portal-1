import React, { useEffect, useContext, useState, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import Model from "core/data_model/model";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import doraAction from "../../dora.action";
import DoraJiraDashboardsActionableTable from "./DoraJiraDashboardsActionableTable";
import {metricHelpers} from "../../../../metric.helpers";
import IconBase from "../../../../../common/icons/IconBase";
import {faExternalLink} from "@fortawesome/pro-light-svg-icons";

function DoraJiraDashboardActionableOverlay({ kpiConfiguration, dashboardData, org, activeTab }) {
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
    }, [activeTab]);

    const loadData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
        try {
            setIsLoading(true);
            const response = await doraAction.doraJiraActionableDashboards(
                getAccessToken,
                cancelSource,
                kpiConfiguration,
                filterDto,
                org
            );

            let metrics = response?.data?.data?.data[0]?.data;
            metrics = metrics.map((bd, index) => ({
                ...bd,
                _blueprint: <IconBase icon={faExternalLink} className={"mr-2"} />,
            }));

            if (isMounted?.current === true && Array.isArray(metrics)) {
                setActionableData(metrics);

                let newFilterDto = filterDto;
                newFilterDto.setData("totalCount", response?.data?.data?.data[0]?.count[0]?.count);
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


    return (
        <div className={"p-3"}>
            <DoraJiraDashboardsActionableTable
                isLoading={isLoading}
                data={actionableData}
                org={org}
                filterModel={filterModel}
                setFilterModel={setFilterModel}
                loadData={loadData}
            />
        </div>
    );
}

DoraJiraDashboardActionableOverlay.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    org: PropTypes.string,
    activeTab: PropTypes.string,
};

export default DoraJiraDashboardActionableOverlay;
