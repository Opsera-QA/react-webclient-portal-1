import React, { useEffect, useContext, useState, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import Model from "core/data_model/model";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import chartsActions from "components/insights/charts/charts-actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import BoomiActionableInsightsCreateTable from "./BoomiActionableInsightsCreateTable";
import TwoLineScoreDataBlock from "../../../../common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLinePercentageDataBlock from "../../../../common/metrics/percentage/TwoLinePercentageDataBlock";
import {metricHelpers} from "../../../metric.helpers";
import BoomiActionableTotalExecutionsDataBlock from "./data_blocks/BoomiActionableTotalExecutionsDataBlock";
import BoomiActionableFreqDataBlock from "./data_blocks/BoomiActionableFreqDataBlock";
import BoomiActionableSuccessPercentageDataBlock from "./data_blocks/BoomiActionableSuccessPercentageDataBlock";

function BoomiActionableInsightCreateOverlay({ kpiConfiguration, dashboardData }) {
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

            const response = await chartsActions.parseConfigurationAndGetChartMetrics(
                getAccessToken,
                cancelSource,
                "boomiCreatePackageActionableInsights",
                kpiConfiguration,
                dashboardTags,
                filterDto,
                undefined,
                dashboardOrgs,
            );

            const metrics = response?.data?.data[0][0]?.tableData;
            const block = response?.data?.data[0][0]?.stats[0];

            if (isMounted?.current === true && Array.isArray(metrics)) {
                setActionableData(metrics);
                setBlockData(block);

                let newFilterDto = filterDto;
                newFilterDto.setData("totalCount", response?.data?.data[0][0]?.count[0]?.count);
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

    const getDataBlocks = () =>{
        return (<Row className="px-2">
            <Col xl={4} lg={4} sm={6} className={"my-3"}>
                <BoomiActionableTotalExecutionsDataBlock
                        className={'p-2 dark-gray-text-primary'}
                        data={blockData?.totalExecutions}
                    />
            </Col>
            <Col xl={4} lg={4} sm={6} className={"my-3"}>
                <BoomiActionableFreqDataBlock
                        className={'p-2 dark-gray-text-primary'}
                        data={blockData?.freq}
                        subtitle={"Frequency"}
                    />
            </Col>
            <Col xl={4} lg={4} sm={6} className={"my-3"}>
                <BoomiActionableSuccessPercentageDataBlock
                        className={'p-2 dark-gray-text-primary'}
                        data={blockData?.successPercentage}
                        subtitle={"Success Percentage"}
                    />
            </Col>
        </Row>);
    };

    return (
            <div className={"p-3"}>
                <div className={"mb-4"} >{getDateBadge()}</div>
                {getDataBlocks()}
                <BoomiActionableInsightsCreateTable
                    isLoading={isLoading}
                    data={actionableData}
                    filterModel={filterModel}
                    setFilterModel={setFilterModel}
                    loadData={loadData}
                />
            </div>
    );
}

BoomiActionableInsightCreateOverlay.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
};

export default BoomiActionableInsightCreateOverlay;