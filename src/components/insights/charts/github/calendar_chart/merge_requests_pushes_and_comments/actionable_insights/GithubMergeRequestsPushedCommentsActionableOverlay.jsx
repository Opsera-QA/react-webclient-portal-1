import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { AuthContext } from "contexts/AuthContext";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import GithubMergeRequestsPushesCommentsActionableTable from "./GithubMergeRequestsPushesCommentsActionableTable";
import {faCodeMerge, faTable} from "@fortawesome/pro-light-svg-icons";
import TabPanelContainer from "../../../../../../common/panels/general/TabPanelContainer";
import FullScreenCenterOverlayContainer
    from "../../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import GithubMergeRequestsPushesCommentsVerticalTabContainer
    from "./GithubMergeRequestsPushesCommentsVerticalTabContainer";

function GithubMergeRequestsPushesCommentsActionableOverlay({ dashboardData, kpiConfiguration, startDate, endDate }) {
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [metrics, setMetrics] = useState([]);
    const { getAccessToken } = useContext(AuthContext);

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

    const loadData = async (cancelSource = cancelTokenSource) => {
        setIsLoading(true);
        let dashboardTags =
            dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
        let dashboardOrgs =
            dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
                ?.value;
        const response = await chartsActions.parseConfigurationAndGetChartMetrics(
            getAccessToken,
            cancelSource,
            "githubMergeReqAndPushActionableVerticalContainer",
            kpiConfiguration,
            dashboardTags,
            null,
            null,
            dashboardOrgs,
            null,
            startDate,
            endDate,
        );
        let dataObject = response?.data
            ? response?.data?.data[0]?.githubMergeReqAndPushActionableVerticalContainer?.data[0]?.data
            : [];
        if (isMounted?.current === true && dataObject) {
            setMetrics(dataObject);
        }
    };

    return (
        <FullScreenCenterOverlayContainer
            closePanel={closePanel}
            showPanel={true}
            titleText={"Github Total Commits"}
            showToasts={true}
            titleIcon={faTable}
            // isLoading={isLoading}
            linkTooltipText={"View Full Blueprint"}
        >
            <div className={"p-3"}>
                <GithubMergeRequestsPushesCommentsVerticalTabContainer
                    highestMergesMetric={metrics}
                    dashboardData={dashboardData}
                    kpiConfiguration={kpiConfiguration}
                    icon={faCodeMerge}
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
        </FullScreenCenterOverlayContainer>
    );
}
GithubMergeRequestsPushesCommentsActionableOverlay.propTypes = {
    startDate: PropTypes.string,
    dashboardData: PropTypes.object,
    kpiConfiguration: PropTypes.object,
    endDate: PropTypes.object
};
export default GithubMergeRequestsPushesCommentsActionableOverlay;
