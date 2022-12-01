import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import gitlabAction from "../../gitlab.action";
import {faExternalLink, faTable} from "@fortawesome/pro-light-svg-icons";
import IconBase from "../../../../../common/icons/IconBase";
import MTTRActionableInsightTable
    from "../../../servicenow/bar_chart/mean_time_to_resolution/actionable_insights/MTTRActionableInsightTable";
import Model from "../../../../../../core/data_model/model";
import actionableInsightsGenericChartFilterMetadata
    from "../../../generic_filters/actionableInsightsGenericChartFilterMetadata";
import GitlabDeploymentActionableDeployTable from "./GitlabDeploymentActionableDeployTable";
import SonarRatingCodeCoverageActionableInsightTable
    from "../../../sonar/sonar_ratings/actionable_insights/coverage/SonarRatingCodeCoverageActionableInsightTable";
import FullScreenCenterOverlayContainer from "../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";

function GitlabDeploymentActionableDeployOverlay({
                                                        kpiConfiguration,
                                                        dashboardData, start, end
                                                    }) {
    const { getAccessToken } = useContext(AuthContext);
    const toastContext = useContext(DialogToastContext);
    const [error, setError] = useState(undefined);
    const [metrics, setMetrics] = useState([]);
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

            const response = await gitlabAction.getActionableDeploymentsChartData(
                getAccessToken,
                cancelSource,
                kpiConfiguration,
                dashboardTags,
                dashboardOrgs,
                filterDto,
                start,
                end
            );
            console.log("deploy response", response);
            let dataObject = response?.data ? response?.data?.data?.getActionableDeploymentsChartData?.data[0]?.deployments : [];
            let dataCount = response?.data
                ? response?.data?.data?.getActionableDeploymentsChartData?.data[0]?.count[0]?.count
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

    const closePanel = () => {
        toastContext.removeInlineMessage();
        toastContext.clearOverlayPanel();
    };

    return (
        <FullScreenCenterOverlayContainer
            closePanel={closePanel}
            showPanel={true}
            titleText={`Github Deployments Actionable Report`}
            showToasts={true}
            titleIcon={faTable}
            isLoading={false}
            linkTooltipText={"View Full Blueprint"}
        >
            <div className={"p-3"}>
                <GitlabDeploymentActionableDeployTable
                    isLoading={isLoading}
                    data={metrics}
                    filterModel={filterModel}
                    setFilterModel={setFilterModel}
                    loadData={loadData}
                />
            </div>
        </FullScreenCenterOverlayContainer>
    );
}

GitlabDeploymentActionableDeployOverlay.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    start: PropTypes.string,
    end: PropTypes.string,
};

export default GitlabDeploymentActionableDeployOverlay;
