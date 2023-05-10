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
import {DialogToastContext} from "../../../../../../../contexts/DialogToastContext";

function GithubMergeRequestsPushesCommentsActionableOverlay({ dashboardData, kpiConfiguration, date }) {
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [metrics, setMetrics] = useState([]);
    const { getAccessToken } = useContext(AuthContext);
    const toastContext = useContext(DialogToastContext);

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
            date,
        );
        let dataObject = response?.data
            ? response?.data?.data[0]
            : [];
        if (isMounted?.current === true && dataObject) {
            setMetrics(dataObject);
        }
    };

    const closePanel = () => {
        toastContext.removeInlineMessage();
        toastContext.clearOverlayPanel();
    };

    return (
        <FullScreenCenterOverlayContainer
            closePanel={closePanel}
            showPanel={true}
            titleText={date + ": Github Merge Request, Pushes, Comments Actionable Report"}
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
                    date={date}
                />
            </div>
        </FullScreenCenterOverlayContainer>
    );
}
GithubMergeRequestsPushesCommentsActionableOverlay.propTypes = {
    date: PropTypes.string,
    dashboardData: PropTypes.object,
    kpiConfiguration: PropTypes.object,
};
export default GithubMergeRequestsPushesCommentsActionableOverlay;
