import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import gitlabAction from "../../gitlab.action";
import { faTable} from "@fortawesome/pro-light-svg-icons";
import Model from "../../../../../../core/data_model/model";
import actionableInsightsGenericChartFilterMetadata
    from "../../../generic_filters/actionableInsightsGenericChartFilterMetadata";
import GitlabDeploymentActionablePipelinesTable from "./GitlabDeploymentActionablePipelineTable";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import {metricHelpers} from "../../../../metric.helpers";

function GitlabDeploymentActionablePipelinesOverlay({ kpiConfiguration, dashboardData, start, end, range, icon}) {
    const { getAccessToken } = useContext(AuthContext);
    const toastContext = useContext(DialogToastContext);
    const [error, setError] = useState(undefined);
    const [metrics, setMetrics] = useState([]);
    const [totalCount, setTotalCount] = useState([]);
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

            const response = await gitlabAction.getActionablePipelinesChartData(
                getAccessToken,
                cancelSource,
                kpiConfiguration,
                dashboardTags,
                dashboardOrgs,
                filterDto,
                start,
                end
            );
            let dataObject = response?.data ? response?.data[0]?.pipelines : [];
            let totalCount = response?.data ? response?.data[0]?.count[0]?.count : [];

            if (isMounted?.current === true && dataObject) {
                setMetrics(dataObject);
                setTotalCount(totalCount);

                let newFilterDto = filterDto;
                newFilterDto.setData("totalCount", response?.data[0]?.count[0]?.count);
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

    return (
      <div className={"p-3"}>
        <GitlabDeploymentActionablePipelinesTable
            isLoading={isLoading}
            data={metrics}
            filterModel={filterModel}
            setFilterModel={setFilterModel}
            loadData={loadData}
            range={range}
            count={totalCount}
            tableTitleIcon={icon}
        />
      </div>
    );
}

GitlabDeploymentActionablePipelinesOverlay.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    start: PropTypes.string,
    end: PropTypes.string,
    range: PropTypes.string,
    icon: PropTypes.object,
};

export default GitlabDeploymentActionablePipelinesOverlay;