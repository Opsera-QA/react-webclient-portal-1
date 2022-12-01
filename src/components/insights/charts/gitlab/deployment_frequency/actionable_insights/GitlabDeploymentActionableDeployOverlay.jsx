import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import gitlabAction from "../gitlab.action";
import {faExternalLink, faTable} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import IconBase from "../../../../../common/icons/IconBase";
import MTTRActionableInsightTable
    from "../../../servicenow/bar_chart/mean_time_to_resolution/actionable_insights/MTTRActionableInsightTable";
import Model from "../../../../../../core/data_model/model";
import actionableInsightsGenericChartFilterMetadata
    from "../../../generic_filters/actionableInsightsGenericChartFilterMetadata";

function GitlabDeploymentActionableDeployOverlay({
                                                        kpiConfiguration,
                                                        setKpiConfiguration,
                                                        dashboardData,
                                                        index,
                                                        setKpis,
                                                    }) {
    const toastContext = useContext(DialogToastContext);
    const { getAccessToken } = useContext(AuthContext);
    const [error, setError] = useState(undefined);
    const [metricData, setMetricData] =
        useState(undefined);
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
            let dashboardTags =
                dashboardData?.data?.filters[
                    dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
                    ]?.value;
            let dashboardOrgs =
                dashboardData?.data?.filters[
                    dashboardData?.data?.filters.findIndex(
                        (obj) => obj.type === "organizations",
                    )
                    ]?.value;

            const response = await gitlabAction.gitlabDeploymentStatistics(
                getAccessToken,
                cancelSource,
                kpiConfiguration,
                dashboardTags,
                dashboardOrgs,
            );
            let dataObject = response?.data ? response?.data?.data[0]?.serviceNowMTTRActionableInsights?.data[0].tableData : [];
            let dataCount = response?.data
                ? response?.data?.data[0]?.serviceNowMTTRActionableInsights?.data[0]?.count[0]?.count
                : [];
            let DataBlocks = response?.data
                ? response?.data?.data[0]?.serviceNowMTTRActionableInsights?.data[0]?.blockData[0]
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
                setDataBlockValues(DataBlocks);
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
        <div className={"p-2"}>
            {/*<MTTRActionableDataBlocks data={dataBlockValues}  />*/}
            <MTTRActionableInsightTable
                data={metrics}
                isLoading={isLoading}
                loadData={loadData}
                filterModel={filterModel}
                setFilterModel={setFilterModel}
                priority={priority}
                tableTitleIcon={icon}
            />
        </div>
    );
}

GitlabDeploymentActionableDeployOverlay.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    index: PropTypes.number,
    setKpiConfiguration: PropTypes.func,
    setKpis: PropTypes.func,
};

export default GitlabDeploymentActionableDeployOverlay;
